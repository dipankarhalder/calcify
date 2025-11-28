'use strict';
import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
import moment from "moment";
import { ROLES } from "../../config";
import { deleteS3Objects, randomString } from "../../utils";


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    validatePassword(plainPassword) {
      return bcrypt.compareSync(plainPassword, this.password);
    }

    static hashPassword(plainPassword) {
      return bcrypt.hashSync(plainPassword, 10);
    }

    static async generateReferCode(prefix = '', noOFcharacter = 9) {
      let doNotHaveDiplicateReferCode = false;
      let referCode = null;

      do {
        referCode = prefix + randomString(noOFcharacter, "ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789");

        let dupReferCode = await sequelize.models.User.count({
          where: {
            referCode
          }
        });

        if (!dupReferCode) {
          doNotHaveDiplicateReferCode = true
        }

      } while (!doNotHaveDiplicateReferCode);

      return referCode;
    };

    static async allowPostMediaToday(userId) {
      let userQuery = sequelize.models.User.findOne({
        where: {
          id: userId,
        },
        include: [
          { model: sequelize.models.Plan, as: 'plan' }
        ]
      });

      let todayMediaPostedCountQuery = sequelize.models.Media.count({
        where: {
          userId,
          createdAt: {
            [Sequelize.Op.gte]: moment().startOf("day").valueOf(),
            [Sequelize.Op.lte]: moment().endOf("day").valueOf(),
          }
        }
      })

      let [
        user,
        todayMediaPostedCount,
      ] = await Promise.all([
        userQuery,
        todayMediaPostedCountQuery
      ]);

      let allow = user.plan.mediaPerDay > todayMediaPostedCount;

      return {
        allow,
        remaining: allow ? user.plan.mediaPerDay - todayMediaPostedCount : 0,
      }
    }

    static checkEmailExists = async (email) => {
      let userCount = await sequelize.models.User.count({
        where: {
          email,
        }
      });

      return Boolean(userCount);
    }

    async exposeData(options = {}) {
      // options = Object.assign({}, { withPlan: false }, options);

      let {
        role, id, firstName, lastName, email, phone = "", occupation = "", imageId,
        gender, age, weight, height, address, medicalCondition, medicalConditionOthers,
        presentMedication, presentMedicationOthers, presentComplaints, presentComplaintsOthers,
        specificGoals, specificGoalsOthers,
      } = this;

      medicalCondition = (medicalCondition || "").length ? (medicalCondition || "").split('##') : [];
      presentMedication = (presentMedication || "").length ? (presentMedication || "").split('##') : [];
      specificGoals = (specificGoals || "").length ? (specificGoals || "").split('##') : [];

      let data = {
        role,
        id,
        firstName,
        lastName,
        email,
        phone,
        occupation,
        imageId,
      };

      if (role == ROLES.PATIENT) {
        data = {
          ...data,
          gender,
          age,
          weight,
          height,
          address,
          medicalCondition,
          medicalConditionOthers,
          presentMedication,
          presentMedicationOthers,
          presentComplaints,
          presentComplaintsOthers,
          specificGoals,
          specificGoalsOthers,

        }
      }

      // if (options.withPlan) {
      //   let plan = await sequelize.models.Plan.findByPk(planId);

      //   data.plan = plan.exposeData();
      //   data.plan.isCurrent = true;
      // }

      return data;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.File, { foreignKey: 'imageId', as: 'Image' });
      User.hasMany(models.UserFile, { foreignKey: 'userId', as: 'UserFiles' });
      // models.User.belongsTo(models.User, { targetKey: 'referCode', foreignKey: 'referCodeBy', as: 'referBy' });
      // models.User.belongsTo(models.Plan, { foreignKey: 'planId', as: 'plan' });
      // models.User.hasMany(models.User, { sourceKey: 'referCode', foreignKey: 'referCodeBy', as: 'refer' })
      // models.User.hasMany(models.DeviceToken, { foreignKey: 'userId', as: 'deviceToken' })
    }
  };

  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occupationOther: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    height: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicalCondition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicalConditionOthers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    presentMedication: { // file
      type: DataTypes.STRING,
      allowNull: true,
    },
    presentMedicationOthers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    presentComplaints: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    presentComplaintsOthers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specificGoals: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specificGoalsOthers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ROLES.PATIENT
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      afterSave: async (user, options) => {
        let filesToDelete = []

        if (user.changed("image")) {
          let prevImage = user.previous("image")
          // prevImage && filesToDelete.push(imageBasePath.paths.profileImage + prevImage)
          prevImage && filesToDelete.push(prevImage)
        }

        // filesToDelete.length && await deleteFiles(filesToDelete)
        filesToDelete.length && await deleteS3Objects(filesToDelete)
      }
    },
    indexes: [
      // Create a unique index on email
      {
        // unique: true,
        fields: ['email']
      },
      // {
      //   // unique: true,
      //   fields: ['refer_code']
      // },
    ]
  });

  return User;
};