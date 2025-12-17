import { ShieldCheck } from "lucide-react";
import { CartItems } from "./_components/cartItems";
import { CartTotals } from "./_components/cartTotals";
import { ShippingCost } from "./_components/shippingCost";

export default function CheckoutCart() {
  return (
    <section className="w-full flex flex-col gap-6">
      <article className="bg-white flex flex-col items-center justify-center gap-2 p-4 rounded-lg md:flex-row md:justify-around">
        <h1 className="text-xl font-bold">MEU CARRINHO</h1>
        <span className="flex gap-1 font-semibold">
          <ShieldCheck size={22} color="#3a7d44" /> Compra 100% segura
        </span>
      </article>

      <article className="flex flex-col md:flex-row gap-6 justify-around w-full ">
        <div className=" space-y-4">
          <CartItems />

          <ShippingCost />
        </div>

        <CartTotals />
      </article>
    </section>
  );
}
