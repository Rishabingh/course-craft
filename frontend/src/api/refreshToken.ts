import { unProtectedInstance } from './axiosInstance';

interface RefreshTokenResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  }
}

export const refreshToken = async () => {
  try {
    const response = await unProtectedInstance.get<RefreshTokenResponse>('/api/v1/auth/refresh-token');
    return response.data.data.accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};