'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withDaysItems: false };

module.exports = (sequelize, DataTypes) => {

  class PatientExerciseTemplate extends Model {

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, name, isPublic,
        Days
      } = this;

      let data = {
        id,
        name,
        isPublic,
      }

      let days = null;

      if (options.withDaysItems) {
        days = await Promise.all((Days || [])
          .map(async d => await d?.exposeData({ withItems: true })));

        if (!Days) {
          // days = await sequelize.models.Region.findByPk(regionId);

          // days = days.exposeData();
        }
      }

      data.days = days;

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PatientExerciseTemplate.hasMany(models.PatientExerciseTemplateDay, { foreignKey: 'exerciseTemplateId', as: 'Days' });
      PatientExerciseTemplate.belongsTo(models.User, { foreignKey: 'createdBy', as: 'CreatedBy' });

      PatientExerciseTemplate.addScope('withRegion', {
        include: [
          { model: sequelize.models.Region, as: 'Region' }
        ]
      });

      PatientExerciseTemplate.addScope('withDaysItems', {
        include: [{
          model: sequelize.models.PatientExerciseTemplateDay,
          as: 'Days',
          include: [{
            model: sequelize.models.PatientExerciseTemplateDayItem,
            as: 'Items',
            include: [{
              model: sequelize.models.Category,
              as: 'Category'
            }, {
              model: sequelize.models.Exercise,
              as: 'Exercise'
            }]
          }]
        }]
      });
    }
  };

  PatientExerciseTemplate.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    doctorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'PatientExerciseTemplate',
  });

  return PatientExerciseTemplate;
};