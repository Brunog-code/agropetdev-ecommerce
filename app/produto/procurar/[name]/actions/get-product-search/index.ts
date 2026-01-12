import { normalizeText } from "@/app/utils/helpers/normalizeText";
import { prisma } from "@/lib/db";

import { getProductSearchSchema, TgetProductSearchSchema } from "./schema";

export const getProductSearch = async (data: TgetProductSearchSchema) => {
  try {
    const name = getProductSearchSchema.parse(data);

    const normalized = normalizeText(name);

    const stopWords = ["para", "de", "com", "e", "a", "o"];

    const terms = normalized
      .split(" ")
      .filter((t) => t.length > 2 && !stopWords.includes(t));

    if (terms.length === 0) return [];

    const products = await prisma.product.findMany({
      where: {
        OR: terms.flatMap((term) => [
          {
            nameNormalized: {
              contains: term,
            },
          },
          {
            name: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: term,
              mode: "insensitive",
            },
          },
        ]),
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

    return products.map((p) => ({
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
    }));
  } catch (error) {
    console.error("getProductSearch error:", error);
    return [];
  }
};
