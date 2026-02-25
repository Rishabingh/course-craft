import { z } from 'zod';

export const CourseInputSchema = z.object({
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
  price: z
    .number()
    .nonnegative('Price cannot be negative')
    .max(100000, 'Price excceeds allowed limit'),

  isPublished: z.boolean(),
  accessType: z.enum(['FREE', 'PAID']),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'max file size is 5mb')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only .jpg, .png, .webp allowed',
    ),
});

export type CourseInput = z.infer<typeof CourseInputSchema>;