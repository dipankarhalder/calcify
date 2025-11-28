import express from 'express'
import auth from "./auth";
import patient from "./patient";
import appointment from "./appointment";
import selfAssessment from "./selfAssessment";

import { checkAppVersionAndMandatoryUpdate, serviceUnderMaintenance } from '../../middlewares/index';

const router = express.Router();

// router.use(serviceUnderMaintenance);
// router.use(checkAppVersionAndMandatoryUpdate)

router.use('/auth', auth);
router.use('/appointment', appointment);
router.use('/selfAssessment', selfAssessment);
router.use('/', patient);

export default router;
