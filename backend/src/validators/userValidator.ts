import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito grande")
    .trim(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;