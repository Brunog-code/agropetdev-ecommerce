import Image from "next/image";
import Link from "next/link";
import { BiBarcode } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { LiaCcAmex } from "react-icons/lia";
import { SiDinersclub, SiMastercard, SiVisa } from "react-icons/si";

import logoAgropet from "@/app/assets/logo-version2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <section className="w-full p-2 pb-20  bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-10">
        <div className="w-full  bg-zinc-700 flex flex-col lg:flex-row items-center mx-auto p-4 rounded-xl gap-10  ">
          <h2 className="text-white text-xl mb-4">
            Cadastre-se e receba nossas novidades
          </h2>
          <form className="flex flex-col w-full lg:flex-row gap-5">
            <Input type="text" placeholder="Nome" className="bg-white" />
            <Input type="text" placeholder="Email" className="bg-white" />
            <Button
              variant={"outline"}
              className="border-none outline-0 bg-green-600 text-white cursor-pointer hover:bg-green-700 hover:text-white"
            >
              Quero novidades
            </Button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 p-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image src={logoAgropet} alt="Logo agropetdev" loading="eager" />
            <div className="flex gap-4">
              <FaInstagram
                size={30}
                color="#3a7d44"
                className="cursor-pointer hover:scale-105 transition-all duration-200"
              />
              <FaFacebook
                size={30}
                color="#3a7d44"
                className="cursor-pointer hover:scale-105 transition-all duration-200"
              />
              <FaYoutube
                size={30}
                color="#3a7d44"
                className="cursor-pointer hover:scale-105 transition-all duration-200"
              />
              <FaLinkedin
                size={30}
                color="#3a7d44"
                className="cursor-pointer hover:scale-105 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full items-center justify-start">
            <h2 className="font-semibold">Links úteis</h2>
            <ul>
              <Link href="/area-cliente">Suporte</Link>
            </ul>
          </div>

          <div className="flex flex-col gap-2 w-full items-center justify-start">
            <h2 className="font-semibold">Informações</h2>
            <div className="flex flex-col gap-1 items-center justify-center">
              <Link href="/empresa">A empresa</Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full items-center justify-start">
            <h2 className="font-semibold">Formas de pagamento</h2>
            <div className="grid grid-cols-3 gap-4">
              <SiVisa size={30} color="#3a7d44" />
              <SiMastercard size={30} color="#3a7d44" />
              <BiBarcode size={30} color="#3a7d44" />
              <FaPix size={30} color="#3a7d44" />
              <SiDinersclub size={30} color="#3a7d44" />
              <LiaCcAmex size={30} color="#3a7d44" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
