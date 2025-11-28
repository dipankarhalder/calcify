import _ from "lodash";
import cron from "node-cron";
import { sequelize, Sequelize } from "./db/models";

cron.schedule("*/30 * * * *", function () {
  let data = `${new Date().toUTCString()} : Server is working\n`;

  console.log(data);

  // checkPendingReferEarn();
});

let checkPendingReferEarn = async () => {

  await sequelize.transaction(async (transaction) => {

    let settingReferEarnAmountRec = await sequelize.models.Setting.findOne({
      where: {
        key: "app_refer_earn_amount"
      }
    }, { transaction });

    let settingReferEarnAmount = parseInt(settingReferEarnAmountRec.value)

    let referEarns = await sequelize.models.ReferEarn.findAll({
      where: {
        status: "PENDING"
      },
      include: [
        {
          model: sequelize.models.User,
          as: 'user',
          where: { registrationComplete: 1 },
          required: true,
          include: [
            { model: sequelize.models.Plan, as: 'plan', where: { level: { [Sequelize.Op.gte]: 1 } } }
          ]
        },
        {
          model: sequelize.models.User,
          as: 'referUser',
          where: { registrationComplete: 1 },
          required: true,
          include: [
            { model: sequelize.models.Plan, as: 'plan', where: { level: { [Sequelize.Op.gte]: 1 } } }
          ]
        },
      ],
      transaction
    });

    // console.log("referEarns", JSON.stringify(referEarns, null, 2));

    await Promise.all((referEarns || []).map(async (referEarn) => {

      // console.log("referEarn", JSON.stringify(referEarn, null, 2));

      await addToTransaction(referEarn.userId, transaction, settingReferEarnAmount, referEarn.id);

      referEarn.status = "SUCCESS"

      await referEarn.save({ transaction })
    }))

  });
};

let addToTransaction = async (userId, transaction, referEarnAmoumt, referEarnId) => {
  let trans = sequelize.models.Transaction.build({
    userId,
    description: "Refer and Earn",
    mode: "CREDIT",
    type: "REFER_EARN",
    amount: referEarnAmoumt,
    referEarnId,
    status: "SUCCESS"
  })

  await trans.save({ transaction });

  await sequelize.models.User.increment({ amount: referEarnAmoumt }, {
    by: 1,
    where: {
      id: userId
    },
    transaction,
  });

  await addToNotification(userId, transaction, referEarnAmoumt);
};

let addToNotification = async (userId, transaction, referEarnAmoumt) => {
  return await sequelize.models.Notification.addNotification({
    userId,
    title: "Refer and Earn",
    description: `Rs.${referEarnAmoumt} credited to your wallet`,
    type: "REFER_EARN",
    transaction
  });
};