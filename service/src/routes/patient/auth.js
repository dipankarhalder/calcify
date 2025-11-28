import express from 'express'
import { sequelize } from "../../db/models";
import { generateToken, genOtp, getEmailContent, sendMail, xDigitRandomNumber } from '../../utils';
import { loginValidator, otpValidator, sendOtpValidator } from '../../validationSchema/admin/auth';
import { checkAndSendOtp, registrationValidator } from '../../validationSchema/patient/auth';
import { ROLES } from '../../config';

const router = express.Router();

router.route('/registration')
  .post(registrationValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {
      let { email, password, otp, files } = req.validData;

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
        medicalCondition: req.validData.medicalCondition.join('##'),
        presentMedication: req.validData.presentMedication.join('##'),
        specificGoals: req.validData.specificGoals.join('##'),
        password: sequelize.models.User.hashPassword(password),
        role: ROLES.PATIENT,
      });

      await user.save();

      await Promise.all((files || []).map(async (fileId) => {
        let fileObj = await sequelize.models.UserFile.build({
          userId: user.id,
          fileId
        });

        await fileObj.save();
      }));

      sendMail({
        to: email,
        subject: "Welcome: Calcify",
        htmlBody: await getEmailContent("welcomePatient", {
          name: [user.firstName, user.lastName].join(" ")
        })
      });

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
