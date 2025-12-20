"use client";

import { useCartStore } from "@/app/store/cartStore";
import { formatBRL } from "@/app/utils/helpers/formatBRL";
import { Button } from "@/components/ui/button";

export const CartTotals = () => {
  const itemsCart = useCartStore((state) => state.cart);
  const totalCart = useCartStore((state) => state.getTotalCart());
  const totalCartWithShipping = useCartStore((state) =>
    state.getTotalCartWithShipping()
  );
  const shippingValue = useCartStore((state) => state.shippingValue);

  if (itemsCart.length < 1) {
    return <></>;
  }

  return (
    <aside className="bg-white p-4 rounded-lg flex-1 h-fit">
      <h1 className="font-semibold border-b-2 p-2 text-center">
        RESUMO DA COMPRA
      </h1>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between px-20">
          <span className="font-medium">Subtotal</span>
          <span>{formatBRL(totalCart)}</span>
        </div>

        <div className="flex justify-between px-20">
          <span className="font-medium">Entrega</span>
          <span>{formatBRL(shippingValue)}</span>
        </div>
        <div className="flex justify-between px-20 font-semibold text-lg border-t">
          <span className="mt-2">Total</span>
          <span className="mt-2">{formatBRL(totalCartWithShipping)}</span>{" "}
        </div>
      </div>
      <Button className="bg-green-600 hover:bg-green-600 mt-6 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center">
        Finalizar pedido
      </Button>
    </aside>
  );
};
