import { z } from "zod";

export const userFormSchema = z.object({
  Nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .min(6, "Numéro trop court")
    .regex(/^[0-9+\s()-]+$/, "Numéro de téléphone invalide"),
  wilaya: z.string().min(2, "Wilaya requise"),
  comment: z.string().optional(),
});
