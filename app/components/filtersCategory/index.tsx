import Image from "next/image";
import dogIcon from "@/app/assets/cachorro-icon.jpg";
import catIcon from "@/app/assets/gato-icon.jpg";
import pisIcon from "@/app/assets/piscina-icon.jpg";
import birdIcon from "@/app/assets/ave-icon.jpg";
import Link from "next/link";

export function FiltersCategory() {
  return (
    <section className="mt-6">
      <div className="flex justify-start items-center gap-10 flex-wrap mt-6">
        <Link href="#">
          <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
            <div className="rounded-full w-24 h-24 overflow-hidden">
              <Image
                src={dogIcon}
                alt="imagem cachorro"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-green-600">Cachorro</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
            <div className="rounded-full w-24 h-24 overflow-hidden">
              <Image
                src={catIcon}
                alt="imagem gato"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-green-600">Gato</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
            <div className="rounded-full w-24 h-24 overflow-hidden">
              <Image
                src={birdIcon}
                alt="imagem ave"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-green-600">Aves</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-200">
            <div className="rounded-full w-24 h-24 overflow-hidden">
              <Image
                src={pisIcon}
                alt="imagem piscina"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-green-600">Piscina</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
