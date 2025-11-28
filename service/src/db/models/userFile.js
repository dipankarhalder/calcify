'use strict';
import Sequelize, { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {

  class UserFile extends Model {

    exposeData() {
      let { id, path, url } = this;

      return {
        id,
        path,
        url
      }
    }

    redirectUrl() {
      return process.env.S3_REDIRECT_ENDPOINT + this.path;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserFile.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      UserFile.belongsTo(models.File, { foreignKey: 'fileId', as: 'File' });
    }
  };

  UserFile.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    userId: {
      type: DataTypes.UUID,
    },
    fileId: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'UserFile',
  });

  return UserFile;
};