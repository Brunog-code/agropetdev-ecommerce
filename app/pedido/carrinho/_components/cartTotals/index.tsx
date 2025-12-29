"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Spinner } from "@/app/(home)/_components/spinner";
import { useAuth } from "@/app/contexts/AuthCont";
import { createCheckoutSession } from "@/app/pedido/identificacao/actions/create-checkout-session";
import { ICheckouSessionResponse } from "@/app/pedido/identificacao/actions/create-checkout-session";
import { createOrder } from "@/app/pedido/identificacao/actions/create-order";
import { useCartStore } from "@/app/store/cartStore";
import { formatBRL } from "@/app/utils/helpers/formatBRL";
import { type TCreateOrderResponse } from "@/app/utils/types/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CartTotals = () => {
  //session
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  //zustand
  const itemsCart = useCartStore((state) => state.cart);
  const totalCart = useCartStore((state) => state.getTotalCart());
  const clearCart = useCartStore((state) => state.clearCart);
  const totalCartWithShipping = useCartStore((state) =>
    state.getTotalCartWithShipping()
  );
  const shippingValue = useCartStore((state) => state.shippingValue);
  const shippingMethod = useCartStore((state) => state.shippingMethod);
  const shippingEta = useCartStore((state) => state.shippingEta);
  const addressId = useCartStore((state) => state.addressId);

  //router
  const router = useRouter();

  //pathname
  const pathname = usePathname();

  //redireciona se carrinho estiver vazio
  if (itemsCart.length < 1) {
    return <></>;
  }

  async function handleFinishOrder() {
    if (pathname == "/pedido/identificacao") {
      if (!shippingMethod || !shippingEta || !addressId) {
        return;
      }

      try {
        setIsLoading(true);
        //criar o pedido no db
        const dataOrder = {
          subtotal: totalCart,
          shippingCost: shippingValue,
          shippingType: shippingMethod,
          shippingEta: shippingEta,
          total: totalCartWithShipping,
          addressId,
          userId: user!.id,
        };
        const order: TCreateOrderResponse = await createOrder(dataOrder);

        if (!order.success) {
          toast.error(order.message);
          return;
        }

        //se der certo a criacao do pedido(limpar o zustand tbm)
        clearCart();

        //pagamento
        //chama a function que cria o checkouSession do stripe
        if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
          throw new Error("Stripe public key não está definida");
        }

        //chama a action
        const checkoutSession: ICheckouSessionResponse =
          await createCheckoutSession(order.order.id);
        if (!checkoutSession?.success || !checkoutSession.url) {
          throw new Error("Nenhuma sessão stripe definida");
        }

        router.push(checkoutSession.url);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      router.push("/pedido/identificacao");
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <aside>
      <Card>
        <CardHeader>
          <CardTitle className=" border-b-2 p-2 text-center">
            RESUMO DA COMPRA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" space-y-2">
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
              <span className="mt-2">
                {formatBRL(totalCartWithShipping)}
              </span>{" "}
            </div>
          </div>
          {pathname == "/pedido/identificacao" && shippingValue == 0 ? (
            <Button
              disabled
              className="bg-green-600  mt-6 text-white rounded-lg cursor-pointer w-full flex gap-2 p-2 justify-center"
            >
              Selecione o método de envio
            </Button>
          ) : (
            <Button
              onClick={handleFinishOrder}
              className="bg-green-600 hover:bg-green-600 mt-6 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center"
            >
              {pathname == "/pedido/identificacao"
                ? "Continuar para pagamento"
                : "Continuar"}
            </Button>
          )}
        </CardContent>
      </Card>
    </aside>
  );
};
