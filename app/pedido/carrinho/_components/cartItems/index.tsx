"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { updateItemQuantity } from "@/app/(home)/_components/product-card/actions/add-item-cart";
import { removeItemFromCart } from "@/app/(home)/_components/ui/cart/cardCartItem/actions/removeItemFromCart";
import { useAuth } from "@/app/contexts/AuthCont";
import { useCartStore } from "@/app/store/cartStore";
import { CartItem } from "@/app/store/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ThandleUpdateQuatityCart = "increment" | "decrement";

interface IhandleUpdateQuatityCartProps {
  type: ThandleUpdateQuatityCart;
  cartProduct: CartItem;
}

export const CartItems = () => {
  //zustand
  const itemsCart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQty = useCartStore((state) => state.updateQty);

  //context
  const { session, user } = useAuth();

  async function handleUpdateQuatityCart({
    type,
    cartProduct,
  }: IhandleUpdateQuatityCartProps) {
    if (session) {
      //se type for decrement e item for 1, em vez de update, remover
      if (type == "decrement" && cartProduct.quantity == 1) {
        const dataDeleteItem = {
          userId: user!.id,
          productId: cartProduct.id,
        };

        const response = await removeItemFromCart(dataDeleteItem);

        if (!response.success) {
          toast.error("Erro ao modificar o carrinho");
          return;
        }
      } else {
        const dataCart = {
          cartProduct: cartProduct,
          userId: user!.id,
          type,
        };
        const response = await updateItemQuantity(dataCart);

        if (!response.success) {
          toast.error("Erro ao modificar o carrinho");
          return;
        }
      }
    }
    //zustand
    updateQty(type, cartProduct.id);
  }

  async function handleDeleteItemCart(id: string) {
    if (session) {
      const dataDeleteitem = {
        userId: user!.id,
        productId: id,
      };
      const response = await removeItemFromCart(dataDeleteitem);

      if (!response.success) {
        toast.error("Erro ao deletar o item do carrinho");
        return;
      }
    }
    //zustand
    removeFromCart(id);
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="border-b-2 p-2">PRODUTOS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {itemsCart.length > 0 ? (
            <>
              {itemsCart.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex gap-4 p-2 justify-between relative ${
                    index === itemsCart.length - 1 ? "" : "border-b-2"
                  } `}
                >
                  <div className="flex gap-2">
                    <div className="relative min-w-[72px] min-h-[72px] w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 border-2 rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 80px, 96px"
                        className="object-contain rounded-lg  p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold text-[#3a7d44]">
                        {item.name}
                      </p>
                      <p className="text-sm mt-2">{item.description}</p>
                      <div className="mt-4">
                        <p className="font-medium ">
                          {item.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 justify-end items-center">
                    <div className="flex gap-6 border rounded-lg p-1 h-fit">
                      <button
                        className="text-xl font-semibold text-gray-600 cursor-pointer"
                        onClick={() =>
                          handleUpdateQuatityCart({
                            type: "decrement",
                            cartProduct: item,
                          })
                        }
                      >
                        <MinusIcon />
                      </button>
                      <span className="text-gray-600">{item.quantity}</span>
                      <button
                        className="text-xl font-semibold text-gray-600  cursor-pointer"
                        onClick={() =>
                          handleUpdateQuatityCart({
                            type: "increment",
                            cartProduct: item,
                          })
                        }
                      >
                        <PlusIcon />
                      </button>
                    </div>
                    <p className="font-semibold">
                      {(item.quantity * item.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteItemCart(item.id)}
                    className="absolute right-3 -top-3 cursor-pointer text-lg"
                  >
                    <span className="font-bold text-gray-500">x</span>
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p className="text-2xl font-bold flex items-center justify-center gap-2">
              <AiOutlineShoppingCart size={50} color="#3a7d44" />
              Nenhum item no carrinho
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
