'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withCategory: false };

module.exports = (sequelize, DataTypes) => {

  class FoodItem extends Model {

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, name, categoryId, calories, calcium, quantity,
        recipe, specialInstruction, isPublic, imageId,
        Category
      } = this;

      let data = {
        id,
        name,
        categoryId,
        calories,
        calcium,
        quantity,
        recipe,
        specialInstruction,
        imageId,
        isPublic,
      }

      let category = null;

      if (options.withCategory) {
        category = await Category?.exposeData();

        if (!Category && categoryId) {
          category = await sequelize.models.Category.findByPk(categoryId);

          category = category.exposeData();
        }
      }

      data.category = category;

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodItem.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'Category' });
      FoodItem.belongsTo(models.File, { foreignKey: 'imageId', as: 'Image' });
      FoodItem.belongsTo(models.User, { foreignKey: 'createdBy', as: 'CreatedBy' });

      FoodItem.addScope('withCategory', {
        include: [
          { model: sequelize.models.Category, as: 'Category' }
        ]
      });
    }
  };

  FoodItem.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    calcium: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    specialInstruction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'FoodItem',
  });

  return FoodItem;
};