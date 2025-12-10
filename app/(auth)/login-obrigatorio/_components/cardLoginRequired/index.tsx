"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CardLoginRequired = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
      <p className="text-2xl font-semibold text-center mb-4">
        Olá! Para continuar, acesse a sua conta
      </p>
      <Button asChild  className="w-full md:w-1/2 p-6 bg-[#3a7d44] cursor-pointer hover:bg-[#3a7d44] hover:opacity-85">
      <Link href="/cadastro">Criar conta</Link>
      </Button>
      <Link href="/login" className="text-[#3a7d44] font-semibold text-lg">
        Entrar
      </Link>
    </div>
  );
};
