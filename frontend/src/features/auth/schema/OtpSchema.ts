import {z} from 'zod'

export const OtpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "Only numbers are allowed"),
});

export type OtpInput = z.infer<typeof OtpSchema>;