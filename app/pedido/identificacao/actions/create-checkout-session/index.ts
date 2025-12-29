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
  | { success: true; url: string; id: string }
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

  //BLOQUEIA múltiplas sessões para o mesmo pedido
  if (order.stripeSessionId) {
    return {
      success: false,
      message: "Este pedido já possui uma sessão de pagamento",
    };
  }

  //instancia stripe
  const stripe = await new Stripe(process.env.STRIPE_SECRET_KEY);

  //criar a checkoutSession
  const checkouSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    //precisa ser dinamica(em dev localhost, em prod outra)
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/cancelado?session_id={CHECKOUT_SESSION_ID}`,
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

  //atualiza o banco, incluindo o stripeSessionId
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      stripeSessionId: checkouSession.id,
    },
  });

  return { success: true, url: checkouSession.url, id: checkouSession.id };
};
