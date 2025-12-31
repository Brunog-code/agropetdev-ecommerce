import { CheckouSteps } from "../_components/checkout-steps";
import { HeaderSecurity } from "../_components/header-security";
import { CartItems } from "./_components/cartItems";
import { CartTotals } from "./_components/cartTotals";
import { ShippingCost } from "./_components/shippingCost";

export default function CheckoutCart() {
  return (
    <section className="w-full flex flex-col gap-6">
      <HeaderSecurity />
      <CheckouSteps />

      <article className="flex flex-col md:flex-row gap-6 justify-around w-full">
        <div className=" space-y-4 flex-2">
          <CartItems />

          <ShippingCost />
        </div>

        <CartTotals />
      </article>
    </section>
  );
}
