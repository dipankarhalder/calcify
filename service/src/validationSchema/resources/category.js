import { sequelize } from '@/db/models';
import { Joi, validator, paginateFields } from '@/validationSchema/commonImports'

export const addValidator = validator(Joi.object({
  name: Joi
    .string()
    .required(),
  type: Joi
    .valid(...Object.keys(sequelize.models.Category.getTypes()))
    .required(),
}));

export const listValidator = validator(Joi.object({
  ...paginateFields({ orderBy: 'name' }),
  type: Joi
    .valid(...Object.keys(sequelize.models.Category.getTypes()))
    .required(),
}));