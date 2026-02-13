import { z } from 'zod';

export const videoZodSchema = z.object({
  title: z
    .string('title should be string')
    .min(4, 'title must be greater than 8 characters')
    .max(300, 'title must be shorter than 300 characters'),
  section: z.string('section must be a valid string id'),
  index: z
    .number('index should be a number')
    .min(0, 'index must be greater than 0')
    .max(30, 'a section can only have 30 indexes'),
});

export type VideoInput = z.infer<typeof videoZodSchema>;
