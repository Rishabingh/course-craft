import { Router } from 'express';
import {
  createCourseController,
  getCourseController,
  getAllCourseController,
  deleteCourseController,
  getAdminCourseController,
} from '../controllers/course.controller.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { CourseZodSchema } from '../schemas/course.schema.js';
import { multerImageUpload } from '../middlewares/multerImage.middleware.js';

const router = Router();

router.route('/').get(getAllCourseController);
router.route('/admin').get(verifyJWTmiddleware, verifyAdmin, getAdminCourseController);
router.route('/:id').get(getCourseController);
router
  .route('/')
  .post(
    verifyJWTmiddleware,
    verifyAdmin,
    multerImageUpload,
    validate(CourseZodSchema),
    createCourseController,
  );
router.route('/:courseId').delete(verifyJWTmiddleware, verifyAdmin, deleteCourseController);

export default router;
