import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 6 caracteres" }),
  });
  
  export type TloginSchema = z.infer<typeof loginSchema>;