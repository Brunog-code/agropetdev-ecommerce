import { CartItem } from "@/app/store/cartStore";
import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";

interface ICardCartItemProps {
  itemCart: CartItem;
}

export const CardCartItem = ({ itemCart }: ICardCartItemProps) => {
  //zustand
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQty = useCartStore((state) => state.updateQty);

  return (
    <div className="w-full flex gap-2 relative">
      <div>
        <Image
          src={itemCart.image}
          alt={itemCart.name}
          width={90}
          height={90}
          className="border border-gray-200 rounded-md p-2"
        />
      </div>

      <div className="flex flex-col space-y-4 w-full">
        <p className="font-semibold text-gray-800">{itemCart.name}</p>

        <div className="flex justify-around items-end gap-4 w-full">
          <div className="flex gap-6 border rounded-lg p-1">
            <button className="text-xl font-semibold text-gray-600 cursor-pointer" onClick={() => updateQty('decrement', itemCart.id)}>
              -
            </button>
            <span className="text-gray-600">{itemCart.quantity}</span>
            <button className="text-xl font-semibold text-gray-600  cursor-pointer" onClick={() => updateQty('increment', itemCart.id)}>
              +
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
        onClick={() => removeFromCart(itemCart.id)}
        className="absolute right-0 -top-6 cursor-pointer"
      >
        <span className="font-bold text-gray-500">x</span>
      </button>
    </div>
  );
};
