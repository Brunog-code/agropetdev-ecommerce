import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { HeaderSecurity } from "../_components/header-security";
import { CardAddress } from "./_components/card-address";
import { CardUserData } from "./_components/card-user-data";
import { getCartLength } from "./actions/get-cart-length";

export default async function Identification() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/login?rto=${encodeURIComponent("/pedido/identificacao")}`);
  }

  const cartLength: number = await getCartLength(session.user.id);
  if (cartLength < 1) {
    redirect("/");
  }

  return (
    <section className="w-full flex flex-col gap-6">
      <HeaderSecurity />

      <article className="flex flex-col md:flex-row gap-6 justify-around w-full">
        <div className=" space-y-4 flex-1">
          <CardAddress />
        </div>

        <div className=" space-y-4 flex-1">
          <CardUserData />
        </div>
      </article>
    </section>
  );
}
