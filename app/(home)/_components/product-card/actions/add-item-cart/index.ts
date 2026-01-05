"use server";

import {IProduct} from '@/app/utils/types/product'
import { prisma } from "@/lib/db";
interface IAddItemCartProps {
  cartProduct: IProduct;
  userId: string;
  type?: string;
}

export async function updateItemQuantity({
  cartProduct,
  userId,
  type = "increment",
}: IAddItemCartProps) {
  //adicionar no db
  try {
    // 1️ - Buscar se o usuário já tem um carrinho, se não existir cria um
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
      },
      include: {
        itemsCart: true,
      },
    });

    // 2- Verificar se o produto já existe no carrinho
    const existingItem = await prisma.itemCart.findFirst({
      where: {
        cartId: cart.id,
        productId: cartProduct.id,
      },
    });

    // 3 - Produto já existe → apenas aumenta a quantidade
    if (existingItem) {
      if (type == "decrement") {
        await prisma.itemCart.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: existingItem.quantity - 1,
          },
        });
      } else {
        await prisma.itemCart.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: existingItem.quantity + 1,
          },
        });
      }
    } else {
      // 4 - Produto não existe → cria item no carrinho
      await prisma.itemCart.create({
        data: {
          cartId: cart.id,
          productId: cartProduct.id,
          quantity: 1,
          price: cartProduct.price,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
