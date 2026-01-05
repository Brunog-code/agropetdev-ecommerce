"use server";

import { headers } from "next/headers";
import Stripe from "stripe";

import { restoreStockAndUpdateOrder } from "@/app/utils/stock/restoreStockAndUpdateOrder";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

import { cancelOrderStripeSchema, TcancelOrderStripeSchema } from "./schema";

type CancelOrderResponse =
  | { success: false; message: string }
  | { success: true };

export const cancelOrderStripe = async (
  orderId: TcancelOrderStripeSchema
): Promise<CancelOrderResponse> => {
  //se não tiver chave
  if (!process.env.STRIPE_SECRET_KEY) {
    return { success: false, message: "Key não definida" };
  }

  //verificar usuario
  const sessionAuth = await auth.api.getSession({
    headers: await headers(),
  });
  if (!sessionAuth) {
    return { success: false, message: "Usuário inválido" };
  }

  //validacao zod
  const validation = cancelOrderStripeSchema.safeParse(orderId);
  if (!validation.success) {
    return { success: false, message: "Dados inválidos" };
  }

  const orderIdValidate = validation.data;

  //procurar pedido
  const order = await prisma.order.findUnique({
    where: {
      id: orderIdValidate,
    },
  });
  if (!order) {
    return { success: false, message: "Pedido não localizado" };
  }

  //se id pedido !== user logado
  if (order.userId !== sessionAuth.user.id) {
    return { success: false, message: "Pedido não pertence ao usuário logado" };
  }

  //pedidos com status que NÃO podem ser cancelados
  if (["refunded", "failed", "canceled"].includes(order.status)) {
    return { success: false, message: "Pedido não pode ser cancelado" };
  }

  if (!order.stripeSessionId) {
    return {
      success: false,
      message: "Sessão do Stripe não encontrada",
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    //verificar se ja não esta cancelado no stripe e atualizar o db
    const sessionStripe = await stripe.checkout.sessions.retrieve(
      order.stripeSessionId
    );
    // Variáveis para PaymentIntent e Charge (podem ser null)
    let paymentIntent: Stripe.PaymentIntent | null = null;
    let charge: Stripe.Charge | null = null;

    if (sessionStripe.payment_intent) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pi: any = await stripe.paymentIntents.retrieve(
          sessionStripe.payment_intent as string,
          { expand: ["charges.data"] }
        );

        paymentIntent = pi; // atualiza a variável let existente
        charge = pi.charges?.data?.[0] ?? null;

        // ============================
        // Verifica se já foi estornado ou cancelado
        // ============================

        // Verifica se já existe refund direto no Stripe
        const refunds = await stripe.refunds.list({
          payment_intent: sessionStripe.payment_intent as string,
        });
        if (refunds.data.length > 0) {
          await restoreStockAndUpdateOrder({
            orderId: order.id,
            expectedStatus: "paid",
            newStatus: "refunded",
          });
          return { success: true };
        }

        // Status de cancelado ou falhado
        if (paymentIntent?.status === "canceled") {
          await restoreStockAndUpdateOrder({
            orderId: order.id,
            expectedStatus: "pending",
            newStatus: "canceled",
          });
          return { success: true };
        }
        if (
          paymentIntent?.status === "requires_payment_method" ||
          charge?.status === "failed"
        ) {
          await restoreStockAndUpdateOrder({
            orderId: order.id,
            expectedStatus: "pending",
            newStatus: "failed",
          });
          return { success: true };
        }
      } catch (err) {
        console.warn(
          "Não foi possível recuperar PaymentIntent/Charge. Prosseguindo com cancelamento:",
          err
        );
      }
    }

    // ======= Primeira vez que clica no cancelar =======
    /**
     * ============================
     * CASO 1: PEDIDO JÁ PAGO
     * ============================
     */

    if (order.status == "paid") {
      //cria reembolso
      await stripe.refunds.create({
        payment_intent: sessionStripe.payment_intent as string,
      });

      //NÃO atualiza banco
      //webhook charge.refunded → refunded
      return { success: true };
    }

    /**
     * ============================
     * CASO 2: PEDIDO AINDA NÃO PAGO
     * ============================
     */
    if (order.status === "pending") {
      if (sessionStripe.status === "open") {
        await stripe.checkout.sessions.expire(order.stripeSessionId);
        return { success: true };
      }

      // ⚠️ Sessão já foi concluída no Stripe
      if (sessionStripe.status === "complete") {
        // Corrige o banco
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "paid" },
        });

        // Agora segue fluxo de refund
        await stripe.refunds.create({
          payment_intent: sessionStripe.payment_intent as string,
        });

        return { success: true };
      }
    }

    return { success: false, message: "Status inválido" };
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    return {
      success: false,
      message: "Erro ao processar cancelamento",
    };
  }
};
