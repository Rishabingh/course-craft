import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';
import {
  createVideoController,
  deleteVideoController,
  getVideoOfSectionController,
  getVideoController,
} from '../controllers/video.controller.js';
import { videoZodSchema } from '../schemas/vidoe.schema.js';

const router = Router();

router.route('/').get(getVideoOfSectionController); // only sending metadata not link
router.route('/:videoId').get(getVideoController); // signed url return todo: add middleware for verify purchase
router
  .route('/')
  .post(verifyJWTmiddleware, verifyAdmin, validate(videoZodSchema), createVideoController);

router.route('/:videoId').delete(verifyJWTmiddleware, verifyAdmin, deleteVideoController);

export default router;
