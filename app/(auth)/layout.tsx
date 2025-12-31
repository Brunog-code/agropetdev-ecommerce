import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import logoImg from "@/app/assets/logo.png";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "AgropetDev - Login / Cadastro",
  description:
    "Acesse sua conta ou cadastre-se no AgropetDev para comprar produtos agropecuários online",
  keywords: ["login", "cadastro", "agropecuaria", "pets", "conta"],
  robots: {
    index: false, //páginas de login/cadastro geralmente não precisam ser indexadas
    follow: false,
  },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <Link
        href={"/"}
        className="bg-[#3a7d44] w-full rounded-lg p-2 shadow-2xl mb-8"
      >
        <Image
          src={logoImg}
          alt="imagem logo"
          loading="eager"
          className="mx-auto"
        />
      </Link>
      {children}
    </section>
  );
}
