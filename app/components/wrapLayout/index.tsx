"use client";

import { usePathname } from "next/navigation";
import { Header } from "../header";
import { MobileNav } from "../mobileNav";
import React from "react";

// Rotas onde o Header GLOBAL deve ser escondido
const AUTH_ROUTES = ["/login", "/cadastro"];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  return (
    <>
      {!isAuthRoute && <Header />}

      <main>{children}</main>
      <div className="fixed bottom-0 left-0 w-full">
        {!isAuthRoute && <MobileNav />}
      </div>
    </>
  );
}
