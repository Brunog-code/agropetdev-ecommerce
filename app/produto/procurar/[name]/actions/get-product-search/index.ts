import { normalizeText } from "@/app/utils/helpers/normalizeText";
import { prisma } from "@/lib/db";

import { getProductSearchSchema, TgetProductSearchSchema } from "./schema";

export const getProductSearch = async (name: TgetProductSearchSchema) => {
  try {
    getProductSearchSchema.parse(name);
    const products = await prisma.product.findMany({
      where: {
        nameNormalized: {
          contains: normalizeText(name),
        },
      },
      include: {
        subcategory: {
          select: {
            slug: true,
            name: true,
            category: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });

    const finalProducts = products.map((p) => {
      return {
        category: {
          slug: p.subcategory.category.slug,
        },
        subcategory: {
          name: p.subcategory.name,
          slug: p.subcategory.slug,
        },
        product: {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price.toNumber(),
          stock: p.stock,
          image: p.image,
          subcategoryId: p.subcategoryId,
        },
      };
    });
    return finalProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
