import { useMutation } from "@tanstack/react-query";
import { unProtectedInstance } from "../../../shared/lib/axiosInstance";
import type { SingnUpInput } from "../schema/SignupInputSchema";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import type { SignupResponse } from "../types/SignupResponse";

const reqSignup = async (data: SingnUpInput) => {
  const res = await unProtectedInstance.post<SignupResponse>('/auth/register', data);
  return res.data.data;
}

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: reqSignup,
    onError: () => {
      toast.error('signup failed')
    },
    onSuccess: (data, variables) => {
      navigate(`/verify-email?email=${variables.email}&expiry=${data.otpExpiry}`);
      toast.success('otp is send to your email')
    }
  })
}