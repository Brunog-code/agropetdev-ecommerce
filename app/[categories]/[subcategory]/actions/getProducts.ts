"use server";

import { IFullProduct } from "@/app/utils/types/product";
import { prisma } from "@/lib/db";

interface IgetProductsProp {
  slugCategory: string;
  slugSubcategory: string;
}

// 1. Extendendo a interface e sobrescrevendo os campos específicos
interface IFullProductGetProducts
  extends Omit<IFullProduct, "subcategory" | "category"> {
  subcategory: {
    id: string;
    name: string;
    slug: string;
    img: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
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

    const finalProducts: IFullProductGetProducts[] = products.map((prod) => ({
      product: {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        price: prod.price.toNumber(),
        stock: prod.stock,
        image: prod.image,
        subcategoryId: prod.subcategoryId,
      },
      subcategory: {
        id: prod.subcategory.id,
        name: prod.subcategory.name,
        slug: prod.subcategory.slug,
        img: prod.subcategory.img,
      },
      category: {
        id: prod.subcategory.category.id,
        name: prod.subcategory.category.name,
        slug: prod.subcategory.category.slug,
      },
    }));

    return finalProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
