import { CardSubcategory } from "./_components/CardSubcategory";
import { getCategoriesAndSubTotal } from "./actions";

import dogBanner from "@/app/assets/dog-categorypage-banner.webp";
import catBanner from "@/app/assets/cat-categorypage-banner.png";
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
        {resolveParams.categorias === "cachorros" ? "CACHORROS" : "GATOS"}
      </h1>
      <h2 className="font-semibold">
        {resolveParams.categorias === "cachorros"
          ? "Encontre os melhores itens para seu amigo peludo aqui!"
          : "Encontre os melhores itens para seu gatinho aqui!"}
      </h2>

      <div
        className={`h-48 mb-5 md:mb-7 rounded-lg flex items-center justify-between w-full md:w-[80%] lg:w-[65%] ${
          resolveParams.categorias === "cachorros"
            ? "bg-gradient-to-r  from-sky-400 via-sky-600 to-sky-400"
            : "bg-gradient-to-r  from-fuchsia-400 via-fuchsia-600 to-fuchsia-400"
        }`}
      >
        <Image
          src={resolveParams.categorias === "cachorros" ? dogBanner : catBanner}
          alt={
            resolveParams.categorias === "cachorros"
              ? "Imagem cachorro"
              : "Imagem gato"
          }
          width={resolveParams.categorias === "cachorros" ? 500 : 350}
          className="object-contain p-4"
        />
        {resolveParams.categorias === "cachorros" ? (
          <span className="text-white text-3xl  mr-2 ">
            Tudo o que seu <span className="font-bold">doguinho</span> precisa
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
