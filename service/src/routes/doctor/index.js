import express from 'express'
import auth from "./auth";
import availability from "./availability";
import doctor from "./doctor";
import { checkAppVersionAndMandatoryUpdate, serviceUnderMaintenance } from '../../middlewares/index';

const router = express.Router();

// router.use(serviceUnderMaintenance);
// router.use(checkAppVersionAndMandatoryUpdate)

router.use('/auth', auth);
router.use('/availability', availability);
router.use('/', doctor);

export default router;
