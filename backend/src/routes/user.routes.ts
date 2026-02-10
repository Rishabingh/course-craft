import {
  meController,
  changeUsername,
  meCourseController,
} from '../controllers/user.contollers.js';
import { Router } from 'express';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { usernameZodSchema } from '../schemas/user.schemas.js';

const router = Router();

router.route('/me').get(verifyJWTmiddleware, meController);
router
  .route('/change-username')
  .post(verifyJWTmiddleware, validate(usernameZodSchema), changeUsername);
router.route('/me/courses').get(verifyJWTmiddleware, meCourseController);

export default router;
