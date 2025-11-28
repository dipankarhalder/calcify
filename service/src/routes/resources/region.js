import express from 'express'
import _ from 'lodash'
import { Sequelize, sequelize } from "@/db/models";
import { ROLES } from '@/config';
import { authRequired } from '@/middlewares';
import { addValidator, listValidator } from '@/validationSchema/resources/region';

const router = express.Router();

router.route('/add')
  .post(authRequired({ role: [ROLES.ADMIN] }))
  .post(addValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let record = await sequelize.models.Region.build({
        ...req.validData,
      });

      await record.save();

      res.json({
        code: 200,
        message: "added",
        data: await record.exposeData(),
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

      let whereCond = {};

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

      let totalRecord = await sequelize.models.Region.scope(null).count({
        where: whereCond
      });

      let totalPage = _.ceil(totalRecord / perPage);

      let rows = await sequelize.models.Region
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
        message: "Region list",
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
