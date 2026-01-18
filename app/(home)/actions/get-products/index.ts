"use server";

import { IFullProduct } from "@/app/utils/types/product";
import { prisma } from "@/lib/db";

//embaralha
function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export async function getProducts() {
  try {
    const productsData = await prisma.category.findMany({
      include: {
        subcategories: {
          include: {
            products: true,
          },
        },
      },
    });

    const finalProducts: IFullProduct[] = [];

    //embaralhar categortias
    const shuffledCategories = shuffle(productsData);

    //pegar 4 categorias
    const selectedCategories = shuffledCategories.slice(0, 3);

    for (const category of selectedCategories) {
      //Embaralha SUBCATEGORIAS dentro da categoria
      const shuffledSubs = shuffle(category.subcategories);

      // pega 2 subcategorias
      const selectedSubs = shuffledSubs.slice(0, 2);

      for (const sub of selectedSubs) {
        //Embaralha produtos
        const shuffledProducts = shuffle(sub.products);

        // pega 3 produtos
        const selectedProducts = shuffledProducts.slice(0, 2);

        for (const product of selectedProducts) {
          finalProducts.push({
            category: {
              slug: category.slug,
            },
            subcategory: {
              name: sub.name,
              slug: sub.slug,
            },
            product: {
              ...product,
              price: product.price.toNumber(), //corrigir Decimal
            },
          });
        }
      }
    }

    return finalProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
