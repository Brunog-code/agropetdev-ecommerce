import { notFound } from "next/navigation";

import { ProductCard } from "@/app/(home)/_components/product-card";

import { getProductsFromSlug } from "./actions/get-products-from-slug";

interface ISubCategoriasProps {
  params: {
    categories: string;
    subcategory: string;
  };
}

export default async function SubCategorias({ params }: ISubCategoriasProps) {
  const resolveParams = await params;

  const category = resolveParams.categories;
  const subcategory = resolveParams.subcategory;

  const dataproducts = await getProductsFromSlug({
    slugCategory: category,
    slugSubcategory: subcategory,
  });

  if (dataproducts.length < 1) {
    return notFound();
  }

  //procurar o name através do slug e depois pega o nome
  const foundSubcategoryName = dataproducts.find(
    (p) => p.subcategory?.slug === subcategory
  );
  const subcategoryName = foundSubcategoryName?.subcategory?.name ?? "";

  return (
    <section className="flex flex-col gap-4 mt-4">
      <h1 className="font-bold text-green-800  text-2xl">{subcategoryName}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mx-auto w-full">
        {dataproducts.map((prod) => (
          <ProductCard prod={prod} key={prod.product.id} />
        ))}
      </div>
    </section>
  );
}
