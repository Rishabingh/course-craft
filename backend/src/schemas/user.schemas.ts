import { z } from 'zod';

export const usernameZodSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, 'Username must be longer than 3 characters')
    .max(34, 'Username too long')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Username can only contain letters, numbers, _ and .'),
});

export type UsernameInput = z.infer<typeof usernameZodSchema>;
