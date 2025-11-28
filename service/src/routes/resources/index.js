import express from 'express'
import category from "./category";
import region from "./region";
import dietType from "./dietType";
import foodItem from "./foodItem";
import dietTemplate from "./dietTemplate";
import exercise from "./exercise";
import exerciseTemplate from "./exerciseTemplate";
import blog from "./blog";

import { checkAppVersionAndMandatoryUpdate, serviceUnderMaintenance } from '../../middlewares/index';

const router = express.Router();

// router.use(serviceUnderMaintenance);
// router.use(checkAppVersionAndMandatoryUpdate)

router.use('/category', category);
router.use('/region', region);
router.use('/dietType', dietType);
router.use('/foodItem', foodItem);
router.use('/dietTemplate', dietTemplate);
router.use('/exercise', exercise);
router.use('/exerciseTemplate', exerciseTemplate);
router.use('/blog', blog);

export default router;
