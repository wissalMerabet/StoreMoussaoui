import { z } from "zod";

export const userFormSchema = z.object({
  Nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .regex(/^0[5-7]\d{8}$/, "Numéro invalide"),
  wilaya: z.string().min(2, "Wilaya requise"),
  baladiya: z.string().min(2, "Baladiya requise"),
  comment: z.string().optional(),
});
