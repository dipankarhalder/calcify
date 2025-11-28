'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withCategory: false };

module.exports = (sequelize, DataTypes) => {

  class Exercise extends Model {

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, name, categoryId, imageId, calories, duration, description,
        specialInstruction, isPublic,
        Category
      } = this;

      let data = {
        id,
        name,
        categoryId,
        calories,
        duration,
        description,
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
      Exercise.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'Category' });
      Exercise.belongsTo(models.File, { foreignKey: 'imageId', as: 'Image' });
      Exercise.belongsTo(models.User, { foreignKey: 'createdBy', as: 'CreatedBy' });

      Exercise.addScope('withCategory', {
        include: [
          { model: sequelize.models.Category, as: 'Category' }
        ]
      });
    }
  };

  Exercise.init({
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
    duration: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precaution: {
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
    modelName: 'Exercise',
  });

  return Exercise;
};