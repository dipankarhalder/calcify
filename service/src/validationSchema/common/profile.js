import { ROLES } from '@/config';
import { Joi, validator } from '@/validationSchema/commonImports'

let doctorRolesExceptPanel = Object.values(ROLES.DOCTOR).filter(o => o != ROLES.DOCTOR.PANEL);

const doctorSchema = Joi.object().keys({
  // type: Joi.string().valid("DOCTOR").required(),
  firstName: Joi
    .string()
    .required(),
  lastName: Joi
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
      otherwise: Joi.forbidden()
    }),
});

const patientSchema = Joi.object().keys({
  // type: Joi.string().valid("PATIENT").required(),
  firstName: Joi
    .string()
    .required(),
  lastName: Joi
    .string()
    .required(),
  phone: Joi
    .string()
    .phoneNumber({ defaultCountry: 'IN', format: 'e164', strict: true })
    .required(),
});

export const updateProfile = validator(Joi.object({
  type: Joi.string().valid("PATIENT", "DOCTOR").required(),
  details: Joi.when(Joi.ref('type'), {
    // is: "PATIENT",
    // then: patientSchema,
    // otherwise: doctorSchema,
    switch: [
      { is: 'DOCTOR', then: doctorSchema },
      { is: 'PATIENT', then: patientSchema }
    ]
  }).required()
}))
