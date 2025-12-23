"use server";

import { prisma } from "@/lib/db";

import { saveAddressSchema, TsaveAddressSchema } from "./schema";

export async function saveAddress(data: TsaveAddressSchema) {
  try {
    saveAddressSchema.parse(data);

    //localiza usuario
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      console.error("Usuario não localizado");
      return { message: false };
    }

    //cadastra endereço
    await prisma.address.create({
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

    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar endereço:", error);
    return { success: false };
  }
}
