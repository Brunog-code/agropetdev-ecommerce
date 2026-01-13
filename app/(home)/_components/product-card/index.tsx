import Link from "next/link";

import { formatBRL } from "@/app/utils/helpers/formatBRL";
import { IFullProduct } from "@/app/utils/types/product";

import { ButtonAddCart } from "./_components/button-add-cart";
import { ButtonAddFavorite } from "./_components/button-add-favorite";
import { ImageProductCard } from "./_components/image-product-card";

export interface IProductCardProps {
  prod: IFullProduct;
}

export const ProductCard = async ({ prod }: IProductCardProps) => {
  return (
    <div className="w-full shadow-md flex flex-col justify-between items-center bg-white rounded-lg p-2 border border-green-400">
      <div className="flex flex-col justify-between flex-1 w-full relative">
        <ImageProductCard
          src={prod.product.image}
          alt={prod.product.name}
          categorySlug={prod?.category?.slug}
          subcategorySlug={prod?.subcategory?.slug}
          produtcSlug={prod.product.slug}
        />
        {prod.product.stock <= 0 && (
          <p className="absolute right-0 top-10 text-red-500 font-bold text-xl rotate-45">
            Indisponível
          </p>
        )}
        <p className="text-sm font-bold px-2 text-black  truncate text-center">
          {prod.product.name}
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center mt-4 w-full">
        <small className="">
          <Link href={`/${prod?.category?.slug}/${prod?.subcategory?.slug}`}>
            {prod?.subcategory?.name}
          </Link>
        </small>

        <span className="font-bold text-2xl">
          {formatBRL(prod.product.price)}
        </span>

        {/* Botoes */}
        <div className="w-full flex flex-col gap-2">
          <ButtonAddCart
            product={prod.product}
            disabled={prod.product.stock <= 0}
          />

          <ButtonAddFavorite prod={prod} />
        </div>
      </div>
    </div>
  );
};
