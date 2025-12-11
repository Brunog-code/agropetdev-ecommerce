"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { CardCartItem } from "./cardCartItem";
import { Button } from "@/components/ui/button";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  //cart
  const itemsCart = useCartStore((state) => state.cart);
  const quantityItemsCart = useCartStore((state) => state.cart.length);
  const totalCart = useCartStore((state) => state.getTotalCart);

  //state
  const [isMobile, setIsmobile] = useState(false);

  //verifica se é mobile
  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 640) {
        setIsmobile(true);
      } else {
        setIsmobile(false);
      }
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <Sheet>
      {/* Trigger */}
      {children}

      <SheetContent
        side="right"
        className={`${isMobile ? "w-full" : "w-100"} overflow-auto`}
      >
        <SheetHeader className="mt-10 border-b-2 flex flex-col items-center w-full">
          <SheetTitle>MEU CARRINHO</SheetTitle>

          <span className="text-sm">
            Quantidade de itens:{" "}
            <span className="text-center w-full">{quantityItemsCart}</span>
          </span>
        </SheetHeader>

        <div className="p-4 space-y-4">
          {itemsCart.map((item) => (
            <div key={item.id} className="flex flex-col border-b p-2">
              <CardCartItem itemCart={item} />
            </div>
          ))}

          {quantityItemsCart > 0 && (
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {" "}
                    {totalCart().toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Descontos</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>454</span>
                </div>
              </div>

              <Button className="bg-green-600 text-white rounded-lg transition-all duration-200 hover:opacity-85 hover:bg-green-600 cursor-pointer w-full flex gap-2 p-2 justify-center mx-auto">
                FINALIZAR PEDIDO
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
