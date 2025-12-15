"use client";

import { CartItem, useCartStore } from "@/app/store/cartStore";

type CartResponse = {
  items: CartItem[];
};

export function useLoginCartSync() {
  const mergeWithServer = useCartStore((state) => state.mergeWithServer);

  const handleLoginSyncLocalDb = async (userId: string) => {
    //buscar carrinho no db
    try {
      const response = await fetch(`/api/cart?userId=${userId}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) return null;

      const dataResponse: CartResponse = await response.json();

      //mescla local com servidor
      mergeWithServer(dataResponse.items);

      //envia o carrinho mesclado pro db
      //aqui pega o cart do zustand ja mesclado acima

      await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          userId,
          currentItems: useCartStore.getState().cart,
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.error("Erro ao sincronizar carrinho ", error);
    }
  };

  return { handleLoginSyncLocalDb };
}
