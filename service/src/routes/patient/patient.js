import express from 'express'
import _ from 'lodash'
import { Sequelize, sequelize } from "@/db/models";
import { ROLES } from '@/config';
import { authRequired } from '@/middlewares';
import { detailsValidator, dietListByDateValidator, exerciseListByDateValidator, listValidator } from '@/validationSchema/patient/patient';
import moment from 'moment';

const router = express.Router();

router.route('/list')
  .post(authRequired())
  .post(listValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { page, perPage, orderBy, orderDir, query } = req.validData;

      page--;

      const offset = page * perPage;
      const limit = perPage;

      let whereCond = {
        role: ROLES.PATIENT,
      };

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
        message: "Patient list",
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
            role: ROLES.PATIENT,
          }
        });

      let data = await record.exposeData();

      res.json({
        code: 200,
        message: "Patient details",
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

router.route('/dietListByDate')
  .post(authRequired())
  .post(dietListByDateValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { id, date } = req.validData;

      let day = (moment(date).format('dddd') || "").toUpperCase();

      const tempSQL = sequelize.dialect.queryGenerator.selectQuery(sequelize.models.PatientDietTemplate.getTableName(), {
        attributes: ['id'],
        where: {
          patient_id: id,
          start_date: {
            [Sequelize.Op.lte]: date
          },
          end_date: {
            [Sequelize.Op.gte]: date
          },
          deleted_at: null,
        }
      }).slice(0, -1); // to remove the ';' from the end of the SQL

      let record = await sequelize.models.PatientDietTemplateDay
        .scope(['withItems'])
        .findOne({
          where: {
            dietTemplateId: {
              [Sequelize.Op.in]: sequelize.literal(`(${tempSQL})`)
            },
            day
          }
        });

      let data = record && await record.exposeData({ withItems: true });

      res.json({
        code: 200,
        message: "dietListByDate",
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

router.route('/exerciseListByDate')
  .post(authRequired())
  .post(exerciseListByDateValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { id, date } = req.validData;

      let day = (moment(date).format('dddd') || "").toUpperCase();

      const tempSQL = sequelize.dialect.queryGenerator.selectQuery(sequelize.models.PatientExerciseTemplate.getTableName(), {
        attributes: ['id'],
        where: {
          patient_id: id,
          start_date: {
            [Sequelize.Op.lte]: date
          },
          end_date: {
            [Sequelize.Op.gte]: date
          },
          deleted_at: null,
        }
      }).slice(0, -1); // to remove the ';' from the end of the SQL

      let record = await sequelize.models.PatientExerciseTemplateDay
        .scope(['withItems'])
        .findOne({
          where: {
            exerciseTemplateId: {
              [Sequelize.Op.in]: sequelize.literal(`(${tempSQL})`)
            },
            day
          }
        });

      let data = record && await record.exposeData({ withItems: true });

      res.json({
        code: 200,
        message: "exerciseListByDate",
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

router.route('/dashboard')
  .post(authRequired())
  .post(async (req, res, next) => {
    try {
      let record = await sequelize.models.User
        .findOne({
          where: {
            id: req.auth.id,
            role: ROLES.PATIENT,
          }
        });

      let data = await record.exposeData();

      res.json({
        code: 200,
        message: "Patient dashboard",
        data: {
          medicalCondition: data.medicalCondition,
          presentMedication: data.presentMedication,
          specificGoals: data.specificGoals,
        },
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
