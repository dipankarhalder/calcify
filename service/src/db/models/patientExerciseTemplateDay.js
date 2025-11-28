'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withItems: false };

module.exports = (sequelize, DataTypes) => {

  class PatientExerciseTemplateDay extends Model {

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, day, specialInstruction,
        Items,
      } = this;

      let data = {
        id,
        day,
        specialInstruction,
      }

      let items = null;

      if (options.withItems) {
        items = await Promise.all((Items || [])
          .map(async i => await i?.exposeData({
            withCategory: true,
            withExercise: true,
          })));

        if (!Items) {
          items = await sequelize.models.PatientExerciseTemplateDayItem.findAll({
            where: {
              exerciseTemplateDayId: this.id,
            },
            include: [{
              model: sequelize.models.Category,
              as: 'Category'
            }, {
              model: sequelize.models.Exercise,
              as: 'Exercise'
            }]
          });

          items = await Promise.all((items || [])
            .map(async i => await i?.exposeData({
              withCategory: true,
              withExercise: true,
            })));
        }
      }

      data.items = items;

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PatientExerciseTemplateDay.belongsTo(models.PatientExerciseTemplate, { foreignKey: 'exerciseTemplateId', as: 'ExerciseTemplate' });
      PatientExerciseTemplateDay.hasMany(models.PatientExerciseTemplateDayItem, { foreignKey: 'exerciseTemplateDayId', as: 'Items' });

      PatientExerciseTemplateDay.addScope('withExerciseTemplate', {
        include: [
          { model: sequelize.models.PatientExerciseTemplate, as: 'ExerciseTemplate' }
        ]
      });

      PatientExerciseTemplateDay.addScope('withItems', {
        include: [
          { model: sequelize.models.PatientExerciseTemplateDayItem, as: 'Items' }
        ]
      });
    }
  };

  PatientExerciseTemplateDay.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    exerciseTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialInstruction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'PatientExerciseTemplateDay',
  });

  return PatientExerciseTemplateDay;
};