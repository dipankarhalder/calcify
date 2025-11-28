'use strict';
import Sequelize, { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {

  class DietType extends Model {

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

  DietType.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DietType',
  });

  return DietType;
};