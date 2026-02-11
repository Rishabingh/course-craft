import { Router } from 'express';
import {
  searchUserController,
  getAllUsersController,
  blockUserController,
  deleteUserController,
  getOverviewStats,
} from '../controllers/admin.controller.js';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';

const router = Router();
// base route = api/v1/admin
router.route('/users').get(verifyJWTmiddleware, verifyAdmin, getAllUsersController);
router.route('/users/search').get(verifyJWTmiddleware, verifyAdmin, searchUserController);
router.route('/users/:userId/block').patch(verifyJWTmiddleware, verifyAdmin, blockUserController);
router.route('/users/:userId').delete(verifyJWTmiddleware, verifyAdmin, deleteUserController);
router.route('/stats').get(verifyJWTmiddleware, verifyAdmin, getOverviewStats);

export default router;
