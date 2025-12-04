import { CardSubcategory } from "./_components/CardSubcategory";
import { getCategoriesAndSubTotal } from "./actions/getCategoriesAndSubTotal";

import dogBanner from "@/app/assets/dog-categorypage-banner.webp";
import catBanner from "@/app/assets/cat-categorypage-banner.png";
import birdBanner from "@/app/assets/bird-categorypage-banner.png";
import poolBanner from "@/app/assets/pool-categorypage-banner.webp";
import gardenBanner from "@/app/assets/garden-categorypage-banner.png";

import Image from "next/image";

interface ICategoriasProps {
  params: {
    categorias: string;
  };
}

export default async function Categories({ params }: ICategoriasProps) {
  const resolveParams = await params;

  //buscar slug no banco
  const categories = await getCategoriesAndSubTotal(resolveParams.categorias);
  const subcategories = categories[0].subcategories;

  console.log(resolveParams);

  return (
    <section className="w-full flex flex-col gap-5 items-center">
      <h1 className="font-bold text-green-800  text-2xl">
        {resolveParams.categorias === "cachorros"
          ? "CACHORROS"
          : resolveParams.categorias === "aves"
          ? "AVES"
          : resolveParams.categorias === "piscina"
          ? "PISCINA"
          : resolveParams.categorias === "jardim"
          ? "JARDIM"
          : "GATOS"}
      </h1>
      <h2 className="font-semibold">
        {resolveParams.categorias === "cachorros"
          ? "Encontre os melhores itens para seu amigo peludo aqui!"
          : resolveParams.categorias === "aves"
          ? "Encontre os melhores itens para seu passarinho aqui!"
          : resolveParams.categorias === "piscina"
          ? "Encontre os melhores itens para sua piscina aqui!"
          : resolveParams.categorias === "jardim"
          ? "Encontre os melhores itens para seu jardim aqui!"
          : "Encontre os melhores itens para seu gatinho aqui!"}
      </h2>

      <div
        className={`h-48 mb-5 md:mb-7 rounded-lg flex items-center justify-between w-full md:w-[80%] lg:w-[65%] ${
          resolveParams.categorias === "cachorros"
            ? "bg-gradient-to-r  from-sky-400 via-sky-600 to-sky-400"
            : resolveParams.categorias === "aves"
            ? "bg-gradient-to-r  from-yellow-400 via-yellow-600 to-yellow-400"
            : resolveParams.categorias === "piscina"
            ? "bg-gradient-to-r  from-cyan-400 via-cyan-600 to-cyan-400"
            : resolveParams.categorias === "jardim"
            ? "bg-gradient-to-r  from-rose-600 via-rose-800 to-rose-600"
            : "bg-gradient-to-r  from-fuchsia-400 via-fuchsia-600 to-fuchsia-400"
        }`}
      >
        <Image
          src={
            resolveParams.categorias === "cachorros"
              ? dogBanner
              : resolveParams.categorias === "aves"
              ? birdBanner
              : resolveParams.categorias === "piscina"
              ? poolBanner
              : resolveParams.categorias === "jardim"
              ? gardenBanner
              : catBanner
          }
          alt={
            resolveParams.categorias === "cachorros"
              ? "Imagem cachorro"
              : resolveParams.categorias === "aves"
              ? "Imagem passaro"
              : resolveParams.categorias === "piscina"
              ? "Imagem piscina"
              : "Imagem gato"
          }
          width={
            resolveParams.categorias === "cachorros"
              ? 500
              : resolveParams.categorias === "piscina"
              ? 300
              : resolveParams.categorias === "jardim"
              ? 300
              : 350
          }
          className="object-contain p-4"
        />
        {resolveParams.categorias === "cachorros" ? (
          <span className="text-white text-3xl  mr-2 ">
            Tudo o que seu <span className="font-bold">doguinho</span> precisa
          </span>
        ) : resolveParams.categorias === "aves" ? (
          <span className="text-white text-3xl  mr-2 ">
            Tudo o que seu <span className="font-bold">passarinho</span> precisa
          </span>
        ) : resolveParams.categorias === "piscina" ? (
          <span className="text-white text-3xl  mr-2 ">
            Tudo para <span className="font-bold">sua</span> piscina
          </span>
        ) : resolveParams.categorias === "jardim" ? (
          <span className="text-white text-3xl  mr-2 ">
            Tudo para o <span className="font-bold">seu</span> jardim
          </span>
        ) : (
          <span className="text-white text-3xl  mr-2 ">
          Tudo o que seu <span className="font-bold">felino</span> precisa
        </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 mx-auto gap-10 bg-white rounded-lg shadow-lg p-4">
        {subcategories.map((sub) => (
          <div key={sub.id}>
            <CardSubcategory
              img={sub.img!}
              name={sub.name}
              slug={sub.slug}
              resolveParams={resolveParams.categorias}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
