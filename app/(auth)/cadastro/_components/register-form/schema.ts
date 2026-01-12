import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "Favor preencher o email" })
      .email({ message: "Email inválido" }),
    name: z.string().nonempty({ message: "Favor preencher o nome" }),
    street: z.string().nonempty({ message: "Favor preencher a rua" }),
    number: z.string().nonempty({ message: "Favor preencher o número" }),
    district: z.string().nonempty({ message: "Favor preencher o bairro" }),
    city: z.string().nonempty({ message: "Favor preencher a cidade" }),
    state: z
      .string()
      .nonempty({ message: "Favor selecionar o estado" })
      .length(2, { message: "O estado deve ter 2 caracteres (sigla)" }),
    zip: z
      .string()
      .nonempty({ message: "Favor preencher o CEP" })
      .regex(/^\d{5}-?\d{3}$/, { message: "Formato de CEP inválido" }),
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type TregisterSchema = z.infer<typeof registerSchema>;
