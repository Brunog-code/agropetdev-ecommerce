import { prisma } from "@/lib/db";

import { getQuantityStockProductSchema } from "./schema";

export const getQuantityStockProduct = async (id: string) => {
  const validation = getQuantityStockProductSchema.safeParse(id);
  if (!validation.success) {
    return 0;
  }

  const idValidate = validation.data;

  const stockProduct = await prisma.product.findUnique({
    where: {
      id: idValidate,
    },
    select: {
      stock: true,
    },
  });

  return stockProduct?.stock ?? 0;
};
