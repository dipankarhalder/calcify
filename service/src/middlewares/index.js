import Joi, { ValidationError } from 'joi';
import _ from 'lodash'
export { uploadFiles } from "./fileUploader";
import * as utils from "../utils";

import {
  Sequelize, sequelize,
} from "../db/models";

let defaultOption = {
  exposeDataFromValidator: true,
  exposeDataKey: "validatorData"
}

export const validator = (schema, dataSource = null) => (options = defaultOption) => {
  return async (req, res, next) => {
    try {
      options = Object.assign({}, defaultOption, options);
      dataSource = dataSource ?? "body";

      let value = schema && await schema.validateAsync(req[dataSource], { abortEarly: false });

      if (options.exposeDataFromValidator) {
        req[options.exposeDataKey] = value
      }

      next();
    } catch (error) {
      if (error.isJoi) {
        error = error.details.map(({ message, type, context: { key, label } }) => ({
          message: message.replace(/['"]/g, ''),
          // type,
          field: label
        }))

        return res.status(200).json({
          code: 0,
          message: "VALIDATION ERROR",
          error
        })
      }

      next();
    }
  }
}

export const authOptional = () => {
  return async (req, res, next) => {
    const token = req.headers['authorization']

    // console.log("token", token);

    // if (token == null) return res.sendStatus(401) // if there isn't any token

    req.auth = null;

    if (!_.isEmpty(token)) {
      try {
        let auth = verifyToken(token);

        let student = await sequelize.models.User.findOne({
          where: {
            id: auth.id,
            registrationComplete: 1,
          }
        });

        req.auth = auth

        // console.log("authOptional student", student)

        // if (student && student.status == 1 && student.isBlocked == 0) {
        //   req.auth = auth;
        // }
      } catch (error) {
        console.log("authOptional error", error)
      }
    }

    next() // pass the execution off to whatever request the client intended
  }
}

const defaultAuthRequiredConfig = {
  role: []
};

export const authRequired = (config = defaultAuthRequiredConfig) => {
  return async (req, res, next) => {
    const token = req.headers['authorization'] || req.headers.authorization || req.headers["x-token"] || req.headers["X-Token"];

    console.log("token", token);
    if (_.isEmpty(token)) {
      return res.json({
        code: 403,
        message: "Invalid auth token",
        data: null
      });
    }

    try {
      let tokenData = await utils.token.verifyDecrypt(token);

      req.auth = tokenData;

      console.log("auth", req.auth);

      if (config.role.length) {
        if (!config.role.includes(tokenData.role)) {
          let err = new Error();
          err.name = "INVALID_ACCESS";
          throw err;
        }
      }

      // let userCount = await sequelize.models.User.findByPk(tokenData.id);

      // if (userCount == 1) {
      //   next() // pass the execution off to whatever request the client intended
      // } else {
      //   return res.json({
      //     code: 403,
      //     message: "Invalid auth token",
      //     data: null
      //   });
      // }

      next(); // pass the execution off to whatever request the client intended

    } catch (error) {
      console.log("authRequired error", error);
      if (error.name == "INVALID_ACCESS") {
        return res.json({
          code: -10,
          message: "INVALID_ACCESS",
          data: null
        });
      }

      if (error.name == "TOKEN_EXPIRED") {
        return res.json({
          code: -401,
          message: "Token Expired",
          data: null
        });
      }
      return res.json({
        code: -10,
        message: "Invalid auth token",
        data: null
      });

    }
  }
}

export const adminAuthRequired = () => {
  return async (req, res, next) => {
    const token = req.headers['authorization']

    console.log("token", token);
    if (_.isEmpty(token)) {
      return res.json({
        code: 403,
        message: "Invalid auth token",
        data: null
      });
    }

    try {
      req.auth = verifyToken(token)
      let userCount = await sequelize.models.Admin.count({
        where: {
          id: req.auth.id,
        }
      });

      if (userCount == 1) {
        next() // pass the execution off to whatever request the client intended
      } else {
        return res.json({
          code: 403,
          message: "Invalid auth token",
          data: null
        });
      }

    } catch (error) {
      console.log("authRequired error", error);
      if (error.name == "TOKEN_EXPIRED") {
        return res.json({
          code: -401,
          message: "Token Expired",
          data: null
        });
      } else {
        return res.json({
          code: 403,
          message: "Invalid auth token",
          data: null
        });
      }
    }
  }
}

export const serviceUnderMaintenance = async (req, res, next) => {
  return res.json({
    code: 500,
    message: "Service under maintenance",
    data: null
  });
};

export const checkAppVersionAndMandatoryUpdate = async (req, res, next) => {

  const appVersionHeader = req.headers['app-version'] || "0"
  console.log("appVersionHeader", appVersionHeader);

  // if (!_.isEmpty(appVersionHeader)) {

  let currentAppVersion = parseFloat(appVersionHeader)

  console.log("currentAppVersion", currentAppVersion);

  let settingMinMandatoryAppVersion = await sequelize.models.Setting.findOne({
    where: {
      key: "min_mandatory_app_version"
    }
  });

  let minMandatoryAppVersion = parseFloat(settingMinMandatoryAppVersion.value || 1)

  console.log("minMandatoryAppVersion", minMandatoryAppVersion);

  if (minMandatoryAppVersion > currentAppVersion) {
    return res.json({
      code: 300,
      message: "There is a newer version of this application is available, please update the application form play store",
      data: {
        mandatory: 1
      }
    });
  }
  // }

  next();
};