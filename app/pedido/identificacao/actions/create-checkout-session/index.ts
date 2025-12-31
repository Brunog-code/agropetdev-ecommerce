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

  const sessionAuth = await auth.api.getSession({
    headers: await headers(),
  });
  if (!sessionAuth) {
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
  if (order.userId !== sessionAuth.user.id) {
    return { success: false, message: "Pedido não pertence ao usuário logado" };
  }

  //instancia stripe
  const stripe = await new Stripe(process.env.STRIPE_SECRET_KEY);

  //Verifica se o usuario ja tentou fazer o pagamento
  //SE JÁ EXISTE UMA SESSION, VERIFICA NO STRIPE
  if (order.stripeSessionId) {
    const existingSession = await stripe.checkout.sessions.retrieve(
      order.stripeSessionId
    );

    //pagamento já confirmado (mesmo se webhook falhou)
    if (existingSession.payment_status === "paid") {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "paid" },
      });

      return {
        success: false,
        message: "Pagamento já confirmado para este pedido",
      };
    }

    //sessão ainda válida → reutiliza
    if (existingSession.status === "open" && existingSession.url) {
      return {
        success: true,
        url: existingSession.url,
        id: existingSession.id,
      };
    }

    //sessão expirada ou cancelada → limpa
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: null },
    });
  }
  //-------

  //criar a checkoutSession
  const checkoutSession = await stripe.checkout.sessions.create({
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

  if (!checkoutSession.url) {
    return { success: false, message: "URL do Stripe não foi gerada" };
  }

  //atualiza o banco, incluindo o stripeSessionId e url de pagamento
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      stripeSessionId: checkoutSession.id,
    },
  });

  return { success: true, url: checkoutSession.url, id: checkoutSession.id };
};
