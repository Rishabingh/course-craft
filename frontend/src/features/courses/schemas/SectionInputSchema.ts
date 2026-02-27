import { z } from 'zod';

export const SectionInputSchema = z.object({
  name: z
    .string('name should be string')
    .min(8, 'name should be atleast 8 characters')
    .max(300, 'name should not be exceed 300 characters'),
});

export type SectionInput = z.infer<typeof SectionInputSchema>

