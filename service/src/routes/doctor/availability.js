import express from 'express'
import _ from 'lodash';
import { Sequelize, sequelize } from "@/db/models";
import { addValidator, deleteValidator, listValidator } from '@/validationSchema/doctor/availability';
import { ROLES } from '@/config';
import { splitToSlots } from '@/utils';
import { authRequired } from '@/middlewares';
import moment from "moment";

const router = express.Router();

router.route('/add')
  .post(authRequired({ role: [...Object.values(ROLES.DOCTOR)] }))
  .post(addValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { times } = req.validData;

      let slotsToAssign = _.flatten((times || []).map(time => {
        return splitToSlots(time.from, time.to)
      }));

      await Promise.all((slotsToAssign || []).map(async (slot) => {
        let slotModel = await sequelize.models.Slot.getSlot(slot.from, slot.to);

        await sequelize.models.UserSlot.saveDoctorAvailablity(req.auth.id, slotModel.id);
        return;
      }));

      res.json({
        code: 200,
        message: "added",
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

router.route('/list')
  .post(authRequired())
  .post(listValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { page, perPage, orderBy, orderDir, query, date, id } = req.validData;

      page--;

      const offset = page * perPage;
      const limit = perPage;

      let whereCond = {
        type: sequelize.models.UserSlot.getTypes().DOCTOR_AVAILABLITY,
        userId: req.auth.id,
      };

      if (id) {
        whereCond.userId = id;
      }

      if (query) {
        whereCond = {
          ...whereCond,
          [Sequelize.Op.or]: [
            {
              note: {
                [Sequelize.Op.iLike]: `%${query}%`
              }
            },
          ]
        };
      }

      if (date) {
        date = moment(date);
        let startOf = date.startOf("day").format();
        let endOf = date.endOf("day").format();

        whereCond = {
          ...whereCond,
          [Sequelize.Op.or]: [
            {
              ['$Slot.from$']: {
                [Sequelize.Op.between]: [startOf, endOf]
              }
            },
            {
              ['$Slot.to$']: {
                [Sequelize.Op.between]: [startOf, endOf]
              }
            }
          ]
        }
      }

      const tempSQL = sequelize.dialect.queryGenerator.selectQuery(sequelize.models.UserSlot.getTableName(), {
        attributes: ['user_id'],
        where: sequelize.literal('parent_id = "UserSlot"."id" AND deleted_at IS NULL')
      }).slice(0, -1); // to remove the ';' from the end of the SQL

      let totalRecord = await sequelize.models.UserSlot.scope(['withSlot']).count({
        where: whereCond
      });

      let totalPage = _.ceil(totalRecord / perPage);

      let rows = await sequelize.models.UserSlot
        .scope(['withSlot'])
        .findAll({
          attributes: {
            include: [
              [sequelize.literal(`(${tempSQL})`), 'haveBooking']
            ]
          },
          where: whereCond,
          order: [
            [{ model: sequelize.models.Slot, as: 'Slot' }, orderBy, orderDir]
          ],
          offset,
          limit
        });

      let data = await Promise.all(rows.map(async r => await r.exposeData({ withSlot: true })));


      res.json({
        code: 200,
        message: "availablity list",
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
  .post(authRequired({ role: [...Object.values(ROLES.DOCTOR)] }))
  .post(deleteValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { id } = req.validData;

      let haveAlreadyAppointment = await sequelize.models.UserSlot.checkPatientAppointmentExists(id);

      if (haveAlreadyAppointment) {
        return res.json({
          code: 401,
          message: "Have booking",
          data: null
        });
      }

      let record = await sequelize.models.UserSlot.findOne({
        where: {
          id,
          userId: req.auth.id
        }
      });

      await record.destroy();

      res.json({
        code: 200,
        message: "UserSlot deleted",
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

export default router;
