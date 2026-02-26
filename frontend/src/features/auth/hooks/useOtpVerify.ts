import { unProtectedInstance } from '../../../shared/lib/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import type { OtpInput } from '../schema/OtpSchema';
import type { OtpVerifyResponse } from '../types/OtpVerifyResponse';
import { useTokenStore } from '../../../store';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const verifyOtp = async (data: OtpInput) => {
  const res = await unProtectedInstance.post<OtpVerifyResponse>('/auth/verify-email', data);
  return res.data.data;
};

export const useOtpVerify = () => {
  const setAccessToken = useTokenStore((state) => state.setToken);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyOtp,
    onError: () => {
      toast.error('failed to register user');
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      navigate('/');
    },
  });
};
