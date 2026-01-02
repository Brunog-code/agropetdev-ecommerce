"use server";

import { prisma } from "@/lib/db";

import { deleteUserAddressSchema, TdeleteUserAddressSchema } from "./schema";

export const deleteUserAddress = async (data: TdeleteUserAddressSchema) => {
  const validation = deleteUserAddressSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Dados invalidos" };
  }

  const { userId: userIdValidate, addressId: addressIdValidate } =
    validation.data;

  //verificar se userId existe
  const user = await prisma.user.findUnique({
    where: {
      id: userIdValidate,
    },
  });
  if (!user) {
    return { success: false, message: "Usuario inexistente" };
  }

  await prisma.address.delete({
    where: {
      id: addressIdValidate,
    },
  });

  return { success: true, message: "Endereço deletado com sucesso" };
};
