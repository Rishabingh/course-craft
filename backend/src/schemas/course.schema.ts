import { z } from 'zod';

export const CourseZodSchema = z
  .object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters')
      .max(120, 'Title must be under 120 characters')
      .trim(),

    thumbnail: z.string().url('Thumbnail must be a valid URL'),

    description: z
      .string()
      .min(50, 'Description should be at least 50 characters')
      .max(2000, 'Description is too long')
      .trim(),

    descriptionMdFile: z
      .string()
      .url('Markdown file must be a valid URL')
      .refine((url) => url.endsWith('.md'), 'Description markdown file must end with .md'),

    price: z
      .number()
      .nonnegative('Price cannot be negative')
      .max(100000, 'Price excceeds allowed limit'),

    isPublished: z.boolean(),
    accessType: z.enum(['FREE_OPEN', 'FREE_LOGIN', 'PAID']),
  })
  .refine((data) => (data.accessType === 'PAID' ? data.price > 0 : data.price === 0), {
    message: 'Free courses must have price 0, paid course must have price > 0',
    path: ['price'],
  })
  .strict();

export type CourseInput = z.infer<typeof CourseZodSchema>;
