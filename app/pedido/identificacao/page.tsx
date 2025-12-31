import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { INewAddress } from "@/app/utils/types/new-address";
import { auth } from "@/lib/auth";

import { CheckouSteps } from "../_components/checkout-steps";
import { HeaderSecurity } from "../_components/header-security";
import { CartTotals } from "../carrinho/_components/cartTotals";
import { CardAddress } from "./_components/card-address";
import { CardUserData } from "./_components/card-user-data";
import { getAddressUser } from "./actions/get-address-user";
import { getCartLength } from "./actions/get-cart-length";

export default async function Identification() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //sem session redireciona
  if (!session) {
    redirect(`/login?rto=${encodeURIComponent("/pedido/identificacao")}`);
  }

  //se carrinho vazio redireciona
  const cartLength: number = await getCartLength(session.user.id);
  if (cartLength < 1) {
    redirect("/");
  }

  //chamar a action para pegar os endereços
  const userId = session.user.id;
  const userAddresses: INewAddress[] = await getAddressUser(userId);

  return (
    <section className="w-full flex flex-col gap-6">
      <HeaderSecurity />
      <CheckouSteps />
      <h3>
        Confirme seus dados e carrinho antes de prosseguir para o pagamento.
      </h3>
      <article className="flex flex-col md:flex-row gap-6 justify-around w-full">
        <div className=" space-y-4 flex-1">
          <CardAddress userAddresses={userAddresses} />
        </div>

        <div className=" space-y-4 flex-1">
          <CardUserData />
          <CartTotals />
        </div>
      </article>
    </section>
  );
}
