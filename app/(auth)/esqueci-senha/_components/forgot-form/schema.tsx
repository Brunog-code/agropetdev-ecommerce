import { z } from "zod";

export const forgotFormSchema = z.object({
  email: z.email("Email inválido"),
});

export type TForgotForm = z.infer<typeof forgotFormSchema>;
