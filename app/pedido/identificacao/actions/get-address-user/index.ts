'use server'

import { prisma } from "@/lib/db";

import { getAddressUserSchema, TgetAddressUserSchema } from "./schema";

export const getAddressUser = async (userId: TgetAddressUserSchema) => {
  //zod
  getAddressUserSchema.parse(userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      address: true,
    },
  });

  if (!user) {
    throw new Error("Usuario não encontrado");
  }

  return user.address;
};
