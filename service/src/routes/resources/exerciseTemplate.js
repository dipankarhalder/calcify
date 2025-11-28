import express from 'express'
import _ from 'lodash'
import moment from 'moment';
import { Sequelize, sequelize } from "@/db/models";
import { ROLES } from '@/config';
import { authRequired } from '@/middlewares';
import {
  addValidator, assignExerciseTemplateToPatientValidator, checkExerciseExistOfPatientValidator,
  deleteValidator, detailsValidator, listValidator, updateDayWiseValidator
} from '@/validationSchema/resources/exerciseTemplate';

const router = express.Router();

router.route('/add')
  .post(authRequired({ role: [ROLES.DOCTOR.THERAPIST, ROLES.DOCTOR.PANEL] }))
  .post(addValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let record = await sequelize.models.ExerciseTemplate.build({
        ...req.validData,
        createdBy: req.auth.id,
      });

      await record.save();

      await Promise.all(req.validData['days'].map(async (day) => {

        let dayRecord = await sequelize.models.ExerciseTemplateDay.build({
          ...day,
          exerciseTemplateId: record.id,
        });

        await dayRecord.save();

        await Promise.all(day.items.map(async (item) => {
          let dayItemRecord = await sequelize.models.ExerciseTemplateDayItem.build({
            ...item,
            exerciseTemplateDayId: dayRecord.id,
          });

          return await dayItemRecord.save();
        }));

        return dayRecord;
      }));

      res.json({
        code: 200,
        message: "ExerciseTemplate added",
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

      let totalRecord = await sequelize.models.ExerciseTemplate.scope(null).count({
        where: whereCond
      });

      let totalPage = _.ceil(totalRecord / perPage);

      let rows = await sequelize.models.ExerciseTemplate
        .scope(["withDaysItems"])
        .findAll({
          where: whereCond,
          order: [
            [orderBy, orderDir]
          ],
          offset,
          limit
        });

      let data = await Promise.all(rows.map(async r => await r.exposeData({ withDaysItems: true })));

      res.json({
        code: 200,
        message: "ExerciseTemplate list",
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

router.route('/delete')
  .post(authRequired({ role: [ROLES.DOCTOR.THERAPIST, ROLES.DOCTOR.PANEL] }))
  .post(deleteValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { id } = req.validData;

      let record = await sequelize.models.ExerciseTemplate.findOne({
        where: {
          id
        }
      });

      await record.destroy();

      res.json({
        code: 200,
        message: "ExerciseTemplate deleted",
        data: null,
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

      let record = await sequelize.models.ExerciseTemplate
        .scope(["withDaysItems"])
        .findOne({
          where: {
            id
          }
        });

      let data = await record.exposeData({ withDaysItems: true });

      res.json({
        code: 200,
        message: "ExerciseTemplate details",
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

router.route('/updateDayWise')
  .post(authRequired({ role: [ROLES.DOCTOR.THERAPIST, ROLES.DOCTOR.PANEL] }))
  .post(updateDayWiseValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { dayId, items } = req.validData;

      let record = await sequelize.models.ExerciseTemplateDay
        .findOne({
          where: {
            id: dayId
          }
        });

      await record.update({
        ...req.validData
      });

      await sequelize.models.ExerciseTemplateDayItem.destroy({
        where: {
          exerciseTemplateDayId: record.id,
        },
        force: true
      });

      await Promise.all(items.map(async (item) => {
        let dayItemRecord = await sequelize.models.ExerciseTemplateDayItem.build({
          ...item,
          exerciseTemplateDayId: record.id,
        });

        return await dayItemRecord.save();
      }));

      let data = await record.exposeData({ withItems: true });

      res.json({
        code: 200,
        message: "ExerciseTemplateDay updated",
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

let checkExerciseExistsPatient = async (patientId, startDate, endDate) => {
  let getDateRange = (startDate, endDate) => {
    var now = moment(startDate).clone(), dates = [];

    while (now.isSameOrBefore(moment(endDate))) {
      dates.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return dates;
  };

  let checkExerciseExistsOnDate = async (patientId, date) => {
    let record = await sequelize.models.PatientExerciseTemplate
      .unscoped()
      .count({
        where: {
          patientId,
          endDate: {
            [Sequelize.Op.gte]: moment() // today date
          },
          [Sequelize.Op.and]: [
            {
              startDate: {
                [Sequelize.Op.lte]: date
              }
            },
            {
              endDate: {
                [Sequelize.Op.gte]: date
              }
            }
          ]
        }
      });

    return Boolean(record);
  };

  let dates = getDateRange(startDate, endDate);

  let data = await Promise.all((dates || []).map(async (date) => {
    let haveDiet = await checkExerciseExistsOnDate(patientId, date);

    return {
      date,
      haveDiet
    }
  }));

  let haveDietDates = _.filter(data, "haveDiet");

  if (!_.isEmpty(haveDietDates)) {
    let dietDates = _.map(haveDietDates, "date");
    return {
      haveDiet: true,
      message: "Having diets on " + dietDates.join(", "),
      date: dietDates
    };
  }

  return {
    haveDiet: false,
    message: "No Exercise",
    date: []
  };
};

router.route('/checkExerciseExistOfPatient')
  .post(authRequired({ role: [ROLES.DOCTOR.THERAPIST, ROLES.DOCTOR.PANEL] }))
  .post(checkExerciseExistOfPatientValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { patientId, startDate, endDate } = req.validData;

      let checkDietExists = await checkExerciseExistsPatient(patientId, startDate, endDate);

      res.json({
        code: checkDietExists.haveDiet ? 401 : 200,
        message: checkDietExists.message,
        data: checkDietExists.date,
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

router.route('/assignExerciseTemplateToPatient')
  .post(authRequired({ role: [ROLES.DOCTOR.THERAPIST, ROLES.DOCTOR.PANEL] }))
  .post(assignExerciseTemplateToPatientValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let { patientId, startDate, endDate, saveCloneToResource } = req.validData;

      let checkExists = await checkExerciseExistsPatient(patientId, startDate, endDate);

      if (checkExists.haveDiet) {
        return res.json({
          code: 401,
          message: checkExists.message,
          data: checkExists.date,
        });
      }

      let record = await sequelize.models.PatientExerciseTemplate.build({
        ...req.validData,
        doctorId: req.auth.id,
      });

      await record.save();

      // console.log("sequelize.models.DietTemplate", sequelize.models.DietTemplate.prototype);
      await Promise.all(req.validData['days'].map(async (day) => {

        let dayRecord = await sequelize.models.PatientExerciseTemplateDay.build({
          ...day,
          exerciseTemplateId: record.id,
        });

        await dayRecord.save();

        await Promise.all(day.items.map(async (item) => {
          let dayItemRecord = await sequelize.models.PatientExerciseTemplateDayItem.build({
            ...item,
            exerciseTemplateDayId: dayRecord.id,
          });

          return await dayItemRecord.save();
        }));

        return dayRecord;
      }));

      if (saveCloneToResource) {
        let record = await sequelize.models.ExerciseTemplate.build({
          ...req.validData,
          createdBy: req.auth.id,
        });

        await record.save();

        // console.log("sequelize.models.ExerciseTemplate", sequelize.models.ExerciseTemplate.prototype);
        await Promise.all(req.validData['days'].map(async (day) => {

          let dayRecord = await sequelize.models.ExerciseTemplateDay.build({
            ...day,
            exerciseTemplateId: record.id,
          });

          await dayRecord.save();

          await Promise.all(day.items.map(async (item) => {
            let dayItemRecord = await sequelize.models.ExerciseTemplateDayItem.build({
              ...item,
              exerciseTemplateDayId: dayRecord.id,
            });

            return await dayItemRecord.save();
          }));

          return dayRecord;
        }));
      }

      res.json({
        code: 200,
        message: "assigned",
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

export default router;
