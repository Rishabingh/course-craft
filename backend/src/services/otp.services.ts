import { generateOtp } from '../utils/generateOtp.js';
import { sendEmailResend } from '../email/sendEmail.js';
import { emailVerficationOtpEmailTemplate } from '../email/resendTemplates/emailVerificatioOtp.template.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.model.js';

export const sendAndSaveOtp = async (email: string) => {
  const otp = generateOtp();
  const expiry = new Date(Date.now() + 1000 * 60 * 5); //5mins
  try {
    await sendEmailResend(
      email,
      'otp for email verification',
      emailVerficationOtpEmailTemplate(otp, '5'),
    );

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, 'User not found');

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();
    return true;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, 'failed to send otp email', [
      { field: 'otp', message: 'failed to send otp email' },
    ]);
  }
};

export const verifyOtp = async (otp: string, email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, 'User not found');

  const isOtpValid = otp === user.otp && user.otpExpiry && user.otpExpiry > new Date();

  if (!isOtpValid)
    throw new ApiError(400, 'otp expired or invalid', [
      { field: 'otp', message: 'expired or invalid' },
    ]);

  user.emailVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  return isOtpValid;
};
