import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import birdBanner from "@/app/assets/bird-categorypage-banner.png";
import catBanner from "@/app/assets/cat-categorypage-banner.png";
import dogBanner from "@/app/assets/dog-categorypage-banner.webp";
import gardenBanner from "@/app/assets/garden-categorypage-banner.png";
import poolBanner from "@/app/assets/pool-categorypage-banner.webp";

import { CardSubcategory } from "./_components/CardSubcategory";
import { getCategoriesAndSubcategories } from "./actions/get-categories-and-subcategories";

interface ICategoriasProps {
  params: {
    categories: string;
  };
}

//metada dinamica
export async function generateMetadata({
  params,
}: ICategoriasProps): Promise<Metadata> {
  const { categories } = await params;

  const label = categories.charAt(0).toUpperCase() + categories.slice(1);

  return {
    title: `AgropetDev - ${label}`,
    description: `Produtos da categoria ${label}`,
  };
}

export default async function Categories({ params }: ICategoriasProps) {
  const resolveParams = await params;

  //buscar slug no banco
  const categories = await getCategoriesAndSubcategories(
    resolveParams.categories
  );

  //usuario digitou na url categoria que nao existe
  if (categories.length < 1) {
    return notFound();
  }

  const subcategories = categories[0].subcategories;

  return (
    <section className="w-full flex flex-col gap-5 items-center mt-4">
      <h1 className="font-bold text-green-800  text-2xl">
        {resolveParams.categories === "cachorros"
          ? "CACHORROS"
          : resolveParams.categories === "aves"
          ? "AVES"
          : resolveParams.categories === "piscina"
          ? "PISCINA"
          : resolveParams.categories === "jardim"
          ? "JARDIM"
          : "GATOS"}
      </h1>
      <h2 className="font-semibold">
        {resolveParams.categories === "cachorros"
          ? "Encontre os melhores itens para seu amigo peludo aqui!"
          : resolveParams.categories === "aves"
          ? "Encontre os melhores itens para seu passarinho aqui!"
          : resolveParams.categories === "piscina"
          ? "Encontre os melhores itens para sua piscina aqui!"
          : resolveParams.categories === "jardim"
          ? "Encontre os melhores itens para seu jardim aqui!"
          : "Encontre os melhores itens para seu gatinho aqui!"}
      </h2>

      <div
        className={`h-48 mb-5 md:mb-7 rounded-lg flex items-center justify-between w-full md:w-[80%] lg:w-[65%] ${
          resolveParams.categories === "cachorros"
            ? "bg-gradient-to-r  from-sky-400 via-sky-600 to-sky-400  p-2"
            : resolveParams.categories === "aves"
            ? "bg-gradient-to-r  from-yellow-400 via-yellow-600 to-yellow-400  p-2"
            : resolveParams.categories === "piscina"
            ? "bg-gradient-to-r  from-cyan-400 via-cyan-600 to-cyan-400  p-2"
            : resolveParams.categories === "jardim"
            ? "bg-gradient-to-r  from-rose-600 via-rose-800 to-rose-600  p-2"
            : "bg-gradient-to-r  from-fuchsia-400 via-fuchsia-600 to-fuchsia-400  p-2"
        }`}
      >
        <Image
          src={
            resolveParams.categories === "cachorros"
              ? dogBanner
              : resolveParams.categories === "aves"
              ? birdBanner
              : resolveParams.categories === "piscina"
              ? poolBanner
              : resolveParams.categories === "jardim"
              ? gardenBanner
              : catBanner
          }
          alt={
            resolveParams.categories === "cachorros"
              ? "Imagem cachorro"
              : resolveParams.categories === "aves"
              ? "Imagem passaro"
              : resolveParams.categories === "piscina"
              ? "Imagem piscina"
              : "Imagem gato"
          }
          width={
            resolveParams.categories === "cachorros"
              ? 500
              : resolveParams.categories === "piscina"
              ? 300
              : resolveParams.categories === "jardim"
              ? 300
              : 350
          }
          className="object-contain p-4"
        />
        {resolveParams.categories === "cachorros" ? (
          <span className="text-white text-xl ">
            Tudo o que seu <span className="font-bold">doguinho</span> precisa
          </span>
        ) : resolveParams.categories === "aves" ? (
          <span className="text-white text-2xl ">
            Tudo o que seu <span className="font-bold ">passarinho</span>{" "}
            precisa
          </span>
        ) : resolveParams.categories === "piscina" ? (
          <span className="text-white text-2xl ">
            Tudo para <span className="font-bold">sua</span> piscina
          </span>
        ) : resolveParams.categories === "jardim" ? (
          <span className="text-white text-2xl ">
            Tudo para o <span className="font-bold">seu</span> jardim
          </span>
        ) : (
          <span className="text-white text-2xl ">
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
              resolveParams={resolveParams.categories}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
