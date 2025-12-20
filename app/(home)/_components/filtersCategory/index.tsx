import Image from "next/image";
import Link from "next/link";

import cachorroTitulo from "@/app/assets/cachorro-titulo.png";
import gatoTitulo from "@/app/assets/gato-titulo.png";

import { getCategoriesAndSubResume } from "./actions/getCategoriesAndSubResume";

export async function FiltersCategory() {
  //buscar no db (principais categorias e suas subscategorias)
  const categories = await getCategoriesAndSubResume();
  console.log(categories)

  const categoryDog = categories.filter((cat) => cat.name === "Cachorros");
  const subcategoriesDog = categoryDog[0].subcategories;

  const categoryCat = categories.filter((cat) => cat.name === "Gatos");
  const subcategoriesCat = categoryCat[0].subcategories;

  return (
    <section className="mt-6 w-full">
      {/* container cachorro e gato */}
      <div className="flex flex-col items-start gap-10 flex-wrap mt-6">

        {/* cachorro */}
        <div className="flex flex-col gap-1 w-full">
          {/* titulo cachorro */}
          <div className="bg-gradient-to-r  shadow-lg from-sky-400 via-sky-600 to-sky-400  rounded-lg flex items-center justify-evenly w-full md:w-1/2">
            <div className="w-1/2">
              <Image src={cachorroTitulo} alt="imagem cachorro" className="" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl text-white font-bold">Cachorros</div>
              <Link
                href={`/${categories[0].slug}`}
                className="text-gray-100 underline"
              >
                Ver todos
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg grid grid-cols-3 md:grid-cols-5 py-4 space-y-2">
            {subcategoriesDog.map((cat) => (
              <Link href={`/${categories[0].slug}/${cat.slug}`} key={cat.id}>
                <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                  <div className="rounded-full w-24 h-24 overflow-hidden  border-2 border-sky-500">
                    <Image
                      src={cat.img!}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                  <span className="font-semibold text-green-600">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* gato */}
        <div className="flex flex-col gap-1 w-full">
          {/* titulo gato */}
          <div className="bg-gradient-to-r  shadow-lg   from-fuchsia-400 via-fuchsia-600 to-fuchsia-400 rounded-lg flex items-center justify-evenly w-full md:w-1/2">
            <div className="w-1/2">
              <Image src={gatoTitulo} alt="imagem gato" className="" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl text-white font-bold">Gatos</div>
              <Link
                href={`/${categories[1].slug}`}
                className=" text-gray-100 underline"
              >
                Ver todos
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg grid grid-cols-3 md:grid-cols-5 py-4  space-y-2">
            {subcategoriesCat.map((cat) => (
              <Link href={`/${categories[1].slug}/${cat.slug}`} key={cat.id}>
                <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                  <div className="rounded-full w-24 h-24 overflow-hidden  border-2 border-fuchsia-500">
                    <Image
                      src={cat.img!}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                  <span className="font-semibold text-green-600">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
