import { useMutation } from "@tanstack/react-query";
import { unProtectedInstance } from "../../../shared/lib/axiosInstance";
import type { LoginResponse } from "../types/LoginResponse";
import { useNavigate } from "react-router";
import { useTokenStore } from "../../../store";


// fetch function
const login = async ({identifier, password}: {identifier: string, password: string}) => {
  const res = await unProtectedInstance.post<LoginResponse>('/auth/login', {
    identifier,
    password
  });
  return res.data.data;
}

// custom hook
export const useLogin = () => {
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken)
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate('/');
    }
  })
}
