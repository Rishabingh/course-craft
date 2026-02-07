import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  const response: {
    statusCode: number;
    message: string;
    stack?: string;
    errors?: unknown;
  } = {
    statusCode: statusCode,
    message: message,
  };

  if (err instanceof ApiError) {
    response.statusCode = err.statusCode;
    response.message = err.message;

    if (err.errors) {
      response.errors = err.errors;
    }
  } else if (err instanceof Error) {
    response.message = err.message;
  }

  if (process.env.NODE_ENV === 'development' && err instanceof Error) {
    response.stack = err.stack;
  }

  return res.status(response.statusCode).json(response);
};
