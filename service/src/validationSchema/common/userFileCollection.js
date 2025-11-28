import { dbExistsExternal, Joi, paginateFields, uuidField, validator } from '@/validationSchema/commonImports'

export const addValidator = validator(Joi.object({
  userId: uuidField({ required: true })
    .external(dbExistsExternal({ tablename: "users", fieldName: "id", path: "userId" })),
  files: Joi
    .array()
    .items(uuidField({ required: true })
      .external(dbExistsExternal({ tablename: "files", fieldName: "id", path: "fileId" }))).unique().min(1).required(),
}));

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'createdAt', orderDir: "DESC" }),
}));