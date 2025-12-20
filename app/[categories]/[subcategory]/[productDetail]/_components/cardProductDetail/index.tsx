"use client";

import { useAuth } from "@/app/contexts/AuthCont";
import { useCartStore } from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { updateItemQuantity } from "@/app/(home)/_components/productCard/actions/cart/addItemCart";
import toast from "react-hot-toast";
import { CartDrawer } from "@/app/(home)/_components/ui/cart/drawer-cart";
import { SheetTrigger } from "@/components/ui/sheet";
import { IProduct } from "@/app/utils/types/product";
interface TProductDataProps {
  productData: IProduct;
}

export const CardProductDetail = ({ productData }: TProductDataProps) => {
  //context
  const { session, user } = useAuth();

  //zustand
  const addToCart = useCartStore((state) => state.addToCart);

  async function handleAddToCart() {
    try {
      //Usuário logado → alem de salvar no localStorage, chamar API para salvar no DB (sincronizar ambos)
      if (session) {
        const dataCart = {
          cartProduct: productData,
          userId: user!.id,
        };

        const result = await updateItemQuantity(dataCart);

        if (!result.success) {
          toast.error("Erro ao adicionar ao carrinho");
          return;
        }
      }

      //salva no Zustand (persist salva no localStorage) se der certo o db
      const productCart = {
        ...productData,
        quantity: 1,
      };

      addToCart(productCart);
      toast.success("Adicionado ao carrinho!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-evenly md:items-start w-full">
      <article className="w-full max-w-[300px] md:max-w-[380px]">
        <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
          <Image
            src={productData.image}
            alt={productData.name}
            fill
            className="object-contain p-4"
            priority
          />
        </div>
      </article>

      <article className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full md:w-1/2">
        <h1 className="font-bold uppercase mt-6 text-xl text-[#3a7d44]">
          {productData.name}
        </h1>
        <p>{productData.description}</p>
        <div className="flex justify-start mt-6">
          <p className="text-lg font-bold">
            {productData.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <CartDrawer>
          <SheetTrigger asChild>
            <Button
              className="bg-green-600 hover:bg-green-600 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center"
              onClick={handleAddToCart}
            >
              Comprar
            </Button>
          </SheetTrigger>
        </CartDrawer>
      </article>
    </div>
  );
};
