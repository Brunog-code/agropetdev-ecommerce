"use server";

import { prisma } from "@/lib/db";

import { TupdateDataUserSchema, updateDataUserSchema } from "./schema";

export const updateDataUser = async (dataUpdate: TupdateDataUserSchema) => {
  const validation = updateDataUserSchema.safeParse(dataUpdate);
  if (!validation.success) {
    throw new Error("Dados inválidos");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: dataUpdate.id,
    },
  });

  if (!user) throw new Error("Usuario inválido");

  const updateUser = await prisma.user.update({
    where: {
      id: dataUpdate.id,
    },
    data: {
      name: dataUpdate.name,
      email: dataUpdate.email,
    },
  });

  return {
    success: true,
    message: "Dados atualizados com sucesso",
    data: updateUser,
  };
};
