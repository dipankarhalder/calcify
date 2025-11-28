import { sequelize } from '@/db/models';
import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'

export const addValidator = validator(Joi.object({
  title: Joi
    .string()
    .required(),
  content: Joi
    .string()
    .required(),
  files: Joi
    .array()
    .items(
      uuidField({ required: false })
        .external(dbExistsExternal({ tablename: "files", fieldName: "id", path: "files" }))
    )
    .unique()
    .optional()
    .empty(["", null])
    .default([]),
  type: Joi
    .valid(...Object.values(sequelize.models.Blog.getTypes()))
    .required(),
}));

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'published_at' }),
  type: Joi
    .valid(...Object.keys(sequelize.models.Blog.getTypes()))
    .required(),
}));