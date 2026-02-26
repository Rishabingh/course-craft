import { unProtectedInstance } from "../../../shared/lib/axiosInstance";

export const resendOtp = async (data: {email: string}) => {
  const res = await unProtectedInstance.post('/resend-verify-email-otp', data);
  return res;
}