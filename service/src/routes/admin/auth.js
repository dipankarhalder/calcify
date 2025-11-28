import express from 'express'
import { sequelize } from "../../db/models";
import { registrationValidator } from '../../validationSchema/admin/auth';
import { ROLES } from '../../config';

const router = express.Router();

router.route('/registration')
  .post(registrationValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { email, password, otp } = req.validData;

      let isEmailExists = await sequelize.models.User.checkEmailExists(email);

      if (isEmailExists) {
        return res.json({
          code: 401,
          message: "Email already exists",
          data: null
        });
      }

      let isOtpValid = await sequelize.models.Otp.verifyLastOtp(email, otp);

      if (!isOtpValid) {
        return res.json({
          code: 401,
          message: "Invalid OTP",
          data: null
        });
      }

      let user = await sequelize.models.User.build({
        ...req.validData,
        password: sequelize.models.User.hashPassword(password),
        role: ROLES.ADMIN,
      });

      await user.save();

      res.json({
        code: 200,
        message: "successfully registered",
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

export default router;
