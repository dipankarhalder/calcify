'use strict';
import _ from "lodash";
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withCreatedBy: false };

module.exports = (sequelize, DataTypes) => {

  class Blog extends Model {

    static getTypes() {
      return {
        BLOG: "BLOG",
        RESEARCH: "RESEARCH"
      }
    }

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, title, content, files, publishedAt, createdBy,
        CreatedBy
      } = this;

      let data = {
        id,
        title,
        content,
        files,
        publishedAt
      }

      let creator = null;

      if (options.withCreatedBy) {
        creator = _.pick(await CreatedBy?.exposeData(), ["id", "firstName", "lastName", "imageId"]);

        if (!CreatedBy && createdBy) {
          creator = await sequelize.models.User.findOne({
            where: {
              id: createdBy
            },
            attributes: ["id", "firstName", "lastName", "imageId"]
          });

          creator = _.pick(await creator.exposeData(), ["id", "firstName", "lastName", "imageId"]);
        }
      }

      data.creator = creator;

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog.belongsTo(models.User, { foreignKey: 'createdBy', as: 'CreatedBy' });

      Blog.addScope('withCreatedBy', {
        include: [
          { model: sequelize.models.User, as: 'CreatedBy' }
        ]
      });
    }
  };

  Blog.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    files: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Blog',
  });

  return Blog;
};