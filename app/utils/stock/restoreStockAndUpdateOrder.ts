"use server";
import { prisma } from "@/lib/db";

interface IrestoreStockAndUpdateOrder {
  orderId: string;
  expectedStatus: "pending" | "paid";
  newStatus: "failed" | "canceled" | "refunded";
}

export async function restoreStockAndUpdateOrder({
  orderId,
  expectedStatus,
  newStatus,
}: IrestoreStockAndUpdateOrder) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      itemsOrder: true,
    },
  });

  //proteção para não repor estoque duas vezes
  if (!order || order.status !== expectedStatus) return;

  await prisma.$transaction(async (tx) => {
    //repor estoque
    await Promise.all(
      order.itemsOrder.map((item) =>
        tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        })
      )
    );

    //atualiza db, muda para falhou
    await tx.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: newStatus,
      },
    });
  });
}
