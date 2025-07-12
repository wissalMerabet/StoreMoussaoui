import { z } from "zod";

export const NewsLetterSchema = z.object({
  email: z.string().email("Invalid email address."),
})