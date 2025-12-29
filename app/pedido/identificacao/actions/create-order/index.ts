"use server";

import { TCreateOrderResponse } from "@/app/utils/types/orders";
import { prisma } from "@/lib/db";

import { createOrderSchema, TcreateOrderSchema } from "./schema";

export const createOrder = async (
  data: TcreateOrderSchema
): Promise<TCreateOrderResponse> => {
  const validation = createOrderSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Dados inválidos" };
  }

  const validationData = validation.data;

  //validar usuario
  const user = await prisma.user.findUnique({
    where: {
      id: validationData.userId,
    },
  });
  if (!user) {
    return { success: false, message: "Usuário inválido" };
  }

  //pegar carrinho do usuario
  const cart = await prisma.cart.findUnique({
    where: {
      userId: validationData.userId,
    },
    include: {
      itemsCart: true,
    },
  });
  if (!cart || cart.itemsCart.length === 0) {
    return { success: false, message: "Carrinho vazio" };
  }

  //pegar o endereço do usuario
  const userAddress = await prisma.address.findUnique({
    where: {
      id: validationData.addressId,
      userId: validationData.userId,
    },
  });
  if (!userAddress) {
    return { success: false, message: "Endereço inválido" };
  }

  //criar order (usando transaction para garantir atomicidade)
  try {
    const order = await prisma.$transaction(async (tx) => {
      const orderCreated = await tx.order.create({
        data: {
          userId: validationData.userId,
          subtotal: validationData.subtotal,
          shippingCost: validationData.shippingCost,
          shippingType: validationData.shippingType,
          shippingEta: validationData.shippingEta,
          total: validationData.total,
          street: userAddress.street,
          number: userAddress.number,
          district: userAddress.district,
          city: userAddress.city,
          state: userAddress.state,
          zip: userAddress.zip,
          itemsOrder: {
            create: cart.itemsCart.map((item) => ({
              quantity: item.quantity,
              price: item.price,
              productId: item.productId,
            })),
          },
        },
        include: {
          itemsOrder: true,
        },
      });

      //deletar os items do carrinho
      await tx.itemCart.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
      return orderCreated;
    });

    //formatando price
    const formattedOrder = {
      ...order,
      subtotal: order.subtotal.toNumber(),
      shippingCost: order.shippingCost.toNumber(),
      total: order.total.toNumber(),
      itemsOrder: order.itemsOrder.map((item) => ({
        ...item,
        price: item.price.toNumber(),
      })),
    };

    return { success: true, order: formattedOrder };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro interno no servidor",
    };
  }
};
