import express from 'express'
import _ from 'lodash'
import { Sequelize, sequelize } from "@/db/models";
import { ROLES } from '@/config';
import { authRequired } from '@/middlewares';
import { addValidator, listValidator } from '@/validationSchema/resources/foodItem';

const router = express.Router();

router.route('/add')
  .post(authRequired({ role: [ROLES.DOCTOR.DIETICIAN, ROLES.DOCTOR.PANEL] }))
  .post(addValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let record = await sequelize.models.FoodItem.build({
        ...req.validData,
        createdBy: req.auth.id,
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

      let totalRecord = await sequelize.models.FoodItem.scope(null).count({
        where: whereCond
      });

      let totalPage = _.ceil(totalRecord / perPage);

      let rows = await sequelize.models.FoodItem
        .scope(["withCategory"])
        .findAll({
          where: whereCond,
          order: [
            [orderBy, orderDir]
          ],
          offset,
          limit
        });

      let data = await Promise.all(rows.map(async r => await r.exposeData({ withCategory: true })));

      res.json({
        code: 200,
        message: "FoodItem list",
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
