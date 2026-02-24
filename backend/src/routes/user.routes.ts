import {
  meController,
  changeUsername,
  meCourseController,
  deleteUserController,
  getAllUsersController,
  searchUserController,
  blockUserController,
} from '../controllers/user.contollers.js';
import { Router } from 'express';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { usernameZodSchema } from '../schemas/user.schemas.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';

const router = Router();

router.route('/').get(verifyJWTmiddleware, verifyAdmin, getAllUsersController); // admin can get all users
router.route('/me').get(verifyJWTmiddleware, meController);
router.route('/:identifier').get(verifyJWTmiddleware, verifyAdmin, searchUserController); // only admin can search user
router.route('/:userId/block').patch(verifyJWTmiddleware, verifyAdmin, blockUserController); // only admin can block
router.route('/me/courses').get(verifyJWTmiddleware, meCourseController);
router.route('/:userId').delete(verifyJWTmiddleware, verifyAdmin, deleteUserController); //admin only delete
//router.route('/me/:userId').delete(/* todo: make user only delete */);
router
  .route('/change-username')
  .post(verifyJWTmiddleware, validate(usernameZodSchema), changeUsername);

export default router;
