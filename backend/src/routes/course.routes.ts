import { Router } from 'express';
import {
  createCourseController,
  getCourseController,
  getAllCourseController,
  deleteCourseController,
} from '../controllers/course.controller.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { CourseZodSchema } from '../schemas/course.schema.js';

const router = Router();

router.route('/').get(getAllCourseController);
router.route('/:id').get(getCourseController);
router
  .route('/')
  .post(verifyJWTmiddleware, verifyAdmin, validate(CourseZodSchema), createCourseController);
router.route('/:courseId').delete(verifyJWTmiddleware, verifyAdmin, deleteCourseController);

export default router;
