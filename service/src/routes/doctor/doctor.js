import express from 'express'
import _ from 'lodash'
import { Sequelize, sequelize } from "@/db/models";
import { ROLES } from '@/config';
import { authRequired } from '@/middlewares';
import { detailsValidator, listValidator } from '@/validationSchema/doctor/doctor';

const router = express.Router();

router.route('/list')
  .post(authRequired())
  .post(listValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { page, perPage, orderBy, orderDir, query, role } = req.validData;

      page--;

      const offset = page * perPage;
      const limit = perPage;

      let whereCond = {
        role: Object.values(ROLES.DOCTOR),
      };

      if (role) {
        whereCond = {
          role,
        }
      }

      if (query) {
        whereCond = {
          ...whereCond,
          [Sequelize.Op.or]: [
            {
              first_name: {
                [Sequelize.Op.iLike]: `%${query}%`
              }
            },
            {
              last_name: {
                [Sequelize.Op.iLike]: `%${query}%`
              }
            },
          ]
        };
      }

      let totalRecord = await sequelize.models.User.scope(null).count({
        where: whereCond
      });

      let totalPage = _.ceil(totalRecord / perPage);

      let rows = await sequelize.models.User
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
        message: "Doctor list",
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

router.route('/details')
  .post(authRequired())
  .post(detailsValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { id } = req.validData;

      let record = await sequelize.models.User
        .findOne({
          where: {
            id,
            role: Object.values(ROLES.DOCTOR),
          }
        });

      let data = await record.exposeData();

      res.json({
        code: 200,
        message: "Doctor details",
        data,
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
