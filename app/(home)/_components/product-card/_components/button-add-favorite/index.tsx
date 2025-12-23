'use client'

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@/app/contexts/AuthCont";
import { IProduct } from "@/app/utils/types/product";

import { IProductCardProps } from "../..";
import { addFavorite } from "../../actions/favorite/addFavorite";
import { getUserFavorites } from "../../actions/favorite/getUserFavorites";
import { removeFavorite } from "../../actions/favorite/removeFavorite";

export const ButtonAddFavorite = ({ prod }: IProductCardProps) => {
  const [fillHeart, setFillHeart] = useState(false);

  //session
  const { session, user } = useAuth();

  //router
  const router = useRouter();

  //verifica se o product está adicionado aos favoritos
  const productId = prod.product.id;
  useEffect(() => {
    const getFavorite = async () => {
      if (!session || !user) return;

      const favorites = await getUserFavorites(user!.id);

      const isFavorite = favorites.some((fav) => fav.productId === productId);

      setFillHeart(isFavorite);
    };

    getFavorite();
  }, [session, user, productId]);

  //add aos favoritos
  async function handleAddFavorites(product: IProduct) {
    if (!session) {
      //SE NÃO ESTIVER LOGADO
      //redireciona para uma page informando que precisa estar logado
      router.push("/login-obrigatorio");
    } else {
      //SE ESTIVER LOGADO
      //se nao estiver salvo, salva no db
      const dataFavorite = {
        userId: user!.id,
        productId: product.id,
      };

      if (!fillHeart) {
        const responseAdd = await addFavorite(dataFavorite);

        //se salvou corretamente no db
        if (responseAdd.success) {
          toast.success("Item adicionado aos favoritos");
          setFillHeart(!fillHeart);
        } else {
          toast.error("Falha ao adicionar o item");
        }
      } else {
        //se estiver salvo, remove db
        const responseRemove = await removeFavorite(dataFavorite);

        if (responseRemove.success) {
          toast.success("Item removido dos favoritos");
          setFillHeart(!fillHeart);
        } else {
          toast.error("Falha ao remover o item");
        }
      }
    }
  }
  return (
    <button
      onClick={() => handleAddFavorites(prod.product)}
      className=" text-gray-500 rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-1 p-2 justify-center"
    >
      Favorito
      <Heart
        className={`w-6 h-6 hover:text-red-500 hover:fill-red-500 transition ${
          fillHeart ? "text-red-500 fill-red-500" : ""
        }`}
      />
    </button>
  );
};
