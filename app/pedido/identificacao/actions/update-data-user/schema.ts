import { z } from "zod";

export const updateDataUserSchema = z.object({
  id: z.string(),
  email: z
    .email({ message: "Email inválido" })
    .nonempty({ message: "Favor preencher o email" }),

  name: z.string().nonempty({ message: "Favor preencher o nome" }),
});

export type TupdateDataUserSchema = z.infer<typeof updateDataUserSchema>;
