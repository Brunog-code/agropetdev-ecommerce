"use server";

import { prisma } from "@/lib/db";

import { TgetCartLengthSchema } from "./schema";

export const getCartLength = async (userId: TgetCartLengthSchema) => {
  //verificar se existe o usuario
  const user = await prisma.user.findFirst({
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
