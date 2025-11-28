'use strict';
import Sequelize, { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {

  class DeviceToken extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.DeviceToken.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };

  DeviceToken.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DeviceToken',
  });

  return DeviceToken;
};