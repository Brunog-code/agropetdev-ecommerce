"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { IFullProduct } from "../../actions/getProducts";
import Link from "next/link";
import { useState } from "react";

interface IProductCardProps {
  prod: IFullProduct;
}

interface IProductFavorite {
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

  //add aos favoritos
  function handleAddFavorites(product: IProductFavorite) {
    console.log(product);
    setFillHeart(!fillHeart);

    //adicionar ao localStorage
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
          <button className="bg-green-600 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center">
            Comprar
            <ShoppingCart size={20} color="#fff" />
          </button>
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
