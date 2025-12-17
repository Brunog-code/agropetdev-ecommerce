"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { CardCartItem } from "./cardCartItem";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "@/app/contexts/AuthCont";
import { clearCartDb } from "./actions/clearCartDb";
import toast from "react-hot-toast";
import Link from "next/link";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  //cart
  const itemsCart = useCartStore((state) => state.cart);
  const quantityItemsCart = useCartStore((state) => state.cart.length);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalCart = useCartStore((state) => state.getTotalCart);

  //context
  const { session, user } = useAuth();

  //state
  const [isMobile, setIsmobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  async function clearCartLocalAndDb() {
    //db
    if (session) {
      const reponse = await clearCartDb(user!.id);

      if (!reponse.success) {
        toast.error("Erro ao apagar os itens do carrinho");
        return;
      }
    }

    clearCart(); //zustand
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger */}
      <SheetTrigger asChild>{children}</SheetTrigger>

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
            <div className="w-full flex justify-end">
              <button
                onClick={() => clearCartLocalAndDb()}
                className="flex gap-1 justify-center items-center bg-red-400 hover:opacity-85 text-white rounded-lg p-2 cursor-pointer"
              >
                <FaTrash size={16} color="#fff" />
                limpar
              </button>
            </div>
          )}

          {quantityItemsCart > 0 && (
            <div className="flex flex-col gap-4 mt-8 font-medium">
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
              </div>

              <Link href="/checkout/cart">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-green-600 text-white rounded-lg transition-all duration-200 hover:opacity-85 hover:bg-green-600 cursor-pointer w-full flex gap-2 p-2 justify-center mx-auto"
                >
                  FINALIZAR PEDIDO
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
