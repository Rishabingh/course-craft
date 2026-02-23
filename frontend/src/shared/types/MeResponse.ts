import type { ApiResponse } from './ApiResponse';

export type MeResponse = ApiResponse<{
  username: string;
  email: string;
  role: 'user' | 'admin';
}>;
