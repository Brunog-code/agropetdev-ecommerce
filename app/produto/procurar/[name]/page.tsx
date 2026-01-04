import { ProductCard } from "@/app/(home)/_components/product-card";
import { IFullProduct } from "@/app/utils/types/product";

import { getProductSearch } from "./actions/get-product-search";

interface ISearchProps {
  params: {
    name: string;
  };
}

export default async function Search({ params }: ISearchProps) {
  const { name } = await params;

  //chamar sercer action para pegar os titulos
  const products: IFullProduct[] = await getProductSearch(name);

  return (
    <section>
      <h1 className="font-bold text-xl mt-8 mb-5">
        Veja o que encontramos na nossa base:{" "}
      </h1>
      {products.length < 1 && (
        <p className="">Nenhum produto encontrado, tente novamente</p>
      )}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map((prod) => (
          <ProductCard key={prod.product.id} prod={prod} />
        ))}
      </section>
    </section>
  );
}
