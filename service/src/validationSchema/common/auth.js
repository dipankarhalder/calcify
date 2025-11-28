import { Joi, validator } from '@/validationSchema/commonImports'

export const checkAndSendOtp = validator(Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
}));

export const loginValidator = validator(Joi.object({
  email: Joi
    .string()
    // .phoneNumber({ defaultCountry: 'IN', format: 'e164', strict: true })
    .required(),
  password: Joi
    .string()
    .required()
}));

export const forgetPasswordStep1 = validator(Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
}));

export const forgetPasswordStep2 = validator(Joi.object({
  otp: Joi
    .string()
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required(),
}));