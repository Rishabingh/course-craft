import { Router } from 'express';
import {
  createSectionController,
  deleteSectionController,
  getSectionOfCourseController,
  getSectionController,
} from '../controllers/section.controller.js';
import { courseSectionZodSchema } from '../schemas/section.schema.js';
import { validate } from '../middlewares/validate.middleware.js';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';

const router = Router();

router.route('/').get(getSectionOfCourseController);
router.route('/:sectionId').get(getSectionController);
router
  .route('/')
  .post(
    verifyJWTmiddleware,
    verifyAdmin,
    validate(courseSectionZodSchema),
    createSectionController,
  );
router.route('/').delete(verifyJWTmiddleware, verifyAdmin, deleteSectionController);

export default router;
