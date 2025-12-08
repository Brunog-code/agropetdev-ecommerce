"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

export const FavoritesCard = () => {

  




  return (
    <div className="w-full md:w-[70%] lg:w-1/2 mx-auto bg-white flex rounded-lg border border-green-400 space-x-2 p-2">
      {/* <Image
        src={}
        alt="racao"
        className="max-w-30 object-contain  p-2"
      /> */}
      <div className="flex flex-col gap-4">
        <p className="font-bold">Ração Umida</p>
        <p>
          racao umida para cachorross gatos e aves testesta texto maior jdfaijd
          jfsijfh fdisfja
        </p>
        <p>25</p>
      </div>

      <div className="items-center flex flex-col justify-center gap-1 cursor-pointer">
        <Heart className="w-6 h-6 text-red-500 fill-red-500 transition hover:text-black hover:fill-transparent" />
        <span className="font-medium">Remover</span>
      </div>
    </div>
  );
};
