"use server";

import { prisma } from "@/lib/db";

import { getfavoritesSchema, TgetFavoritesSchema } from "./schema";

export interface IFavoritesData {
  id: string;
  productId: string;
  userId: string;
  createdAt: Date;
  product: {
    id: string;
    name: string;
    nameNormalized: string;
    description: string;
    price: number; // se for convertido de Decimal
    stock: number;
    image: string;
    slug: string;
    subcategoryId: string;
  };
}

type TgetFavoritesResponse =
  | { success: false; message: string; favorites: IFavoritesData[] }
  | { success: true; favorites: IFavoritesData[] };

export async function getFavoritesUser(
  userId: TgetFavoritesSchema
): Promise<TgetFavoritesResponse> {
  try {
    //verificar se user existe
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        success: false,
        message: "Usuario não identificado",
        favorites: [],
      };
    }

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

    return { success: true, favorites: productsFavoritesFormated };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro interno do servidor",
      favorites: [],
    };
  }
}
