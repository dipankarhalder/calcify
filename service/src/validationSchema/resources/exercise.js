import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'

export const addValidator = validator(Joi.object({
  categoryId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "categories", fieldName: "id", path: "categoryId" })),
  imageId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "files", fieldName: "id", path: "imageId" })),
  name: Joi
    .string()
    .required(),
  calories: Joi
    .number()
    .positive()
    .required(),
  duration: Joi
    .number()
    .positive()
    .required(),
  description: Joi
    .string()
    .required(),
  precaution: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  specialInstruction: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  isPublic: Joi
    .boolean()
    .required(),
}));

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'name' }),
}));