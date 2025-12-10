"use server";

import { prisma } from "@/lib/db";

export async function getUserFavorites(userId: string) {
  try {
    const productFavorite = await prisma.favorite.findMany({
      where: {
        userId,
      },
    });

    return productFavorite;
  } catch (error) {
    console.error(error);
    return []
  }
}
