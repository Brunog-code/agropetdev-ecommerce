import { BannerSwiper } from "./components/lib/swiper/banner";
import { FiltersCategory } from "./components/filtersCategory";
import { ProductCard } from "./components/productCard";

export default function Home() {
  return (
    <main className="w-full">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <ProductCard />
        </div>
      </section>
    </main>
  );
}
