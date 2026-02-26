import type { ApiResponse } from "../../../shared/types/ApiResponse";

interface res {
 accessToken : string;
}

export type OtpVerifyResponse = ApiResponse<res>;