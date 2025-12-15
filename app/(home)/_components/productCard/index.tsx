"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { IFullProduct } from "../../actions/getProducts";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/app/contexts/AuthCont";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { addFavorite } from "./actions/favorite/addFavorite";
import { removeFavorite } from "./actions/favorite/removeFavorite";
import { getUserFavorites } from "./actions/favorite/getUserFavorites";
import { useCartStore } from "@/app/store/cartStore";
import { CartDrawer } from "../ui/cart/drawer-cart";
import { SheetTrigger } from "@/components/ui/sheet";
import { updateItemQuantity } from "./actions/cart/addItemCart";

interface IProductCardProps {
  prod: IFullProduct;
}

export interface IProductFavorite {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  subcategoryId?: string;
}

export const ProductCard = ({ prod }: IProductCardProps) => {
  const [fillHeart, setFillHeart] = useState(false);

  //zustand
  const addToCart = useCartStore((state) => state.addToCart);

  //router
  const router = useRouter();

  const { session, user } = useAuth();

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
  async function handleAddFavorites(product: IProductFavorite) {
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

  async function handleAddToCart() {
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full shadow-md flex flex-col justify-between items-center bg-white rounded-lg p-2 border border-green-400">
      <div className="flex flex-col justify-between flex-1">
        <Link
          href={`/${prod?.category?.slug}/${prod?.subcategory?.slug}/${prod.product.slug}`}
        >
          <Image
            className="max-h-70 w-full rounded-lg"
            src={prod.product.image}
            width={70}
            height={70}
            alt="foto racao"
          />
        </Link>

        <p className="font-medium text-lg mt-1">{prod.product.name}</p>
      </div>

      <div className="flex flex-col gap-4 items-center mt-4 w-full">
        <small className="">
          <Link href={`/${prod?.category?.slug}/${prod?.subcategory?.slug}`}>
            {prod?.subcategory?.name}
          </Link>
        </small>

        <span className="font-bold text-2xl">
          {prod.product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <div className="w-full flex flex-col gap-2">
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
        </div>
      </div>
    </div>
  );
};
