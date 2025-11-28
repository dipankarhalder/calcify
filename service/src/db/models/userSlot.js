'use strict';
import Sequelize, { Model } from "sequelize";
import moment from 'moment';

const userSlotTypes = {
  DOCTOR_AVAILABLITY: "DOCTOR_AVAILABLITY",
  PATIENT_APPOINTMENT: "PATIENT_APPOINTMENT",
};

let exposeDataOptionsDefault = { withSlot: false };

module.exports = (sequelize, DataTypes) => {
  class UserSlot extends Model {

    static getTypes() {
      return userSlotTypes;
    }

    static async saveDoctorAvailablity(userId, slotId, note = null) {
      let userSlot = await this.build({
        userId,
        slotId,
        note,
        type: userSlotTypes.DOCTOR_AVAILABLITY,
      });

      await userSlot.save();
      return userSlot;
    };

    static async bookPatientAppointment(userId, slotId, note = null) {
      let doctorSlot = await sequelize.models.UserSlot.findByPk(slotId);

      let userSlot = await sequelize.models.UserSlot.build({
        parentId: slotId,
        userId,
        slotId: doctorSlot.slotId,
        note,
        type: userSlotTypes.PATIENT_APPOINTMENT
      });

      await userSlot.save();

      return userSlot;
    };

    static async checkPatientAppointmentExists(doctorSlotId) {
      let haveAppointment = await this.count({
        where: {
          parentId: doctorSlotId,
          type: userSlotTypes.PATIENT_APPOINTMENT
        }
      });

      return Boolean(haveAppointment);
    }

    async exposeData(options = exposeDataOptionsDefault) {
      options = Object.assign({}, exposeDataOptionsDefault, options);

      let { id, parentId, note, slotId, Slot, type } = this;

      let data = {
        id,
        note,
        slotId,
        patientId: this.getDataValue("haveBooking"),
      }

      if (type == userSlotTypes.PATIENT_APPOINTMENT) {
        data = {
          id,
          // parentId,
          note,
        };

        options.withSlot = true;
      }

      let slot = null;

      if (options.withSlot) {
        slot = await Slot?.exposeData();

        if (!Slot && slotId) {
          slot = await sequelize.models.Slot.findByPk(slotId);

          slot = await slot.exposeData();
        }
      }

      data.slot = slot;

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSlot.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      UserSlot.belongsTo(models.Slot, { foreignKey: 'slotId', as: 'Slot' });
      UserSlot.belongsTo(models.UserSlot, { foreignKey: 'parentId', as: 'Parent' });

      UserSlot.addScope('withSlot', {
        include: [
          { model: sequelize.models.Slot, as: 'Slot' }
        ]
      });
    }
  };

  UserSlot.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    slotId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserSlot',
  });

  return UserSlot;
};