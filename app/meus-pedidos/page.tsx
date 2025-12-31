import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { CardOrder } from "./_components/card-order";
import { getOrders } from "./actions/get-orders";

export default async function MyOrders() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }

  const response = await getOrders(session.user.id);
  if (!response.success) {
    console.error(response.message);
    return null;
  }

  const orders = response.orders;

  return (
    <section className="flex flex-col gap-4  mt-4">
      <h1 className="font-bold text-green-800 text-2xl">Meus pedidos</h1>
      <CardOrder orders={orders} />
    </section>
  );
}
