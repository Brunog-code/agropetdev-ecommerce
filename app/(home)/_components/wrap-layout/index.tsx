"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { ChatWidget } from "../chatboot/Chat-widget";
import { Footer } from "../footer";
import { Header } from "../header";
import { MobileNav } from "../mobile-nav";

// Rotas onde o Header GLOBAL deve ser escondido
const AUTH_ROUTES = [
  "/login",
  "/cadastro",
  "/login-obrigatorio",
  "/esqueci-senha",
  "/resetar-senha",
];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <div className="min-h-screen flex flex-col ">
      {!isAuthRoute && <Header />}

      <main className="flex-1 ">
        {children}
        {!isAuthRoute && <ChatWidget />}
      </main>
      <div className="fixed bottom-0 left-0 w-full">
        {!isAuthRoute && <MobileNav />}
      </div>
      {!isAuthRoute && <Footer />}
    </div>
  );
}
