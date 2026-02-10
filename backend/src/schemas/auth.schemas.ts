import { z } from 'zod';

export const loginZodSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(2, 'Username or email must be longer than 3 characters')
    .max(254, 'Username or Email too long')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Username can only contain letters, numbers, _ and .'),

  password: z
    .string()
    .min(8, 'password must be atleast 8 characters')
    .max(50, 'password must be smaller than 50 characters'),
});

export const registerZodSchema = z.object({
  email: z.string().email('invalid email structure'),

  password: z
    .string()
    .min(8, 'password must be atleast 8 characters')
    .max(50, 'password must be smaller than 50 characters'),
});

export const usernameZodSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, 'Username must be longer than 3 characters')
    .max(34, 'Username too long')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Username can only contain letters, numbers, _ and .'),
});

export const verifyEmailZodSchema = z.object({
  email: z.string().email('invalid email structure'),
  otp: z
    .string()
    .min(6, 'otp cannot be smaller than 6')
    .max(6, 'otp cannot be greater than 6 digits'),
});

export const passwordChangeZodSchema = z.object({
  oldPassword: z
    .string()
    .min(8, 'password must be atleast 8 characters')
    .max(50, 'password must be smaller than 50 characters'),
  newPassword: z
    .string()
    .min(8, 'password must be atleast 8 characters')
    .max(50, 'password must be smaller than 50 characters'),
});

export const resendOtpZodSchema = z.object({
  email: z.string().email('invalid email structure'),
});

export type LoginInput = z.infer<typeof loginZodSchema>;
export type RegisterInput = z.infer<typeof registerZodSchema>;
export type UsernameInput = z.infer<typeof usernameZodSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailZodSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeZodSchema>;
