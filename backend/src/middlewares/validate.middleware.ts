import type { ZodSchema } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const validate = (schema: ZodSchema) =>
  asyncHandler(async (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      throw new ApiError(400, 'Validation failed', errors);
    }
    req.body = result.data;

    next();
  });
