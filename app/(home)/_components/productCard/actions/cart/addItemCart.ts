"use server";

import { prisma } from "@/lib/db";

interface IProductCart {
  id: string;
  description: string;
  image: string;
  price: number;
  name: string;
  slug: string;
  stock: number;
  subcategoryId?: string;
}

interface IAddItemCartProps {
  cartProduct: IProductCart;
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
    // 1️ - Buscar se o usuário já tem um carrinho
    let cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        itemsCart: true,
      },
    });

    // 2️ - Se não existir carrinho, criar um
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
        include: {
          itemsCart: true,
        },
      });
    }

    // 3️- Verificar se o produto já existe no carrinho
    const existingItem = await prisma.itemCart.findFirst({
      where: {
        cartId: cart.id,
        productId: cartProduct.id,
      },
    });

    // 4️ - Produto já existe → apenas aumenta a quantidade
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
      // 5️ - Produto não existe → cria item no carrinho
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
