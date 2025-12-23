"use server";

import { prisma } from "@/lib/db";

interface IAddFavoriteData {
  userId: string;
  productId: string;
}

export async function removeFavorite(dataFavorite: IAddFavoriteData) {
  try {
    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: dataFavorite.userId!,
          productId: dataFavorite.productId,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
