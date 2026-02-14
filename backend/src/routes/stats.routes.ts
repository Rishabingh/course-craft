import { Router } from 'express';
import { getOverviewStats } from '../controllers/stats.controller.js';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';

const router = Router();
// base route = api/v1/stats
router.route('/stats').get(verifyJWTmiddleware, verifyAdmin, getOverviewStats);

export default router;
