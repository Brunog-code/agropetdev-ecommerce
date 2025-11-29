"use server";
import { prisma } from "@/lib/db";

interface ISaveAddressProps {
  id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip: string;
}

export async function saveAddress(data: ISaveAddressProps) {
  try {
    //localiza usuario
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    //cadastra endereço
    console.log("Criando endereço para:", data.id);
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

    console.log(`Usuario localizado: ${user?.name}`);
  } catch (error) {
    console.error("Erro ao salvar endereço:", error);
  }
}
