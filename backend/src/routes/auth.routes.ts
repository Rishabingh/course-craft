import { Router } from 'express';
import {
  loginController,
  registerController,
  verifyEmailController,
  resendOtpController,
  refreshTokenController,
  changePasswordController,
} from '../controllers/auth.controllers.js';
import { verifyJWTmiddleware } from '../middlewares/verifyJWT.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  loginZodSchema,
  registerZodSchema,
  verifyEmailZodSchema,
  passwordChangeZodSchema,
  resendOtpZodSchema,
} from '../schemas/auth.schema.js';

const router = Router();

router.route('/login').post(validate(loginZodSchema), loginController);
router.route('/register').post(validate(registerZodSchema), registerController);
router.route('/verify-email').post(validate(verifyEmailZodSchema), verifyEmailController);
router.route('/resend-verify-email-otp').post(validate(resendOtpZodSchema), resendOtpController);

// secure routes
router.route('/refresh-token').get(verifyJWTmiddleware, refreshTokenController);
router
  .route('/change-password')
  .post(verifyJWTmiddleware, validate(passwordChangeZodSchema), changePasswordController);

export default router;
