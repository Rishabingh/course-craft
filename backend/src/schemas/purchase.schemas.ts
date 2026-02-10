import { z } from 'zod';

export const purchaseCouseSchema = z.object({
  course: z.string(),
});

export type purchaseCourseInput = z.infer<typeof purchaseCouseSchema>;
