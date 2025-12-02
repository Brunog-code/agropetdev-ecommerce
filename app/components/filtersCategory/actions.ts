import { prisma } from "@/lib/db";

//GET - BUSCAR CATEGORIAS
//embaralhar categorias
function shuffleArray<T>(arr: T[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export async function getCategoriesAndSubResume() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: ["Cachorros", "Gatos"],
        },
      },
      include: {
        subcategories: true,
      },
    });

    const subcategoriesRamdon = categories.map((cat) => ({
      ...cat,
      subcategories: shuffleArray(cat.subcategories).slice(0, 5),
    }));

    return subcategoriesRamdon;
  } catch (error) {
    console.error(error);
    return [];
  }
}
