"use server";

import { prisma } from "@/lib/db";

export async function clearCartDb(userId: string) {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    if (!cart) return { success: true };

    await prisma.itemCart.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
