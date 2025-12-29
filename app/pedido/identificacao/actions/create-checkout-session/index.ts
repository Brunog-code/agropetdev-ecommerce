"use server";

import { headers } from "next/headers";
import Stripe from "stripe";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

import {
  createCheckoutSessionSchema,
  TcreateCheckoutSessionSchema,
} from "./schema";

export type ICheckouSessionResponse =
  | { success: true; url: string }
  | { success: false; message: string };

export const createCheckoutSession = async (
  orderId: TcreateCheckoutSessionSchema
): Promise<ICheckouSessionResponse> => {
  //se não tiver chave
  if (!process.env.STRIPE_SECRET_KEY) {
    return { success: false, message: "Key não definida" };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { success: false, message: "Usuário inválido" };
  }

  //validação zod
  const validation = createCheckoutSessionSchema.safeParse(orderId);
  if (!validation.success) {
    return { success: false, message: "OrderId inválido" };
  }

  const validationOrderId = validation.data;

  //procura o pedido
  const order = await prisma.order.findUnique({
    where: {
      id: validationOrderId,
    },
    include: {
      itemsOrder: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!order) {
    return { success: false, message: "Pedido não localizado" };
  }

  //se id pedido !== user logado
  if (order.userId !== session.user.id) {
    return { success: false, message: "Pedido não pertence ao usuário logado" };
  }

  //instancia stripe
  const stripe = await new Stripe(process.env.STRIPE_SECRET_KEY);

  //criar a checkoutSession
  const checkouSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    //precisa ser dinamica(em dev localhost, em prod outra)
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: [
      ...order.itemsOrder.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: [item.product.image],
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: "Frete",
            description: `Entrega - ${order.shippingType}`,
          },
          unit_amount: Math.round(Number(order.shippingCost) * 100),
        },
        quantity: 1,
      },
    ],
  });

  if (!checkouSession.url) {
    return { success: false, message: "URL do Stripe não foi gerada" };
  }

  return { success: true, url: checkouSession.url };
};
