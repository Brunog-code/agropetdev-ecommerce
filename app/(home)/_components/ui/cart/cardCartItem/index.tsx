"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

import { useAuth } from "@/app/contexts/AuthCont";
import { CartItem } from "@/app/store/cartStore";
import { useCartStore } from "@/app/store/cartStore";

import { updateItemQuantity } from "../../../productCard/actions/cart/addItemCart";
import { removeItemFromCart } from "./actions/removeItemFromCart";

interface ICardCartItemProps {
  itemCart: CartItem;
}

type ThandleUpdateQuatityCart = "increment" | "decrement";

export const CardCartItem = ({ itemCart }: ICardCartItemProps) => {
  //context
  const { session, user } = useAuth();

  //zustand
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQty = useCartStore((state) => state.updateQty);

  //atualiza quantidade (add e remove)
  async function handleUpdateQuatityCart(type: ThandleUpdateQuatityCart) {
    if (session) {
      //se type for decrement e item for 1, em vez de update, remover
      if (type === "decrement" && itemCart.quantity == 1) {
        const dataDeleteItem = {
          userId: user!.id,
          productId: itemCart.id,
        };
        const response = await removeItemFromCart(dataDeleteItem);

        if (!response.success) {
          toast.error("Erro ao modificar o carrinho");
          return;
        }
      } else {
        const dataCart = {
          cartProduct: itemCart,
          userId: user!.id,
          type: type,
        };
        const response = await updateItemQuantity(dataCart); //db

        if (!response.success) {
          toast.error("Erro ao modificar o carrinho");
          return;
        }
      }
    }

    //se nao só altera o zustand
    updateQty(type, itemCart.id); //zustand
  }

  //deletar quantidade
  async function handleDeleteItemCart() {
    if (session) {
      const dataDeleteItem = {
        userId: user!.id,
        productId: itemCart.id,
      };
      const response = await removeItemFromCart(dataDeleteItem);

      if (!response.success) {
        toast.error("Erro ao deletar o item do carrinho");
        return;
      }
    }

    removeFromCart(itemCart.id); //zustand
  }

  return (
    <div className="w-full flex gap-2 relative">
      <div>
        <Image
          src={itemCart.image}
          alt={itemCart.name}
          width={100}
          height={100}
          className="border border-gray-200 rounded-md p-2"
        />
      </div>

      <div className="flex flex-col space-y-4 w-full">
        <p className="font-semibold text-gray-800">{itemCart.name}</p>

        <div className="flex justify-around items-end gap-4 w-full">
          <div className="flex gap-6 border rounded-lg p-1">
            <button
              className="text-xl font-semibold text-gray-600 cursor-pointer"
              onClick={() => handleUpdateQuatityCart("decrement")}
            >
              <MinusIcon />
            </button>
            <span className="text-gray-600">{itemCart.quantity}</span>
            <button
              className="text-xl font-semibold text-gray-600  cursor-pointer"
              onClick={() => handleUpdateQuatityCart("increment")}
            >
              <PlusIcon />
            </button>
          </div>

          <span className="font-semibold">
            {itemCart.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>

      <button
        onClick={handleDeleteItemCart}
        className="absolute right-0 -top-6 cursor-pointer"
      >
        <span className="font-bold text-gray-500">x</span>
      </button>
    </div>
  );
};
