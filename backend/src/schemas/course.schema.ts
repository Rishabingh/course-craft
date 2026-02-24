import { z } from 'zod';

export const CourseZodSchema = z
  .object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters')
      .max(120, 'Title must be under 120 characters')
      .trim(),

    description: z
      .string()
      .min(50, 'Description should be at least 50 characters')
      .max(2000, 'Description is too long')
      .trim(),
    // implement description md file later
    price: z.coerce
      .number()
      .nonnegative('Price cannot be negative')
      .max(100000, 'Price excceeds allowed limit'),

    isPublished: z.coerce.boolean(),
    accessType: z.enum(['FREE', 'PAID']),
  })
  .refine((data) => (data.accessType === 'PAID' ? data.price > 0 : data.price === 0), {
    message: 'Free courses must have price 0, paid course must have price > 0',
    path: ['price'],
  })
  .strict();

export type CourseInput = z.infer<typeof CourseZodSchema>;
