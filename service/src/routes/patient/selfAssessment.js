import express from 'express'
import moment from 'moment';
import _ from 'lodash';
import { sequelize } from "@/db/models";
import { ROLES } from '@/config';
import { authRequired } from '@/middlewares';
import * as selfAssessmentUtil from '@/utils/selfAssessmentUtil'
import { getEmailContent, sendMail } from '@/utils';
import {
  addFallDetectionValidator, addFraxScoreValidator, addGrowthChartValidator, addVitaminDValidator,
  getDataValidator,
} from '@/validationSchema/patient/selfAssessment';

const router = express.Router();

const generateTable = (data) => {
  let outputRows = Object.keys(data)
    .map((key) => {
      return `<tr>
    <td>${_.startCase(key)}</td>
    <td>${data[key]}</td>
    </tr>`
    })

  let outputTable = `<table>
  <tbody>
  ${outputRows}
  </tbody>
  </table>`;

  return outputTable;
};

router.route("/fraxScore")
  .post(authRequired({ role: [ROLES.PATIENT] }))
  .post(addFraxScoreValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let { testFor, relationShip, relationShipName, ...inputData } = req.validData;

      let result = await selfAssessmentUtil.getFraxResult(req.validData);

      let selfAssessment;

      let getStatus = (score) => {
        return score <= 10 ? sequelize.models.SelfAssessment.getStatus().EXCELLENT
          : 11 <= score && score <= 20 ? sequelize.models.SelfAssessment.getStatus().MODERATE
            : sequelize.models.SelfAssessment.getStatus().RISKY;
      }

      if (!result.error) {
        selfAssessment = await sequelize.models.SelfAssessment.build({
          type: sequelize.models.SelfAssessment.getTypes().FRAX_SCORE,
          patientId: req.auth.id,
          inputData,
          calculatedData: result,
          effectiveDate: moment().format("YYYY-MM-DD"),
          status: result.majorOsteoporotic && getStatus(Number(result.majorOsteoporotic))
        });

        if (testFor == "SELF") {
          await selfAssessment.save();
        }

        let inputRowsData = inputData;

        if (testFor == "OTHER") {
          inputRowsData.relationship = relationShip;
          inputRowsData.relationshipName = relationShipName;
        }

        let inputTable = generateTable(inputRowsData)

        let outputRowsData = result;
        outputRowsData.status = selfAssessment.status;

        let outputTable = generateTable(outputRowsData);

        let user = await sequelize.models.User.findByPk(req.auth.id);

        sendMail({
          to: user.email,
          subject: "selfAssessment: Calcify",
          htmlBody: await getEmailContent("selfAssessment", {
            name: [user.firstName, user.lastName].join(" "),
            inputTable,
            outputTable
          })
        });
      }

      // TODO : Send an email

      res.json({
        code: 200,
        message: "fraxScore",
        data: selfAssessment && await selfAssessment?.exposeData() || null,
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

router.route("/growthChart")
  .post(authRequired({ role: [ROLES.PATIENT] }))
  .post(addGrowthChartValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let selfAssessment = await sequelize.models.SelfAssessment.build({
        type: sequelize.models.SelfAssessment.getTypes().GROWTH_MONITORING,
        patientId: req.auth.id,
        inputData: req.validData,
        calculatedData: req.validData,
        effectiveDate: moment().format("YYYY-MM-DD"),
        status: sequelize.models.SelfAssessment.getStatus().MODERATE,
      })

      await selfAssessment.save();

      res.json({
        code: 200,
        message: "growthChart",
        data: await selfAssessment.exposeData(),
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

router.route("/bloodTestVitaminD")
  .post(authRequired({ role: [ROLES.PATIENT] }))
  .post(addVitaminDValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let selfAssessment = await sequelize.models.SelfAssessment.build({
        type: sequelize.models.SelfAssessment.getTypes().BLOOD_TEST_VITAMIN_D,
        patientId: req.auth.id,
        inputData: req.validData,
        calculatedData: req.validData,
        effectiveDate: moment().format("YYYY-MM-DD"),
        status: sequelize.models.SelfAssessment.getStatus().RISKY,
      });

      await selfAssessment.save();

      res.json({
        code: 200,
        message: "bloodTestVitaminD",
        data: await selfAssessment.exposeData(),
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

router.route("/bloodTestOsteoporosis")
  .post(authRequired({ role: [ROLES.PATIENT] }))
  .post(async (req, res, next) => {
    try {

      let selfAssessment = await sequelize.models.SelfAssessment.create({
        type: sequelize.models.SelfAssessment.getTypes().BLOOD_TEST_OSTEOPOROSIS,
        patientId: req.auth.id,
        inputData: req.body,
        calculatedData: req.body,
        effectiveDate: moment().format("YYYY-MM-DD"),
        status: sequelize.models.SelfAssessment.getStatus().RISKY,
      })

      await selfAssessment.save();

      res.json({
        code: 200,
        message: "bloodTestOsteoporosis",
        data: await selfAssessment.exposeData(),
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

router.route("/fallDetection")
  .post(authRequired({ role: [ROLES.PATIENT] }))
  .post(addFallDetectionValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let result = await selfAssessmentUtil.getFallDetectionResult(req.validData.total)

      let status = result.status;
      delete result.status;
      let calculatedData = result;

      let selfAssessment = await sequelize.models.SelfAssessment.build({
        type: sequelize.models.SelfAssessment.getTypes().FALL_DETECTION,
        patientId: req.auth.id,
        inputData: req.validData,
        calculatedData,
        effectiveDate: moment().format("YYYY-MM-DD"),
        status
      });

      await selfAssessment.save();

      res.json({
        code: 200,
        message: "fallDetection",
        data: await selfAssessment.exposeData(),
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

router.route("/getData")
  .post(authRequired({ role: [ROLES.PATIENT] }))
  .post(getDataValidator({ exposeDataKey: "validData" }))
  .post(async (req, res, next) => {
    try {

      let { type, date } = req.validData

      let whereCond = {
        patientId: req.auth.id,
        type
      };

      if (date) {
        whereCond.effectiveDate = new Date(date)
      }

      let selfAssessment = await sequelize.models.SelfAssessment.findOne({
        where: whereCond,
        order: [['createdAt', 'DESC']]
      });

      // TODO : Send an email

      res.json({
        code: 200,
        message: "getData",
        data: selfAssessment && await selfAssessment.exposeData() || null,
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
