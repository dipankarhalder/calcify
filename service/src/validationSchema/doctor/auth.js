import { ROLES } from '@/config';
import { Joi, validator, paginateFields } from '@/validationSchema/commonImports'

export const loginValidator = validator(Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
}));

let doctorRolesExceptPanel = Object.values(ROLES.DOCTOR).filter(o => o != ROLES.DOCTOR.PANEL);

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
  phone: Joi
    .string()
    .phoneNumber({ defaultCountry: 'IN', format: 'e164', strict: true })
    .required(),
  occupation: Joi
    .string()
    .valid(...doctorRolesExceptPanel)
    .optional()
    .empty(["", null])
    .default(null),
  occupationOther: Joi
    .any()
    .when('occupation', {
      is: ROLES.DOCTOR.NORMAL,
      then: Joi.string().required(),
      otherwise: Joi.optional().empty(["", null]).default(null)
    }),
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
