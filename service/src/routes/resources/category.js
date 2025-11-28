import express from 'express'
import _ from 'lodash'
import { Sequelize, sequelize } from "@/db/models";
import { ROLES } from '@/config';
import { authRequired } from '@/middlewares';
import { addValidator, listValidator } from '@/validationSchema/resources/category';

const router = express.Router();

router.route('/add')
  .post(authRequired({ role: [ROLES.ADMIN] }))
  .post(addValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let category = await sequelize.models.Category.build({
        ...req.validData,
      });

      await category.save();

      res.json({
        code: 200,
        message: "added",
        data: await category.exposeData(),
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
      let { page, perPage, orderBy, orderDir, query, type } = req.validData;

      page--;

      const offset = page * perPage;
      const limit = perPage;

      let whereCond = {
        type
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

      let totalRecord = await sequelize.models.Category.scope(null).count({
        where: whereCond
      });

      let totalPage = _.ceil(totalRecord / perPage);

      let rows = await sequelize.models.Category
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
        message: "category list",
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
