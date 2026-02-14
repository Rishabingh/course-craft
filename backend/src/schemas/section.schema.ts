import { z } from 'zod';

export const courseSectionZodSchema = z.object({
  course: z.string('course id must be present'),
  name: z
    .string('name should be string')
    .min(8, 'name should be atleast 8 characters')
    .max(300, 'name should not be exceed 300 characters'),

  index: z
    .number('index should be number')
    .min(0, 'index should not be lower than 0')
    .max(40, 'one course can only have max 40 section'),
});

export type SectionInput = z.infer<typeof courseSectionZodSchema>;
