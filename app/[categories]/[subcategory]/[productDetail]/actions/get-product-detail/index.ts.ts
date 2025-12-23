"use server";
import { prisma } from "@/lib/db";

import { getProductDetailSchema, TgetProductDetailSchema } from "./schema";

export async function getProductDetail(slugProduct: TgetProductDetailSchema) {
  try {
    getProductDetailSchema.parse(slugProduct);
    const product = await prisma.product.findFirst({
      where: {
        slug: slugProduct,
      },
    });

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      slug: product.slug,
      stock: product.stock,
      subcategoryId: product.subcategoryId,
      price: product.price.toNumber(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
