import { notFound } from "next/navigation";
import { getProductDetail } from "./actions/getProductDetail";
import Image from "next/image";
import { HiOutlineHome } from "react-icons/hi";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IProductProps {
  params: {
    categories: string;
    subcategory: string;
    productDetail: string;
  };
}

export default async function Product({ params }: IProductProps) {
  const resolveParams = await params;
  const slugCategory = resolveParams.categories;
  const slugSubCategory = resolveParams.subcategory;
  const slugProduct = resolveParams.productDetail;

  //context


  //zustand


  //chamar action
  const productData = await getProductDetail(slugProduct);

  if (!productData) {
    notFound();
  }

  return (
    <section className="w-full flex flex-col gap-8 ">
      <div>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <HiOutlineHome className="w-4 h-4" />
            </li>

            <li className="flex items-center gap-2">
              <span>›</span>
              <Link href={`/${slugCategory}`} className="hover:underline">
                {slugCategory}
              </Link>
            </li>

            <li className="flex items-center gap-2">
              <span>›</span>
              <Link
                href={`/${slugCategory}/${slugSubCategory}`}
                className="hover:underline"
              >
                {slugSubCategory}
              </Link>
            </li>

            <li className="flex items-center gap-2 font-semibold text-gray-900">
              <span>›</span>
              {productData.name}
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-evenly md:items-start w-full">
        <article className="w-full max-w-[300px] md:max-w-[380px]">
          <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={productData.image}
              alt={productData.name}
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </article>

        <article className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full md:w-fit">
          <h1 className="font-bold uppercase mt-6 text-xl">
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
          <Button
            className="bg-green-600 hover:bg-green-600 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center"
          >
            Comprar
          </Button>
        </article>
      </div>
      
    </section>
  );
}
