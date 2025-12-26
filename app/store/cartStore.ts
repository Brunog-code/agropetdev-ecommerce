import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  description: string;
  image: string;
  price: number;
  name: string;
  slug: string;
  stock: number;
  subcategoryId?: string;
  quantity: number;
};

type TShippingMethod = "PAC" | "SEDEX" | null;
type TShippingEta = number | null

interface ICartStore {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQty: (type: "increment" | "decrement", id: string) => void;
  getTotalCart: () => number;
  clearCart: () => void;
  mergeWithServer: (serveritens: CartItem[]) => void;

  shippingMethod: TShippingMethod;
  shippingValue: number;
  shippingEta: TShippingEta;
  setShipping: (method: TShippingMethod, value: number, eta: TShippingEta) => void;
  clearShipping: () => void;
  getTotalCartWithShipping: () => number;
}

export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      //states
      cart: [],
      shippingMethod: null,
      shippingValue: 0,
      shippingEta: null,
      //actions
      addToCart: (product) => {
        //verificar se o produto existe
        const existingProduct = get().cart.find(
          (item) => item.id === product.id
        );
        //--se existir add + 1 a quantity
        //--se nao exister add o produto
        if (existingProduct) {
          set({
            cart: get().cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...product }] });
        }
      },
      mergeWithServer: (serverItems) => {
        set(() => {
          const localItems = get().cart;
          const merged: CartItem[] = [...serverItems]; //começa com os itens do server

          localItems.forEach((localItem) => {
            //procura se tem algum item igual em ambos (db e local)
            const serverMatch = merged.find(
              (serverItem) => serverItem.id === localItem.id
            );
            if (serverMatch) {
              //se tiver, esse item vai ser adicionado a qtde do local
              serverMatch.quantity = Math.max(
                serverMatch.quantity,
                localItem.quantity
              );
            } else {
              merged.push(localItem); //se nao só add o item
            }
          });
          return { cart: merged };
        });
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id != id) });
      },
      updateQty: (type, id) => {
        //procura o item
        const item = get().cart.find((item) => item.id === id);

        if (!item) return;

        if (item.quantity == 1 && type === "decrement") {
          set({
            cart: get().cart.filter((item) => item.id != id),
            shippingMethod: null,
            shippingValue: 0,
          });
        } else {
          set({
            cart: get().cart.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity:
                      type === "decrement"
                        ? item.quantity - 1
                        : item.quantity + 1,
                  }
                : item
            ),
          });
        }
      },
      getTotalCart: () =>
        get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      clearCart: () => {
        set({ cart: [], shippingMethod: null, shippingValue: 0 });
      },
      setShipping: (method, value, eta) =>
        set({ shippingMethod: method, shippingValue: value, shippingEta: eta }),
      clearShipping: () =>
        set({
          shippingMethod: null,
          shippingValue: 0,
          shippingEta: null
        }),
      getTotalCartWithShipping: () =>
        get().getTotalCart() + get().shippingValue,
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }), // ← AQUI: só persiste o cart
    }
  )
);
