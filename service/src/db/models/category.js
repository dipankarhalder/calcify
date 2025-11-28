'use strict';
import Sequelize, { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {

  class Category extends Model {

    static getTypes() {
      return {
        DIET: "DIET",
        EXERCISE: "EXERCISE"
      }
    }

    exposeData() {
      let { id, name } = this;

      return {
        id,
        name,
      }
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.Account.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };

  Category.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};