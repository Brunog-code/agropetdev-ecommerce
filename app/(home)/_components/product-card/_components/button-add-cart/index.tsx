"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@/app/contexts/AuthCont";
import { useCartStore } from "@/app/store/cartStore";
import { IFullProduct } from "@/app/utils/types/product";

import { updateItemQuantity } from "../../actions/add-item-cart";

interface IButtonAddCartProps {
  prod: IFullProduct;
  disabled: boolean;
}

export const ButtonAddCart = ({ prod, disabled }: IButtonAddCartProps) => {
  //zustand
  const addToCart = useCartStore((state) => state.addToCart);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const [isLoading, setIsLoading] = useState(false);

  const { session, user } = useAuth();

  async function handleAddToCart() {
    setIsLoading(true);
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
          setIsLoading(false);
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
      openDrawer();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={disabled || isLoading}
      onClick={handleAddToCart}
      className={` text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className=" h-4 w-4 animate-spin" />
          Adicionando...
        </>
      ) : (
        <>
          <ShoppingCart size={20} color="#fff" />
          Comprar
        </>
      )}
    </button>
  );
};
