import type { ApiResponse } from "../../../shared/types/ApiResponse";

export type LoginResponse = ApiResponse<{
  accessToken: string;
}>;