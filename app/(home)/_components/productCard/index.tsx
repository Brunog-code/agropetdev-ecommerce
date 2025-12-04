"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { FullProduct } from "../../actions/getProducts";
import Link from "next/link";

interface IProductCardProps {
  prod: FullProduct;
}

export const ProductCard = (prod: IProductCardProps) => {
  return (
    <div className="w-full shadow-md flex flex-col justify-between items-center bg-white rounded-lg p-2 border-1 border-green-400">
      <Image
        className="max-h-70 w-full rounded-lg"
        src={prod.prod.product.image}
        width={70}
        height={70}
        alt="foto racao"
      />

      <p className="font-medium text-lg mt-1">{prod.prod.product.name}</p>
      <small className="">
        <Link
          href={`/${prod.prod.category.slug}/${prod.prod.subcategory.slug}`}
        >
          {prod.prod.subcategory.name}
        </Link>
      </small>

      <div className="flex flex-col gap-4 items-center mt-4 w-full">
        <span className="font-bold text-2xl">
          {prod.prod.product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <div className="w-full flex flex-col gap-2">
          <button className="bg-green-600 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center">
            Comprar
            <ShoppingCart size={20} color="#fff" />
          </button>
          <button className=" text-gray-500 rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center">
            Favorito
            <Heart className="w-6 h-6 hover:text-red-500 hover:fill-red-500 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};
