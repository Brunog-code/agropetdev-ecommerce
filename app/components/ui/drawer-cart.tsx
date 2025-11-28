"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsmobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 640) {
        setIsmobile(true);
      } else {
        setIsmobile(false);
      }
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <Sheet>
      {/* Trigger vem do Header */}
      {children}

      <SheetContent side="right" className={`${isMobile ? "w-full" : "w-100"}`}>
        <SheetHeader className="mt-10 border-b-2 flex items-center w-full">
          <SheetTitle>MEU CARRINHO</SheetTitle>
        </SheetHeader>

        <div className="p-4">Conteúdo do carrinho aqui</div>
      </SheetContent>
    </Sheet>
  );
}
