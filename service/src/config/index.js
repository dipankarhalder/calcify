import database from "./database";
import imageBasePath from "./imageBasePath";

const ROLES = {
  ADMIN: "ADMIN",
  DOCTOR: {
    NORMAL: "DOCTOR_NORMAL",
    PANEL: "DOCTOR_PANEL",
    DIETICIAN: "DOCTOR_DIETICIAN",
    THERAPIST: "DOCTOR_THERAPIST",
  },
  PATIENT: "PATIENT"
};

const DAYS = {
  SUNDAY: "SUNDAY",
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
};

export {
  database,
  imageBasePath,
  ROLES,
  DAYS,
};