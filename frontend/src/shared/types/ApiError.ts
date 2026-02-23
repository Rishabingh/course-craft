export interface ApiError {
  statusCode: number;
  message: string;
  stack?: string;
  errors?: { field: string; message: string }[];
}