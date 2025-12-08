'use server'

import { prisma } from "@/lib/db";

export async function getCategoriesAndSubcategories(slug: string) {
  try {
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
