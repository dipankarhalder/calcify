'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withDaysItems: false };

module.exports = (sequelize, DataTypes) => {

  class ExerciseTemplate extends Model {

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, name, isPublic,
        Days
      } = this;

      let data = {
        id,
        name,
        isPublic,
      }

      let days = null;

      if (options.withDaysItems) {
        days = await Promise.all((Days || [])
          .map(async d => await d?.exposeData({ withItems: true })));

        if (!Days) {
          // days = await sequelize.models.Region.findByPk(regionId);

          // days = days.exposeData();
        }
      }

      data.days = days;

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExerciseTemplate.hasMany(models.ExerciseTemplateDay, { foreignKey: 'exerciseTemplateId', as: 'Days' });
      ExerciseTemplate.belongsTo(models.User, { foreignKey: 'createdBy', as: 'CreatedBy' });

      ExerciseTemplate.addScope('withRegion', {
        include: [
          { model: sequelize.models.Region, as: 'Region' }
        ]
      });

      ExerciseTemplate.addScope('withDaysItems', {
        include: [{
          model: sequelize.models.ExerciseTemplateDay,
          as: 'Days',
          include: [{
            model: sequelize.models.ExerciseTemplateDayItem,
            as: 'Items',
            include: [{
              model: sequelize.models.Category,
              as: 'Category'
            }, {
              model: sequelize.models.Exercise,
              as: 'Exercise'
            }]
          }]
        }]
      });
    }
  };

  ExerciseTemplate.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ExerciseTemplate',
  });

  return ExerciseTemplate;
};