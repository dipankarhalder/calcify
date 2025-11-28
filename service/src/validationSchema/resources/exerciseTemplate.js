import { DAYS } from '@/config';
import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'
import moment from 'moment';

export const addValidator = validator(Joi.object({
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
      specialInstruction: Joi
        .string()
        .optional()
        .empty(["", null])
        .default(null),
      items: Joi
        .array()
        .items(Joi.object({
          categoryId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "categories", fieldName: "id", path: "categoryId" })),
          exerciseId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "exercises", fieldName: "id", path: "exerciseId" })),
          time: Joi
            .string()
            .required(),
          duration: Joi
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
    .external(dbExistsExternal({ tablename: "exercise_templates", fieldName: "id", path: "id" })),
}));

export const detailsValidator = validator(Joi.object({
  id: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "exercise_templates", fieldName: "id", path: "id" })),
}));

export const updateDayWiseValidator = validator(Joi.object({
  dayId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "exercise_template_days", fieldName: "id", path: "dayId" })),
  day: Joi
    .string()
    .required()
    .valid(...Object.values(DAYS)),
  specialInstruction: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  items: Joi
    .array()
    .items(Joi.object({
      categoryId: uuidField({ required: true })
        .external(dbExistsExternal({ tablename: "categories", fieldName: "id", path: "categoryId" })),
      exerciseId: uuidField({ required: true })
        .external(dbExistsExternal({ tablename: "exercises", fieldName: "id", path: "exerciseId" })),
      time: Joi
        .string()
        .required(),
      duration: Joi
        .number()
        .integer()
        .positive()
        .required(),
    })).min(1).required()
}));

export const checkExerciseExistOfPatientValidator = validator(Joi.object({
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

export const assignExerciseTemplateToPatientValidator = validator(Joi.object({
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
      specialInstruction: Joi
        .string()
        .optional()
        .empty(["", null])
        .default(null),
      items: Joi
        .array()
        .items(Joi.object({
          categoryId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "categories", fieldName: "id", path: "categoryId" })),
          exerciseId: uuidField({ required: true })
            .external(dbExistsExternal({ tablename: "exercises", fieldName: "id", path: "exerciseId" })),
          time: Joi
            .string()
            .required(),
          duration: Joi
            .number()
            .integer()
            .positive()
            .required(),
        })).optional().empty(["", null]).default([])
    })).unique("day").min(7).required()
}));