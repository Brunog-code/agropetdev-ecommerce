import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    token: z.string().min(10, "Token inválido"),
    password: z
      .string()
      .nonempty({ message: "Favor preencher a senha" })
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Favor confirmar a senha" })
      .min(6, {
        message: "A confirmação da senha deve ter pelo menos 6 caracteres",
      }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type TResetPassword = z.infer<typeof resetPasswordSchema>;
