import Image from "next/image";
import gatoTitulo from "@/app/assets/gato-titulo.png";
import cachorroTitulo from "@/app/assets/cachorro-titulo.png";
import Link from "next/link";

import racaoCachorro from "@/app/assets/icons-cards/dog/dog-racao.jpg";
import racaoUmidaCachorro from "@/app/assets/icons-cards/dog/dog-racao-umida.png";
import brinquedoCachorro from "@/app/assets/icons-cards/dog/dog-brinquedo.jpg";
import antipulgaCachorro from "@/app/assets/icons-cards/dog/dog-antipulga.jpg";
import tapeteCachorro from "@/app/assets/icons-cards/dog/dog-tapete.jpg";

import racaoGato from "@/app/assets/icons-cards/cat/cat-racao.png";
import racaoUmidaGato from "@/app/assets/icons-cards/cat/cat-racao-umida.jpg";
import brinquedoGato from "@/app/assets/icons-cards/cat/cat-brinquedo.jpg";
import caixaGato from "@/app/assets/icons-cards/cat/cat-caixa.jpg";
import gramaGato from "@/app/assets/icons-cards/cat/cat-grama.jpg";

export function FiltersCategory() {
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
              <span className="text-gray-100 underline">Ver todos</span>
            </div>
          </div>

          <div className="bg-white rounded-lg grid grid-cols-3 md:grid-cols-5 py-4 space-y-2">
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden  border-2 border-sky-500">
                  <Image
                    src={racaoCachorro}
                    alt="imagem cachorro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">Rações</span>
              </div>
            </Link>
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden   border-2 border-sky-500">
                  <Image
                    src={brinquedoCachorro}
                    alt="imagem gato"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">Brinquedos</span>
              </div>
            </Link>
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden   border-2 border-sky-500">
                  <Image
                    src={racaoUmidaCachorro}
                    alt="imagem ave"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">
                  Rações úmidas
                </span>
              </div>
            </Link>
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden   border-2 border-sky-500">
                  <Image
                    src={antipulgaCachorro}
                    alt="imagem ave"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">Antipulgas</span>
              </div>
            </Link>
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden   border-2 border-sky-500">
                  <Image
                    src={tapeteCachorro}
                    alt="imagem ave"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">
                  Tapetes Higiênicos
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* gato */}
        <div className="flex flex-col gap-1 w-full">
          <div className="bg-gradient-to-r  shadow-lg   from-fuchsia-400 via-fuchsia-600 to-fuchsia-400 rounded-lg flex items-center justify-evenly w-full md:w-1/2">
            <div className="w-1/2">
              <Image src={gatoTitulo} alt="imagem gato" className="" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl text-white font-bold">Gatos</div>
              <span className=" text-gray-100 underline">Ver todos</span>
            </div>
          </div>

          <div className="bg-white rounded-lg grid grid-cols-3 md:grid-cols-5 py-4  space-y-2">
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden border-2 border-purple-500">
                  <Image
                    src={caixaGato}
                    alt="imagem cachorro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">
                  Caixas de areia
                </span>
              </div>
            </Link>
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden  border-2 border-purple-500">
                  <Image
                    src={gramaGato}
                    alt="imagem gato"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">
                  Gramas Digestivas
                </span>
              </div>
            </Link>
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden  border-2 border-purple-500">
                  <Image
                    src={racaoGato}
                    alt="imagem ave"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">Rações</span>
              </div>
            </Link>
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden  border-2 border-purple-500">
                  <Image
                    src={racaoUmidaGato}
                    alt="imagem ave"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">
                  Rações úmidas
                </span>
              </div>
            </Link>
            <Link href="#">
              <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
                <div className="rounded-full w-24 h-24 overflow-hidden  border-2 border-purple-500">
                  <Image
                    src={brinquedoGato}
                    alt="imagem ave"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-green-600">Brinquedos</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
