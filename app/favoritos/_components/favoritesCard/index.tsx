"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

import { removeFavorite } from "@/app/(home)/_components/productCard/actions/favorite/removeFavorite";
import { useAuth } from "@/app/contexts/AuthCont";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { updateItemQuantity } from "@/app/(home)/_components/productCard/actions/cart/addItemCart";
import { useCartStore } from "@/app/store/cartStore";
import { CartDrawer } from "@/app/(home)/_components/ui/cart/drawer-cart";
import { SheetTrigger } from "@/components/ui/sheet";

interface IProductData {
  id: string;
  description: string;
  image: string;
  price: number;
  name: string;
  slug: string;
  stock: number;
  subcategoryId?: string;
}

interface IFavoritesCardProps {
  product: IProductData;
}

export const FavoritesCard = ({ product }: IFavoritesCardProps) => {
  //context
  const { user } = useAuth();

  //store
  const addToCart = useCartStore((state) => state.addToCart);

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

  async function handleAddToCart() {
    try {
      //salvar no db
      const dataCart = {
        cartProduct: product,
        userId: user!.id,
      };

      const result = await updateItemQuantity(dataCart);

      if (!result?.success) {
        toast.error("Erro ao adicionar ao carrinho");
        return;
      }

      //salvar no zustand
      const productCart = {
        ...product,
        quantity: 1,
      };
      addToCart(productCart);
      toast.success("Adicionado ao carrinho!");
    } catch (error) {
      console.error(error);
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
