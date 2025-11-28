'use strict';
import Sequelize, { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {

  class Plan extends Model {

    exposeData() {
      let { id, name, description, price, mediaPerDay, level } = this;

      return {
        id,
        name,
        description,
        price,
        mediaPerDay,
        level
      }
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Plan.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    mediaPerDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    amountPerMedia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Plan',
  });

  return Plan;
};