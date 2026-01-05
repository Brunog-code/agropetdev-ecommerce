import { NextResponse } from "next/server";
import Stripe from "stripe";

import { restoreStockAndUpdateOrder } from "@/app/utils/stock/restoreStockAndUpdateOrder";
import { prisma } from "@/lib/db";

export const POST = async (req: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }

  //verifica se a solicitacao que esta chegando realmente foi emitida pelo stripe, e não é maliciosa
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  //corpo bruto da requisicao que chegou
  const text = await req.text();

  //instanciando
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  //instanciando evento
  try {
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    //tipos de evento
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        if (!orderId) {
          return NextResponse.json(
            { error: "Missing orderId in metadata" },
            { status: 400 }
          );
        }
        //atualiza db, muda para pago
        await prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            status: "paid",
          },
        });
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;
        if (!orderId) break;

        await restoreStockAndUpdateOrder({
          orderId,
          expectedStatus: "pending",
          newStatus: "failed",
        });

        break;
      }

      case "payment_intent.canceled": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;
        if (!orderId) break;

        await restoreStockAndUpdateOrder({
          orderId,
          expectedStatus: "pending",
          newStatus: "canceled",
        });

        break;
      }

      case "charge.refund.updated": {
        console.log("chegou o webook no refund inicio");
        const refund = event.data.object as Stripe.Refund;
        if (!refund.payment_intent) break;

        // pega o PaymentIntent
        const paymentIntent = await stripe.paymentIntents.retrieve(
          refund.payment_intent as string
        );

        // pega a checkout session vinculada
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        });

        const session = sessions.data[0];
        const orderId = session?.metadata?.orderId;

        if (!orderId) break;
        await restoreStockAndUpdateOrder({
          orderId,
          expectedStatus: "paid",
          newStatus: "refunded",
        });
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        if (!orderId) break;

        await restoreStockAndUpdateOrder({
          orderId,
          expectedStatus: "pending",
          newStatus: "canceled",
        });

        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }
};
