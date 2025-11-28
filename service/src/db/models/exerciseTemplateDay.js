'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withItems: false };

module.exports = (sequelize, DataTypes) => {

  class ExerciseTemplateDay extends Model {

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
          items = await sequelize.models.ExerciseTemplateDayItem.findAll({
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
      ExerciseTemplateDay.belongsTo(models.ExerciseTemplate, { foreignKey: 'exerciseTemplateId', as: 'ExerciseTemplate' });
      ExerciseTemplateDay.hasMany(models.ExerciseTemplateDayItem, { foreignKey: 'exerciseTemplateDayId', as: 'Items' });

      ExerciseTemplateDay.addScope('withExerciseTemplate', {
        include: [
          { model: sequelize.models.ExerciseTemplate, as: 'ExerciseTemplate' }
        ]
      });

      ExerciseTemplateDay.addScope('withItems', {
        include: [
          { model: sequelize.models.ExerciseTemplateDayItem, as: 'Items' }
        ]
      });
    }
  };

  ExerciseTemplateDay.init({
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
    modelName: 'ExerciseTemplateDay',
  });

  return ExerciseTemplateDay;
};