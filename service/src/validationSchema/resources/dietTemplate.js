import { DAYS } from '@/config';
import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'
import moment from 'moment';

export const addValidator = validator(Joi.object({
  regionId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "regions", fieldName: "id", path: "regionId" })),
  name: Joi
    .string()
    .required(),
  isPublic: Joi
    .boolean()
    .required(),
  days: Joi
    .array()
    .items(Joi.object({
      day: Joi
        .string()
        .required()
        .valid(...Object.values(DAYS)),
      totalCalories: Joi
        .number()
        .optional()
        .empty(["", null])
        .default(0)
        .when('items', { is: Joi.array().min(1), then: Joi.required() })
      // .positive()
      // .required()
      ,
      totalCalcium: Joi
        .number()
        .optional()
        .empty(["", null])
        .default(0)
        .when('items', { is: Joi.array().min(1), then: Joi.required() })
      // .positive()
      // .required()
      ,
      specialInstruction: Joi
        .string()
        .optional()
        .empty(["", null])
        .default(null),
      items: Joi
        .array()
        .items(Joi.object({
          dietTypeId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "diet_types", fieldName: "id", path: "dietTypeId" })),
          dietConsumption: Joi
            .string()
            .required(),
          categoryId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "categories", fieldName: "id", path: "categoryId" })),
          foodItemId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "food_items", fieldName: "id", path: "foodItemId" })),
          quantity: Joi
            .number()
            .integer()
            .positive()
            .required(),
        })).optional().empty(["", null]).default([])
    })).unique("day").min(7).required()
}));

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'name' }),
}));

export const deleteValidator = validator(Joi.object({
  id: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "diet_templates", fieldName: "id", path: "id" })),
}));

export const detailsValidator = validator(Joi.object({
  id: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "diet_templates", fieldName: "id", path: "id" })),
}));

export const updateDayWiseValidator = validator(Joi.object({
  dayId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "diet_template_days", fieldName: "id", path: "dayId" })),
  day: Joi
    .string()
    .required()
    .valid(...Object.values(DAYS)),
  totalCalories: Joi
    .number()
    .positive()
    .required(),
  totalCalcium: Joi
    .number()
    .positive()
    .required(),
  specialInstruction: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  items: Joi
    .array()
    .items(Joi.object({
      dietTypeId: uuidField({ required: true })
        .external(dbExistsExternal({ tablename: "diet_types", fieldName: "id", path: "dietTypeId" })),
      dietConsumption: Joi
        .string()
        .required(),
      categoryId: uuidField({ required: true })
        .external(dbExistsExternal({ tablename: "categories", fieldName: "id", path: "categoryId" })),
      foodItemId: uuidField({ required: true })
        .external(dbExistsExternal({ tablename: "food_items", fieldName: "id", path: "foodItemId" })),
      quantity: Joi
        .number()
        .integer()
        .positive()
        .required(),
    })).min(1).required()
}));

export const checkDietExistOfPatientValidator = validator(Joi.object({
  patientId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "users", fieldName: "id", path: "patientId" })),
  startDate: Joi
    .date()
    .format('YYYY-MM-DD')
    .required(),
  endDate: Joi
    .date()
    .min(Joi.ref('startDate'))
    .format('YYYY-MM-DD')
    .required()
}));

export const assignDietTemplateToPatientValidator = validator(Joi.object({
  saveCloneToResource: Joi
    .boolean()
    .required(),
  patientId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "users", fieldName: "id", path: "patientId" })),
  startDate: Joi
    .date()
    .greater(moment().subtract(1, 'days').format('YYYY-MM-DD')).message(`{{#label}} must be greater than or equal to ${moment().format('YYYY-MM-DD')}`)
    .format('YYYY-MM-DD')
    .required(),
  endDate: Joi
    .date()
    .min(Joi.ref('startDate'))
    .format('YYYY-MM-DD')
    .required(),
  regionId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "regions", fieldName: "id", path: "regionId" })),
  name: Joi
    .string()
    .required(),
  isPublic: Joi
    .boolean()
    .required(),
  days: Joi
    .array()
    .items(Joi.object({
      day: Joi
        .string()
        .required()
        .valid(...Object.values(DAYS)),
      totalCalories: Joi
        .number()
        .optional()
        .empty(["", null])
        .default(0)
        .when('items', { is: Joi.array().min(1), then: Joi.required() })
      // .positive()
      // .required()
      ,
      totalCalcium: Joi
        .number()
        .optional()
        .empty(["", null])
        .default(0)
        .when('items', { is: Joi.array().min(1), then: Joi.required() })
      // .positive()
      // .required()
      ,
      specialInstruction: Joi
        .string()
        .optional()
        .empty(["", null])
        .default(null),
      items: Joi
        .array()
        .items(Joi.object({
          dietTypeId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "diet_types", fieldName: "id", path: "dietTypeId" })),
          dietConsumption: Joi
            .string()
            .required(),
          categoryId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "categories", fieldName: "id", path: "categoryId" })),
          foodItemId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "food_items", fieldName: "id", path: "foodItemId" })),
          quantity: Joi
            .number()
            .integer()
            .positive()
            .required(),
        })).optional().empty(["", null]).default([])
    })).unique("day").min(7).required()
}));