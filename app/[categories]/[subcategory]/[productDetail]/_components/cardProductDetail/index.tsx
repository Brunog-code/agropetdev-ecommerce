"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ButtonAddCart } from "@/app/(home)/_components/product-card/_components/button-add-cart";
import { IProduct } from "@/app/utils/types/product";

interface TProductDataProps {
  productData: IProduct;
}

export const CardProductDetail = ({ productData }: TProductDataProps) => {
  const [loadingImage, setLoadingImage] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-evenly md:items-start w-full">
      <article className="w-full max-w-[300px] md:max-w-[380px]">
        <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
          {loadingImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin text-green-600" />
            </div>
          )}
          <Image
            src={productData.image}
            alt={productData.name}
            fill
            className="object-contain p-4"
            priority
            onLoad={() => setLoadingImage(false)}
          />
        </div>
      </article>

      <article className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full md:w-1/2">
        <h1 className="font-bold uppercase mt-6 text-xl text-[#3a7d44]">
          {productData.name}
        </h1>
        <p>{productData.description}</p>
        <div className="flex justify-start mt-6">
          <p className="text-lg font-bold">
            {productData.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <ButtonAddCart
          product={productData}
          disabled={productData.stock <= 0}
        />
      </article>
    </div>
  );
};
