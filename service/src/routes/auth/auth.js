import express from 'express'
import { sequelize } from "@/db/models";
import { genOtp, getEmailContent, sendMail, token } from '@/utils';
import { checkAndSendOtp, forgetPasswordStep1, forgetPasswordStep2, loginValidator } from '@/validationSchema/common/auth';

const router = express.Router();

router.route('/checkAndSendOtp')
  .post(checkAndSendOtp({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { email } = req.validData;

      let isEmailExists = await sequelize.models.User.checkEmailExists(email);

      if (isEmailExists) {
        return res.json({
          code: 401,
          message: "Email already exists",
          data: null
        });
      }

      let otp = genOtp();

      sequelize.models.Otp.storeAndInvalidPrevOtp(email, otp);

      if (!process.env.isTestMode) {
        sendMail({
          to: email,
          subject: "OTP: Calcify",
          htmlBody: await getEmailContent("otp", { otp })
        });
      }

      res.json({
        code: 200,
        message: "OTP send to your email",
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

router.route('/forgetPasswordStep1')
  .post(forgetPasswordStep1({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { email } = req.validData;

      let isEmailExists = await sequelize.models.User.checkEmailExists(email);

      if (!isEmailExists) {
        return res.json({
          code: 401,
          message: "Email does not exists",
          data: null
        });
      }

      let otp = genOtp();

      sequelize.models.Otp.storeAndInvalidPrevOtp(email, otp, "email:forgetpassword");

      if (!process.env.isTestMode) {
        sendMail({
          to: email,
          subject: "Calcify: Forget Password OTP",
          htmlBody: `Your Calcify Forget Password OTP is ${otp}`
        });
      }

      res.json({
        code: 200,
        message: "OTP send to your email",
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

router.route('/forgetPasswordStep2')
  .post(forgetPasswordStep2({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { otp, email, password } = req.validData;

      let isEmailExists = await sequelize.models.User.checkEmailExists(email);

      if (!isEmailExists) {
        return res.json({
          code: 401,
          message: "Email does not exists",
          data: null
        });
      }

      let isOtpValid = await sequelize.models.Otp.verifyLastOtp(email, otp, "email:forgetpassword");

      if (!isOtpValid) {
        return res.json({
          code: 401,
          message: "Invalid OTP",
          data: null
        });
      }

      let user = await sequelize.models.User.findOne({
        where: {
          email,
        }
      });
      user.password = sequelize.models.User.hashPassword(password);

      await user.save();

      res.json({
        code: 200,
        message: "password updated",
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

router.route('/login')
  .post(loginValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {

    let { email, password } = req.validData;

    let user = await sequelize.models.User
      .findOne({
        where: {
          email,
        }
      });

    if (user) {
      if (user.validatePassword(password)) {
        res.json({
          code: 200,
          message: "loggin",
          data: await user.exposeData(),
          token: await token.generateEncrypt({ id: user.id, role: user.role, })
        });
      } else {
        res.json({
          code: 401,
          message: "Please check your credentials",
          data: null
        });
      }
    } else {
      res.json({
        code: 401,
        message: "Please check your credentials",
        data: null
      });
    }

  });

export default router;
