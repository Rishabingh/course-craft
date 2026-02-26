import type { ApiResponse } from "../../../shared/types/ApiResponse";

interface res {
  otpExpiry: string 
}

export type SignupResponse = ApiResponse<res>;