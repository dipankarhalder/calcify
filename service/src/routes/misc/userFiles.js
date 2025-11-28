import express from 'express'
import { Sequelize, sequelize } from "@/db/models";
import { addValidator, listValidator } from '@/validationSchema/common/userFileCollection';
import { authRequired } from '@/middlewares';
import _ from 'lodash';

const router = express.Router();

router.route('/add')
  .post(addValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { userId, files } = req.validData;

      await Promise.all((files || []).map(async (fileId) => {
        let fileObj = await sequelize.models.UserFile.build({
          userId,
          fileId
        });

        await fileObj.save();
      }));

      res.json({
        code: 200,
        message: "files added",
        data: null
      });

    } catch (err) {
      console.log("err", err);
      res.json({
        code: 500,
        message: err.message,
        data: null
      });
    }
  });

router.route('/list')
  .post(authRequired())
  .post(listValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { page, perPage, orderBy, orderDir, query } = req.validData;

      page--;

      const offset = page * perPage;
      const limit = perPage;

      const tempSQL = sequelize.dialect.queryGenerator.selectQuery(sequelize.models.UserFile.getTableName(), {
        attributes: ['file_id'],
        where: {
          user_id: req.auth.id,
        }
      }).slice(0, -1); // to remove the ';' from the end of the SQL

      let whereCond = {
        id: {
          [Sequelize.Op.in]: sequelize.literal(`(${tempSQL})`)
        }
      };

      if (query) {
        whereCond = {
          ...whereCond,
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.iLike]: `%${query}%`
              }
            },
          ]
        };
      }

      let totalRecord = await sequelize.models.File.scope(null).count({
        where: whereCond
      });

      let totalPage = _.ceil(totalRecord / perPage);

      let rows = await sequelize.models.File
        .findAll({
          where: whereCond,
          order: [
            [orderBy, orderDir]
          ],
          offset,
          limit
        });

      let data = await Promise.all(rows.map(async r => await r.exposeData()));

      res.json({
        code: 200,
        message: "UserFile list",
        data,
        pageInfo: {
          perPage,
          page: ++page,
          totalPage,
          totalRecord
        }
      });

    } catch (err) {
      console.log("err", err);
      res.json({
        code: 500,
        message: err.message,
        data: null
      });
    }
  });

export default router;