'use strict';
import Sequelize, { Model } from "sequelize";
import moment from 'moment';

module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {

    static storeAndInvalidPrevOtp = async (email, otp, scope = "email:validation") => {
      await sequelize.models.Otp.destroy({
        where: {
          email,
          scope,
        }
      });

      let otpModel = await sequelize.models.Otp.build({
        email,
        otp,
        scope,
      });

      await otpModel.save();
    };

    static verifyLastOtp = async (email, otp, scope = "email:validation") => {
      let otpModel = await sequelize.models.Otp.findOne({
        where: {
          email,
          scope,
        },
        order: [
          ['createdAt', 'DESC']
        ],
      });

      if (otpModel && otpModel.otp == otp) {
        console.log("moment.diff minutes", moment().diff(otpModel.createdAt, 'minutes'));
        if (moment().diff(otpModel.createdAt, 'minutes') <= 10) {
          otpModel.destroy();
          return true;
        }
      }

      return false;

    };

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Otp.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Otp',
  });

  return Otp;
};