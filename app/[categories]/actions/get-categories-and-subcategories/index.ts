"use server";

import { prisma } from "@/lib/db";

import {
  getCategoriesAndSubcategoriesSchema,
  TgetCategoriesAndSubcategoriesSchema,
} from "./schema";

export async function getCategoriesAndSubcategories(
  slug: TgetCategoriesAndSubcategoriesSchema
) {
  try {
    getCategoriesAndSubcategoriesSchema.parse(slug);

    const categoriesProductsData = await prisma.category.findMany({
      where: {
        slug,
      },
      include: {
        subcategories: true,
      },
    });
    return categoriesProductsData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
