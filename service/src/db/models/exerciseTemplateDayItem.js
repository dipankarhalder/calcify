'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = {
  withCategory: false,
  withExercise: false,
};

module.exports = (sequelize, DataTypes) => {

  class ExerciseTemplateDayItem extends Model {

    async exposeData(options) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, time, duration,
        categoryId, exerciseId,
        Category, Exercise
      } = this;

      let data = {
        id,
        time,
        duration,
        categoryId,
        exerciseId,
      }

      let category = null;

      if (options.withCategory) {
        category = await Category?.exposeData();

        if (!Category && categoryId) {
          category = await sequelize.models.Category.findByPk(categoryId);

          category = await category.exposeData();
        }
      }

      data.category = category;

      let exercise = null;

      if (options.withExercise) {
        exercise = await Exercise?.exposeData();

        if (!Exercise && exerciseId) {
          exercise = await sequelize.models.Exercise.findByPk(exerciseId);

          exercise = await exercise.exposeData();
        }
      }

      data.exercise = exercise;

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExerciseTemplateDayItem.belongsTo(models.ExerciseTemplateDay, { foreignKey: 'exerciseTemplateDayId', as: 'ExerciseTemplateDay' });
      ExerciseTemplateDayItem.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'Category' });
      ExerciseTemplateDayItem.belongsTo(models.Exercise, { foreignKey: 'exerciseId', as: 'Exercise' });
    }
  };

  ExerciseTemplateDayItem.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    exerciseTemplateDayId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    exerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ExerciseTemplateDayItem',
  });

  return ExerciseTemplateDayItem;
};