import { sequelize } from '@/db/models';
import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'firstName' }),
}));

export const addFraxScoreValidator = validator(Joi.object({
  testFor: Joi
    .string()
    .valid("SELF", "OTHER")
    .required(),
  relationShip: Joi
    .any()
    .when('testFor', {
      is: "OTHER",
      then: Joi.string().required(),
      otherwise: Joi.optional().empty(["", null]).default(null)
    }),
  relationShipName: Joi
    .any()
    .when('testFor', {
      is: "OTHER",
      then: Joi.string().required(),
      otherwise: Joi.optional().empty(["", null]).default(null)
    }),
  age: Joi
    .number()
    .positive()
    .min(40)
    .max(90)
    .required(),
  bmd: Joi
    .number()
    .positive()
    .optional()
    .empty(["", null])
    .default(null),
  weight: Joi
    .number()
    .positive()
    .min(25)
    .max(125)
    .required(),
  height: Joi
    .number()
    .positive()
    .min(100)
    .max(220)
    .required(),
  sex: Joi
    .string()
    .valid("M", "F")
    .required(),
  previousFracture: Joi
    .boolean()
    .required(),
  parentFracturedHip: Joi
    .boolean()
    .required(),
  currentSmoking: Joi
    .boolean()
    .required(),
  glucocorticoids: Joi
    .boolean()
    .required(),
  rheumatoidArthritis: Joi
    .boolean()
    .required(),
  secondaryOsteoporosis: Joi
    .boolean()
    .required(),
  alcohol3OrMore: Joi
    .boolean()
    .required(),
}));

export const addGrowthChartValidator = validator(Joi.object({
  age: Joi
    .number()
    .positive()
    .min(40)
    .max(90)
    .required(),
  weight: Joi
    .number()
    .positive()
    .required(),
  height: Joi
    .number()
    .positive()
    .required(),
  bmi: Joi
    .number()
    .positive()
    .required(),
}));

export const addVitaminDValidator = validator(Joi.object({
  age: Joi
    .number()
    .positive()
    .min(40)
    .max(90)
    .required(),
  sex: Joi
    .string()
    .valid("M", "F")
    .required(),
  weight: Joi
    .number()
    .positive()
    .required(),
  height: Joi
    .number()
    .positive()
    .required(),
  bloodTest: Joi
    .string()
    .required(),
  dob: Joi
    .date()
    .format('YYYY-MM-DD')
    .required(),
}));

export const addFallDetectionValidator = validator(Joi.object({
  age: Joi
    .number()
    .positive()
    .min(40)
    .max(90)
    .required(),
  sex: Joi
    .string()
    .valid("M", "F")
    .required(),
  diagnosis: Joi
    .number()
    .positive()
    .required(),
  sitToStand: Joi
    .number()
    .positive()
    .required(),
  standingUnsupported: Joi
    .number()
    .positive()
    .required(),
  sittingUnsupported: Joi
    .number()
    .positive()
    .required(),
  standingToSitting: Joi
    .number()
    .positive()
    .required(),
  transfers: Joi
    .number()
    .positive()
    .required(),
  standingEyesClosed: Joi
    .number()
    .positive()
    .required(),
  standingFeet: Joi
    .number()
    .positive()
    .required(),
  reachingOutstretched: Joi
    .number()
    .positive()
    .required(),
  retrievingGround: Joi
    .number()
    .positive()
    .required(),
  turningBehind: Joi
    .number()
    .positive()
    .required(),
  turningDegrees: Joi
    .number()
    .positive()
    .required(),
  placingFootStool: Joi
    .number()
    .positive()
    .required(),
  standingFootFront: Joi
    .number()
    .positive()
    .required(),
  standingOneFoot: Joi
    .number()
    .positive()
    .required(),
  total: Joi
    .number()
    .positive()
    .required(),
}));

export const getDataValidator = validator(Joi.object({
  type: Joi
    .string()
    .valid(...Object.values(sequelize.models.SelfAssessment.getTypes()))
    .required(),
  date: Joi
    .date()
    .format('YYYY-MM-DD')
    .optional()
    .empty(["", null])
    .default(null),
}));
