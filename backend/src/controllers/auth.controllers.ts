import { User } from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { LoginInput, RegisterInput, VerifyEmailInput } from '../schemas/auth.schema.js';
import { generateRandomUsernameFromEmail } from '../services/randomUsername.service.js';
import { sendAndSaveOtp } from '../services/otp.services.js';
import { verifyOtp } from '../services/otp.services.js';

const loginController = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body as LoginInput;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user || !user.emailVerified) {
    throw new ApiError(401, 'Invalid credentials', [
      { field: 'identifier', message: 'Invalid username or email' },
    ]);
  }

  const isPasswordCorrect = await user.verifyPassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid credentials', [
      { field: 'password', message: 'Invalid password' },
    ]);
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.genrateRefreshToken();

  await user.save({ validateBeforeSave: false });

  return res
    .cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    .status(200)
    .json(new ApiResponse<{ accessToken: string }>(200, { accessToken }, 'login successfully'));
});

const registerController = asyncHandler(async (req, res) => {
  const { email, password } = req.body as RegisterInput;

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.emailVerified) {
    throw new ApiError(400, 'email already exist', [
      { field: 'email', message: 'email already exist' },
    ]);
  }

  const username = await generateRandomUsernameFromEmail(email);

  if (existingUser && !existingUser.emailVerified) {
    existingUser.password = password;
    existingUser.username = username;
    await existingUser.save();
  } else {
    await User.create({
      email,
      password,
      username,
    });
  }

  await sendAndSaveOtp(email);

  return res
    .status(200)
    .json(new ApiResponse(200, { otpExpiry: '300' }, 'user saved and otp is generated'));
});

const verifyEmailController = asyncHandler(async (req, res) => {
  const { otp, email } = req.body as VerifyEmailInput;
  const isOtpValid = await verifyOtp(otp, email);
  if (!isOtpValid)
    throw new ApiError(400, 'invalid otp', [{ field: 'otp', message: 'invalid otp' }]);

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, 'user not found');

  const accessToken = user.generateAccessToken();
  const refreshToken = user.genrateRefreshToken();

  await user.save({ validateBeforeSave: false });

  return res
    .cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    .status(201)
    .json(
      new ApiResponse<{ accessToken: string }>(201, { accessToken }, 'registeration successfull'),
    );
});

const resendOtpController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, 'User not found');

  if (user.emailVerified) {
    throw new ApiError(400, 'Email already verified');
  }

  await sendAndSaveOtp(email);

  return res.json(new ApiResponse(200, null, 'OTP resent'));
});

/*
register
verifyEmail
login
refreshToken
logout
resendOtp

todo do seed:admin
"scripts": {
  "seed:admin": "tsx scripts/seedAdmin.ts"
}
*/

export { loginController, registerController, verifyEmailController, resendOtpController };
