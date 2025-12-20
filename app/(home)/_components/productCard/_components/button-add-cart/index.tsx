'use client'


import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "@/app/contexts/AuthCont";
import { useCartStore } from "@/app/store/cartStore";
import { SheetTrigger } from "@/components/ui/sheet";

import { CartDrawer } from "../../../ui/cart/drawer-cart";
import { IProductCardProps } from "../..";
import { updateItemQuantity } from "../../actions/cart/addItemCart";

export const ButtonAddCart = ({ prod }: IProductCardProps) => {
  //zustand
  const addToCart = useCartStore((state) => state.addToCart);

  const { session, user } = useAuth();

  async function handleAddToCart() {
    try {
      //Usuário logado → alem de salvar no localStorage, chamar API para salvar no DB (sincronizar ambos)
      if (session) {
        //salvar no banco
        const dataCart = {
          cartProduct: prod.product,
          userId: user!.id,
        };

        const result = await updateItemQuantity(dataCart);

        if (!result?.success) {
          toast.error("Erro ao adicionar ao carrinho");
          return;
        }
      }

      //salva no Zustand (persist salva no localStorage) se der certo o db
      const productCart = {
        ...prod.product,
        quantity: 1,
      };
      addToCart(productCart);
      toast.success("Adicionado ao carrinho!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CartDrawer>
      <SheetTrigger asChild>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center"
        >
          Comprar
          <ShoppingCart size={20} color="#fff" />
        </button>
      </SheetTrigger>
    </CartDrawer>
  );
};
