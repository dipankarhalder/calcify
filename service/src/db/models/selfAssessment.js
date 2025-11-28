'use strict';
import Sequelize, { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {

  class SelfAssessment extends Model {

    static getTypes() {
      return {
        FRAX_SCORE: 'FRAX_SCORE',
        FALL_DETECTION: 'FALL_DETECTION',
        GROWTH_MONITORING: 'GROWTH_MONITORING',
        BLOOD_TEST_VITAMIN_D: 'BLOOD_TEST_VITAMIN_D',
        BLOOD_TEST_OSTEOPOROSIS: 'BLOOD_TEST_OSTEOPOROSIS',
      }
    }

    static getStatus() {
      return {
        EXCELLENT: 'EXCELLENT',
        MODERATE: 'MODERATE',
        RISKY: 'RISKY',
      }
    }

    exposeData() {
      let { id, type, inputData, calculatedData, status, effectiveDate } = this;

      return {
        id,
        type,
        inputData,
        calculatedData,
        status,
        effectiveDate,
      }
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SelfAssessment.belongsTo(models.User, { foreignKey: 'patientId', as: 'Patient' });
    }
  };

  SelfAssessment.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inputData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    calculatedData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    effectiveDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SelfAssessment',
  });

  return SelfAssessment;
};