import { IGetOrders } from "@/app/utils/types/orders";
import { prisma } from "@/lib/db";

import { getOrdersSchema, TgetOrdersSchema } from "./schema";

type IgetOrdersResponse =
  | { success: false; message: string }
  | { success: true; orders: IGetOrders[] };

export const getOrders = async (
  userId: TgetOrdersSchema
): Promise<IgetOrdersResponse> => {
  const validation = getOrdersSchema.safeParse(userId);
  if (!validation.success) {
    return { success: false, message: "Dados inválidos" };
  }

  const validationUserId = validation.data;

  const orders = await prisma.order.findMany({
    where: {
      userId: validationUserId,
    },
    include: {
      itemsOrder: {
        include: {
          product: {
            include: {
              subcategory: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: IGetOrders[] = orders.map((order) => ({
    ...order,
    total: order.total.toNumber(),
    subtotal: order.subtotal.toNumber(),
    shippingCost: order.shippingCost.toNumber(),
    itemsOrder: order.itemsOrder.map((item) => ({
      ...item,
      price: item.price.toNumber(),
      product: {
        ...item.product,
        price: item.product.price.toNumber(),
      },
    })),
  }));

  return { success: true, orders: formattedOrders };
};
