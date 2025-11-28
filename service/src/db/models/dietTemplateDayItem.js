'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = {
  withCategory: false,
  withDietType: false,
  withFoodItem: false,
};

module.exports = (sequelize, DataTypes) => {

  class DietTemplateDayItem extends Model {

    async exposeData(options) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, dietConsumption,
        categoryId, dietTypeId, foodItemId,
        Category, DietType, FoodItem
      } = this;

      let data = {
        id,
        dietConsumption,
        categoryId,
        dietTypeId,
        foodItemId,
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

      let dietType = null;

      if (options.withDietType) {
        dietType = await DietType?.exposeData();

        if (!Category && categoryId) {
          dietType = await sequelize.models.DietType.findByPk(dietTypeId);

          dietType = await dietType.exposeData();
        }
      }

      data.dietType = dietType;

      let foodItem = null;

      if (options.withFoodItem) {
        foodItem = await FoodItem?.exposeData();

        if (!FoodItem && foodItemId) {
          foodItem = await sequelize.models.FoodItem.findByPk(foodItemId);

          foodItem = await foodItem.exposeData();
        }
      }

      data.foodItem = foodItem;

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DietTemplateDayItem.belongsTo(models.DietTemplateDay, { foreignKey: 'dietTemplateDayId', as: 'DietTemplateDay' });
      DietTemplateDayItem.belongsTo(models.DietType, { foreignKey: 'dietTypeId', as: 'DietType' });
      DietTemplateDayItem.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'Category' });
      DietTemplateDayItem.belongsTo(models.FoodItem, { foreignKey: 'foodItemId', as: 'FoodItem' });
    }
  };

  DietTemplateDayItem.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    dietTemplateDayId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dietTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    foodItemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dietConsumption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DietTemplateDayItem',
  });

  return DietTemplateDayItem;
};