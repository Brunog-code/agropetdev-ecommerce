"use server";

import { prisma } from "@/lib/db";

import { getCartLengthSchema, TgetCartLengthSchema } from "./schema";

export const getCartLength = async (userId: TgetCartLengthSchema) => {
  const validation = getCartLengthSchema.safeParse(userId);
  if (!validation.success) {
    throw new Error("Dados inválidos");
  }
  
  //verificar se existe o usuario
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Cart: {
        include: {
          itemsCart: true,
        },
      },
    },
  });

  if (!user) throw new Error("Usuario inválido");

  return user.Cart?.itemsCart.length ?? 0;
};
