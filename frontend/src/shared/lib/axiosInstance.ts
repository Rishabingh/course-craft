import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useTokenStore } from "../../store";
import { refreshToken } from "./refreshToken";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const unProtectedInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
});

export const protectedInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
});

protectedInstance.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  const token = useTokenStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
  (error) => Promise.reject(error)
)

protectedInstance.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const orignalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 401 && !orignalRequest._retry) {
      orignalRequest._retry = true;
      try {
        const accessToken = await refreshToken();
        useTokenStore.getState().setToken(accessToken);
        return protectedInstance(orignalRequest);
      } catch (error) {
        console.log(error);
        useTokenStore.getState().clearToken();
        window.location.href = '/login'
        return Promise.reject(error);
      }
    }
  }
)