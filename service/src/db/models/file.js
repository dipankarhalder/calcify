'use strict';
import Sequelize, { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {

  class File extends Model {

    exposeData() {
      let { id, name, path, url } = this;

      return {
        id,
        name,
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
      // File.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };

  File.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    userId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id ? process.env.S3_HTTP_ENDPOINT + this.id : "";
      },
      set(value) {
        throw new Error('Do not try to set the `path` value!');
      }
    }
  }, {
    sequelize,
    modelName: 'File',
  });

  return File;
};