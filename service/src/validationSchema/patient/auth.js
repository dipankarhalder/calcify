import { Joi, validator, paginateFields, uuidField, dbExistsExternal } from '@/validationSchema/commonImports'

export const loginValidator = validator(Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
}));

export const checkAndSendOtp = validator(Joi.object({
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
  phone: Joi
    .string()
    .phoneNumber({ defaultCountry: 'IN', format: 'e164', strict: true })
    .required(),
  occupation: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  otp: Joi
    .string()
    .required(),
  gender: Joi
    .string()
    .required(),
  age: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  weight: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  height: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  address: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  medicalCondition: Joi
    .array()
    .items(Joi.string())
    .optional()
    .empty(["", null])
    .default([]),
  medicalConditionOthers: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  presentMedication: Joi
    .array()
    .items(Joi.string())
    .optional()
    .empty(["", null])
    .default([]),
  presentMedicationOthers: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  presentComplaints: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  presentComplaintsOthers: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  specificGoals: Joi
    .array()
    .items(Joi.string())
    .optional()
    .empty(["", null])
    .default([]),
  specificGoalsOthers: Joi
    .string()
    .optional()
    .empty(["", null])
    .default(null),
  files: Joi
    .array()
    .items(uuidField({ required: true })
      .external(dbExistsExternal({ tablename: "files", fieldName: "id", path: "fileId" })))
    .unique()
    .optional()
    .empty(["", null])
    .default(null),
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
