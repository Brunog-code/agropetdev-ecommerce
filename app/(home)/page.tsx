import { FiltersCategory } from "./_components/filtersCategory";
import { BannerSwiper } from "./_components/lib/swiper/banner";
import { PartnersSwiper } from "./_components/lib/swiper/partners";
import { ProductCard } from "./_components/productCard";
import { getProducts } from "./actions/getProducts";

export default async function Home() {
  const products = await getProducts();

  //tratr o skeleton

  return (
    <main className="w-full flex flex-col gap-10">
      <section className="mb-6">
        <BannerSwiper />
      </section>

      <section className="mb-4">
        <h1 className="font-bold text-green-800 text-center text-2xl">
          PRINCIPAIS CATEGORIAS
        </h1>
        <FiltersCategory />
      </section>

      <section className="flex flex-col gap-6">
        <h1 className="font-bold text-green-800  text-2xl">
          PRODUTOS EM DESTAQUE
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((prod) => (
            <ProductCard key={prod.product.id} prod={prod} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h1 className="font-bold text-green-800  text-2xl">Nossos parceiros</h1>
        <PartnersSwiper />
      </section>
    </main>
  );
}
