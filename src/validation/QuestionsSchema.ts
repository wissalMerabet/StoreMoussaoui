
import { z } from "zod";

export const QuestionsSchema = z.object({
  text: z
    .string()
    .min(2, 'Minimum 2 characters required')
    .max(50, 'Maximum 50 characters')
    .nonempty('Search cannot be empty'),
});