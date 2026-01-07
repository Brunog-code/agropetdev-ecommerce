import { NextResponse } from "next/server";

import { restoreStockAndUpdateOrder } from "@/app/utils/stock/restoreStockAndUpdateOrder";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // 🔐 PROTEÇÃO DO CRON
    const authHeader = req.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const pendingOrders = await prisma.order.findMany({
      where: {
        status: "pending",
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    });

    for (const order of pendingOrders) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "canceled",
        },
      });

      //restaura estoque
      await restoreStockAndUpdateOrder({
        orderId: order.id,
        expectedStatus: "pending",
        newStatus: "canceled",
      });
    }

    return NextResponse.json({
      success: true,
      canceledOrders: pendingOrders.length,
    });
  } catch (error) {
    console.error("CRON ERROR:", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
