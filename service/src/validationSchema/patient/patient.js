import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'firstName' }),
}));

export const detailsValidator = validator(Joi.object({
  id: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "users", fieldName: "id", path: "id" })),
}));

export const dietListByDateValidator = validator(Joi.object({
  id: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "users", fieldName: "id", path: "id" })),
  date: Joi
    .date()
    .format('YYYY-MM-DD')
    .required(),
}));

export const exerciseListByDateValidator = validator(Joi.object({
  id: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "users", fieldName: "id", path: "id" })),
  date: Joi
    .date()
    .format('YYYY-MM-DD')
    .required(),
}));