import { Joi, validator, paginateFields } from '@/validationSchema/commonImports'

export const loginValidator = validator(Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
}));

export const registrationValidator = validator(Joi.object({
  firstName: Joi
    .string()
    .required(),
  lastName: Joi
    .string()
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required(),
  otp: Joi
    .string()
    .required(),
}));


export const otpValidator = validator(Joi.object({
  id: Joi
    .string()
    .required(),
  otp: Joi
    .string()
    .required()
}));

export const resendOtpValidator = validator(Joi.object({
  id: Joi
    .string()
    .required(),
}));
