import { Joi, validator, paginateFields } from '@/validationSchema/commonImports'

export const addValidator = validator(Joi.object({
  name: Joi
    .string()
    .required(),
}));

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'name' }),
}));