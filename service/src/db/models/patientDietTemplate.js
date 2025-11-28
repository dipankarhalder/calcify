'use strict';
import Sequelize, { Model } from "sequelize";

let exposeDataOptionsDefault = { withRegion: false, withDaysItems: false };

module.exports = (sequelize, DataTypes) => {

  class PatientDietTemplate extends Model {

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let {
        id, name, isPublic,
        regionId,
        Region, Days
      } = this;

      let data = {
        id,
        name,
        isPublic,
        regionId,
      }

      let region = null;

      if (options.withRegion) {
        region = await Region?.exposeData();

        if (!Region && regionId) {
          region = await sequelize.models.Region.findByPk(regionId);

          region = region.exposeData();
        }
      }

      data.region = region;

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
      PatientDietTemplate.belongsTo(models.User, { foreignKey: 'patientId', as: 'Patient' });
      PatientDietTemplate.belongsTo(models.Region, { foreignKey: 'regionId', as: 'Region' });
      PatientDietTemplate.hasMany(models.PatientDietTemplateDay, { foreignKey: 'dietTemplateId', as: 'Days' });
      PatientDietTemplate.belongsTo(models.User, { foreignKey: 'doctorId', as: 'Doctor' });

      PatientDietTemplate.addScope('withRegion', {
        include: [
          { model: sequelize.models.Region, as: 'Region' }
        ]
      });

      PatientDietTemplate.addScope('withDaysItems', {
        include: [{
          model: sequelize.models.PatientDietTemplateDay,
          as: 'Days',
          include: [{
            model: sequelize.models.PatientDietTemplateDayItem,
            as: 'Items',
            include: [{
              model: sequelize.models.Category,
              as: 'Category'
            }, {
              model: sequelize.models.DietType,
              as: 'DietType'
            }, {
              model: sequelize.models.FoodItem,
              as: 'FoodItem'
            }]
          }]
        }]
      });
    }
  };

  PatientDietTemplate.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    doctorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    regionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'PatientDietTemplate',
  });

  return PatientDietTemplate;
};