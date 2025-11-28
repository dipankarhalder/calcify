import express from 'express'
import auth from "./auth";
import { checkAppVersionAndMandatoryUpdate, serviceUnderMaintenance } from '../../middlewares/index';

const router = express.Router();

// router.use(serviceUnderMaintenance);
// router.use(checkAppVersionAndMandatoryUpdate)

router.use(auth);

export default router;
