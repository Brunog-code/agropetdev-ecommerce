"use client";

import ImgTeste from "@/app/assets/gato-titulo.png";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export const ProductCard = () => {
  return (
    <div className="w-full shadow-md flex flex-col justify-center items-center bg-white rounded-lg p-2 border-1 border-green-400">
      <Image
        className="max-h-70 w-full rounded-lg"
        src={ImgTeste}
        alt="foto racao"
      />

      <p className="font-medium text-lg mt-1">Racao golden</p>
      <small className="">racoes</small>

      <div className="flex flex-col gap-4 items-center mt-4 w-full">
        <span className="font-bold text-2xl">R$ 25,79</span>

        <button className="bg-green-600 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center">
          Comprar
          <ShoppingCart size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
};
