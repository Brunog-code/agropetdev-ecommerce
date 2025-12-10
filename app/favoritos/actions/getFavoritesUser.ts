"use server";

import { prisma } from "@/lib/db";

export async function getFavoritesUser(userId: string) {
  try {
    const productsFavorites = await prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    const productsFavoritesFormated = productsFavorites.map((p) => ({
      ...p,
      product: {
        ...p.product,
        price: p.product.price.toNumber(),
      },
    }));

    return productsFavoritesFormated;
  } catch (error) {
    console.error(error);
    return [];
  }
}
