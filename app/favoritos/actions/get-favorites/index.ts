"use server";

import { prisma } from "@/lib/db";

import { getfavoritesSchema, TgetFavoritesSchema } from "./schema";

export async function getFavoritesUser(userId: TgetFavoritesSchema) {
  try {
    getfavoritesSchema.parse(userId);
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
