import express from 'express'
import { sequelize } from "@/db/models";
import { authRequired } from '@/middlewares';
import { updateProfile } from '@/validationSchema/common/profile';
import { ROLES } from '@/config';

const router = express.Router();

router.route('/get')
  .get(authRequired())
  .get(async (req, res, next) => {
    try {

      let user = await sequelize.models.User.findByPk(req.auth.id);

      return res.json({
        code: 401,
        message: "profile details",
        data: await user.exposeData(),
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

router.route('/update')
  .post(authRequired())
  .post(updateProfile({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { type, details } = req.validData;

      let user = await sequelize.models.User.update(details, {
        where: {
          id: req.auth.id,
          role: type == ROLES.PATIENT ? ROLES.PATIENT : Object.values(ROLES.DOCTOR)
        }
      })

      res.json({
        code: 200,
        message: "profile updated",
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

export default router;
