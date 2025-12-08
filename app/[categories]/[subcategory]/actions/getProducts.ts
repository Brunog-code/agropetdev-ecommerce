"use server";

import { IFullProduct } from "@/app/(home)/actions/getProducts";
import { prisma } from "@/lib/db";

interface IgetProductsProp {
  slugCategory: string;
  slugSubcategory: string;
}

export async function getProducts({
  slugCategory,
  slugSubcategory,
}: IgetProductsProp) {
  try {
    const products = await prisma.product.findMany({
      where: {
        subcategory: {
          slug: slugSubcategory,
          category: {
            slug: slugCategory,
          },
        },
      },
      include: {
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });

    const finalProducts: IFullProduct[] = products.map((prod) => ({
      product: {
        ...prod,
        price: prod.price.toNumber(),
      },
      subcategory: prod.subcategory
        ? {
            id: prod.subcategory.id,
            name: prod.subcategory.name,
            slug: prod.subcategory.slug,
            img: prod.subcategory.img,
          }
        : undefined,
      category: prod.subcategory?.category
        ? {
            id: prod.subcategory.category.id,
            name: prod.subcategory.category.name,
            slug: prod.subcategory.category.slug,
          }
        : undefined,
    }));

    return finalProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
