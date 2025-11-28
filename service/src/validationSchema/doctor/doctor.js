import { ROLES } from '@/config';
import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'firstName' }),
  role: Joi
    .string()
    .valid(...Object.values(ROLES.DOCTOR))
    .optional()
    .empty(["", null])
    .default(null),
}));

export const detailsValidator = validator(Joi.object({
  id: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "users", fieldName: "id", path: "id" })),
}));