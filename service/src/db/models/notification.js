'use strict';
import Sequelize, { Model } from "sequelize";
import { sendFcmPushNotification } from "../../utils";

module.exports = (sequelize, DataTypes) => {

  class Notification extends Model {

    static async addNotification({ userId, title, description, type, transaction = null }) {
      let config = transaction ? { transaction } : {};

      let notification = sequelize.models.Notification.build({ userId, title, description, type });

      await notification.save(config);

      sequelize.models.Notification.sendNotificationToDevices(notification);

      return notification;
    };

    static async sendNotificationToDevices(notification = null) {
      try {

        let deviceTokens = await sequelize.models.DeviceToken.findAll({ where: { userId: notification.userId } })

        let registrationTokens = (deviceTokens || []).map(dt => dt.token)

        let fcmObject = notification.exposeData()

        let fcmResponse = await sendFcmPushNotification(JSON.parse(JSON.stringify(fcmObject)), registrationTokens)

        sequelize.models.Notification.deleteInvalidFcmToken(registrationTokens, fcmResponse);

        return fcmResponse;

      } catch (error) {
        console.log("error", error);
        return null;
      }
    }

    static async deleteInvalidFcmToken(registrationTokens, fcmResponse = null) {
      try {

        // console.log("registrationTokens", registrationTokens);
        // console.log("fcmResponse", fcmResponse);

        if (fcmResponse.failureCount) {

          let fcmTokenToDelete = [];

          fcmResponse.responses.map((obj, idx) => {
            if (!obj.success) {
              fcmTokenToDelete.push(registrationTokens[idx]);
            }
          });

          console.log("fcmTokenToDelete", fcmTokenToDelete);

          await sequelize.transaction(async (transaction) => {
            await sequelize.models.DeviceToken.destroy({
              where: {
                token: fcmTokenToDelete,
              },
              transaction
            });

            // throw new Error("testing");
          })
        }
      } catch (error) {
        console.log("deleteInvalidFcmToken error", error);
      }
    }

    exposeData() {
      let { id, title, description, type, createdAt } = this;

      return {
        id,
        title,
        description,
        type,
        createdAt
      }
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };

  Notification.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Notification',
  });

  return Notification;
};