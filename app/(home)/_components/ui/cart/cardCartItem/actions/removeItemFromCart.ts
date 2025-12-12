"use server";

import { prisma } from "@/lib/db";

interface IRemoveItemFromCart {
  userId: string;
  productId: string;
}

export async function removeItemFromCart({
  userId,
  productId,
}: IRemoveItemFromCart) {
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
        productId: productId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
