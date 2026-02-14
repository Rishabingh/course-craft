import { Resend } from 'resend';
import { ApiError } from '../utils/ApiError.js';

export const getResend = () => {
  if (!process.env.RESEND_KEY) {
    throw new ApiError(500, 'resend api key is not configured');
  }
  return new Resend(process.env.RESEND_KEY);
};
