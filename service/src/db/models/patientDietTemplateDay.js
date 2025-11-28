'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withItems: false };

module.exports = (sequelize, DataTypes) => {

  class PatientDietTemplateDay extends Model {

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, day, totalCalories, totalCalcium, specialInstruction,
        Items,
      } = this;

      let data = {
        id,
        day,
        totalCalories,
        totalCalcium,
        specialInstruction,
      }

      let items = null;

      if (options.withItems) {
        items = await Promise.all((Items || [])
          .map(async i => await i?.exposeData({
            withCategory: true,
            withDietType: true,
            withFoodItem: true,
          })));

        if (!Items) {
          items = await sequelize.models.PatientDietTemplateDayItem.findAll({
            where: {
              dietTemplateDayId: this.id,
            },
            include: [{
              model: sequelize.models.Category,
              as: 'Category'
            }, {
              model: sequelize.models.DietType,
              as: 'DietType'
            }, {
              model: sequelize.models.FoodItem,
              as: 'FoodItem'
            }]
          });

          items = await Promise.all((items || [])
            .map(async i => await i?.exposeData({
              withCategory: true,
              withDietType: true,
              withFoodItem: true,
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
      PatientDietTemplateDay.belongsTo(models.PatientDietTemplate, { foreignKey: 'dietTemplateId', as: 'DietTemplate' });
      PatientDietTemplateDay.hasMany(models.PatientDietTemplateDayItem, { foreignKey: 'dietTemplateDayId', as: 'Items' });

      PatientDietTemplateDay.addScope('withDietTemplate', {
        include: [
          { model: sequelize.models.PatientDietTemplate, as: 'DietTemplate' }
        ]
      });

      PatientDietTemplateDay.addScope('withItems', {
        include: [
          {
            model: sequelize.models.PatientDietTemplateDayItem,
            as: 'Items',
            include: [{
              model: sequelize.models.Category,
              as: 'Category'
            }, {
              model: sequelize.models.DietType,
              as: 'DietType'
            }, {
              model: sequelize.models.FoodItem,
              as: 'FoodItem'
            }]
          }
        ]
      });
    }
  };

  PatientDietTemplateDay.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    dietTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalCalories: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    totalCalcium: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    specialInstruction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'PatientDietTemplateDay',
  });

  return PatientDietTemplateDay;
};