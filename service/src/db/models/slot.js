'use strict';
import Sequelize, { Model } from "sequelize";
import moment from 'moment';

module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {

    static async getSlot(from, to) {
      let [slot, created] = await this.findOrCreate({
        where: {
          from,
          to
        }
      });

      return slot;
    };

    exposeData() {
      let { id, from, to } = this;

      return {
        // id,
        from,
        to,
        label: moment(from).format("hh:mm A") + ' - ' + moment(to).format("hh:mm A")
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

  Slot.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    to: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Slot',
  });

  return Slot;
};