import express from 'express'
import profile from "./profile";
import { checkAppVersionAndMandatoryUpdate, serviceUnderMaintenance } from '../../middlewares/index';

const router = express.Router();

// router.use(serviceUnderMaintenance);
// router.use(checkAppVersionAndMandatoryUpdate)

router.use(profile);

export default router;
