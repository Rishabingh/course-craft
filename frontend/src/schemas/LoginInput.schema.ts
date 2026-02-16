import { z } from 'zod';

export const loginInputSchema = z.object({
  identifier: z.string().min(3, 'identifier must be atleast 3 characters').max(253, 'identifier cannot be larger than 253 characters').trim(),
  password: z.string().min(8, 'password must be atleast 8 characters').max(253, 'password must be smaller than 253 characters'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;