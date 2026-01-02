"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { UserAddresses } from "../user-addresses";
import { UserProfile } from "../user-profile";
import { UserSuport } from "../user-suport";

interface MenuOption {
  label: string;
  href?: string; // se tiver link externo ou rota
  variant?: "default" | "outline";
  highlight?: boolean; // para destacar "Meus pedidos"
}

export const ContentAreaClient = () => {
  //opcoes menu
  const menuOptions: MenuOption[] = [
    { label: "Meus pedidos", href: "/meus-pedidos" },
    { label: "Dados cadastrais", variant: "outline" },
    { label: "Meus endereços", variant: "outline" },
    { label: "Suporte", variant: "outline" },
  ];

  //state
  const [menuSelected, setMenuSelected] = useState(menuOptions[1].label);

  return (
    <section className="flex flex-col md:flex-row gap-4 ">
      {/* menu */}
      <Card className="flex-1 h-fit">
        <CardHeader>
          <CardTitle>Selecione uma opção</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3">
            {menuOptions.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Button
                    asChild
                    className="w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Link href={item.href}>Meus pedidos</Link>
                  </Button>
                ) : (
                  <Button
                    variant={item.variant}
                    className="w-full text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setMenuSelected(item.label)}
                  >
                    {item.label}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* conteudo */}
      <Card className="flex-2">
        <CardHeader>
          <CardTitle>{menuSelected}</CardTitle>
        </CardHeader>

        <CardContent>
          {menuSelected === "Dados cadastrais" && <UserProfile />}
          {menuSelected === "Meus endereços" && <UserAddresses />}
          {menuSelected === "Suporte" && <UserSuport />}
        </CardContent>
      </Card>
    </section>
  );
};
