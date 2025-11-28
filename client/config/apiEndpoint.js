// Authentication
export const loginServices = "/auth/login";
export const checkEmailOrSendOtp = "/auth/checkAndSendOtp";
export const forgotPassOne = "/auth/forgetPasswordStep1";
export const forgotPassTwo = "/auth/forgetPasswordStep2";

// Common
export const uploadFileItem = "/misc/file";

// Admin
export const registrationAdmin = "/admin/auth/registration";

// Doctor
export const registrationDoctor = "/doctor/auth/registration";
export const doctorList = "/doctor/list";
export const doctorDetailsItem = "/doctor/details";
export const availAddItem = "/doctor/availability/add";
export const availGetItem = "/doctor/availability/list";
export const availRemItem = "/doctor/availability/delete";

// Patient
export const patientUpdate = "/profile/update";
export const patientInfo = "/profile/get";
export const dashboardPatient = "/patient/dashboard";
export const registrationPatient = "/patient/auth/registration";
export const patientListData = "/patient/list";
export const patientDetails = "/patient/details";
export const getAllDashData = "/patient/selfAssessment/getData";
export const createFraxScore = "/patient/selfAssessment/fraxScore";
export const createFallDetc = "/patient/selfAssessment/fallDetection";
export const createChartGrowth = "/patient/selfAssessment/growthChart";
export const createOstro = "/patient/selfAssessment/bloodTestOsteoporosis";
export const createVitaminD = "/patient/selfAssessment/bloodTestVitaminD";
export const slotBooking = "/patient/appointment/book";
export const slotsList = "/patient/appointment/list";
export const slotDelete = "/patient/appointment/delete";
export const dayWiseShowDiet = "/patient/dietListByDate";
export const dayWiseShowExcer = "/patient/exerciseListByDate";

// Resources
export const addCategory = "/resources/category/add";
export const listCategory = "/resources/category/list";
export const addRegion = "/resources/region/add";
export const listRegion = "/resources/region/list";
export const addDietType = "/resources/DietType/add";
export const listDietType = "/resources/DietType/list";
export const createFoodItem = "/resources/foodItem/add";
export const foodListItems = "/resources/foodItem/list";
export const createExcerItem = "/resources/exercise/add";
export const listExcerItems = "/resources/exercise/list";
export const addExcTemplate = "/resources/exerciseTemplate/add";
export const listExcTemplate = "/resources/exerciseTemplate/list";
export const deleteExcTemplate = "/resources/exerciseTemplate/delete";
export const editExcTemplate = "/resources/exerciseTemplate/updateDayWise";
export const checkExistExcer =
  "/resources/exerciseTemplate/checkExerciseExistOfPatient";
export const assignExcerTemplate =
  "/resources/exerciseTemplate/assignExerciseTemplateToPatient";
export const addBlog = "/resources/blog/add";
export const listBlog = "/resources/blog/list";
export const dietAddTemplate = "/resources/dietTemplate/add";
export const dietListTemplate = "/resources/dietTemplate/list";
export const dietEditTemplate = "/resources/dietTemplate/updateDayWise";
export const dietDeleteTemplate = "/resources/dietTemplate/delete";
export const checkExistDiet = "/resources/dietTemplate/checkDietExistOfPatient";
export const assignDietTemplate =
  "/resources/dietTemplate/assignDietTemplateToPatient";
