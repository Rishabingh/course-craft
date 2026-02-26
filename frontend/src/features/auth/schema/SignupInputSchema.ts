import {z} from 'zod';

export const SignUpInputSchema = z.object({
  email: z.email('invalid email format'),
  password: z.string().min(8, 'password must be 8 character long')
    .max(300, 'password too long'),
})

export type SingnUpInput = z.infer<typeof SignUpInputSchema>;