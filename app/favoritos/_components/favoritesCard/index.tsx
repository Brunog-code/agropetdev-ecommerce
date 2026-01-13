"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { ButtonAddCart } from "@/app/(home)/_components/product-card/_components/button-add-cart";
import { removeFavorite } from "@/app/(home)/_components/product-card/actions/favorite/removeFavorite";
import { useAuth } from "@/app/contexts/AuthCont";
import { IProduct } from "@/app/utils/types/product";

interface IFavoritesCardProps {
  product: IProduct;
}

export const FavoritesCard = ({ product }: IFavoritesCardProps) => {
  //context
  const { user } = useAuth();

  //router
  const router = useRouter();

  async function handleDeleteFavorite() {
    const dataDelete = {
      userId: user!.id,
      productId: product.id,
    };

    const responseRemove = await removeFavorite(dataDelete);

    if (responseRemove.success) {
      toast.success("Item removido dos favoritos");
      router.refresh();
    } else {
      toast.error("Falha ao remover o item");
    }
  }

  return (
    <div className="w-full md:w-[70%] lg:w-1/2 mx-auto bg-white flex rounded-lg border border-green-400 gap-4 p-2 justify-between">
      <div className="flex">
        <Image
          src={product.image}
          alt="racao"
          className="max-w-30 object-contain  p-2"
          width={90}
          height={90}
        />
        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">{product.name}</p>
          <p>{product.description}</p>
          <p className="font-semibold">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <ButtonAddCart
            product={product}
            disabled={product.stock <= 0}
          />
        </div>
      </div>

      <div
        className="items-center flex flex-col justify-center gap-1 cursor-pointer"
        onClick={handleDeleteFavorite}
      >
        <Heart className="w-6 h-6 text-red-500 fill-red-500 transition" />
        <span className="font-medium">Remover</span>
      </div>
    </div>
  );
};
