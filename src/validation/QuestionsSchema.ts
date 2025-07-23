import { z } from "zod";

export const QuestionsSchema = z.object({
  question: z.string().min(4, "La question est trop courte."),
});
