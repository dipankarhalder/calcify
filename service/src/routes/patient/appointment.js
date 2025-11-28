import express from 'express'
import _ from 'lodash';
import { Sequelize, sequelize } from "@/db/models";
import { bookValidator, deleteValidator, listValidator } from '@/validationSchema/patient/appointment';
import { ROLES } from '@/config';
import { splitToSlots } from '@/utils';
import { authRequired } from '@/middlewares';
import moment from "moment";

const router = express.Router();

router.route('/book')
  .post(authRequired({ role: [ROLES.PATIENT] }))
  .post(bookValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { slotId, note } = req.validData;

      let haveAlreadyAppointment = await sequelize.models.UserSlot.checkPatientAppointmentExists(slotId);

      if (haveAlreadyAppointment) {
        return res.json({
          code: 401,
          message: "You already booked",
          data: null
        });
      }

      let userSlot = await sequelize.models.UserSlot.bookPatientAppointment(req.auth.id, slotId, note);

      res.json({
        code: 200,
        message: "booked",
        data: await userSlot.exposeData(),
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
        type: sequelize.models.UserSlot.getTypes().PATIENT_APPOINTMENT,
        userId: req.auth.id
      };

      if (id) {
        whereCond = {
          ...whereCond,
          userId: id,
        }
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

      let totalRecord = await sequelize.models.UserSlot.scope(['withSlot']).count({
        where: whereCond
      });

      let totalPage = _.ceil(totalRecord / perPage);

      let rows = await sequelize.models.UserSlot
        .scope(['withSlot'])
        .findAll({
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
        message: "appointment list",
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
  .post(authRequired({ role: [ROLES.PATIENT] }))
  .post(deleteValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { id } = req.validData;

      let record = await sequelize.models.UserSlot.findOne({
        where: {
          id,
          userId: req.auth.id
        }
      });

      await record.destroy();

      res.json({
        code: 200,
        message: "appointment deleted",
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
