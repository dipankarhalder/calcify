import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'
import moment from 'moment';

export const addValidator = validator(Joi.object({
  times: Joi
    .array()
    .items(Joi.object({
      from: Joi
        .date()
        .iso()
        .required(),
      to: Joi
        .date()
        .iso()
        .min(Joi.ref('from', {
          "adjust": fromDate => {
            return moment(fromDate).add(30, "minutes");
          }
        })).message("{{#label}} must be greater or equal than atleast 30 minutes from {{:#limit}}")
        .required()
    })).min(1).required(),
}));

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'from' }),
  date: Joi
    .date()
    .format('YYYY-MM-DD')
    .optional()
    .empty(["", null])
    .default(null),
  id: uuidField({ required: false })
    .external(dbExistsExternal({ tablename: "users", fieldName: "id", path: "id" })),
}));

export const deleteValidator = validator(Joi.object({
  id: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "user_slots", fieldName: "id", path: "id" })),
}));