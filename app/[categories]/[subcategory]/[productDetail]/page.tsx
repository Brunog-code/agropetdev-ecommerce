import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineHome } from "react-icons/hi";

import { CardProductDetail } from "./_components/cardProductDetail";
import { getProductDetail } from "./actions/get-product-detail/index.ts";

interface IProductProps {
  params: {
    categories: string;
    subcategory: string;
    productDetail: string;
  };
}

//metadata
export async function generateMetadata({
  params,
}: IProductProps): Promise<Metadata> {
  const resolveParams = await params;
  const slugProduct = resolveParams.productDetail;
  const productData = await getProductDetail(slugProduct);

  if (!productData) {
    return {
      title: "Produto não encontrado",
      description: "O produto que você procura não está disponível",
    };
  }

  return {
    title: `${productData.name} -  | AgropetDev`,
    description: productData.description,
    keywords: [productData.name, "agropecuaria", "pets"],
  };
}

export default async function Product({ params }: IProductProps) {
  const resolveParams = await params;
  const slugCategory = resolveParams.categories;
  const slugSubCategory = resolveParams.subcategory;
  const slugProduct = resolveParams.productDetail;

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

      <CardProductDetail productData={productData} />
    </section>
  );
}
