import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'
import moment from 'moment';

export const bookValidator = validator(Joi.object({
  slotId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "user_slots", fieldName: "id", path: "id" })),
  note: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
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