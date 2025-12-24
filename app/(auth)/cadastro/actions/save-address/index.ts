"use server";

import { prisma } from "@/lib/db";

import { saveAddressSchema, TsaveAddressSchema } from "./schema";

export async function saveAddress(data: TsaveAddressSchema) {
  saveAddressSchema.parse(data);

  //localiza usuario
  const user = await prisma.user.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  //cadastra endereço
  const newAddress = await prisma.address.create({
    data: {
      userId: data.id,
      street: data.street,
      number: data.number,
      district: data.district,
      city: data.city,
      state: data.state,
      zip: data.zip,
    },
  });

  return { success: true, newAddress };
}
