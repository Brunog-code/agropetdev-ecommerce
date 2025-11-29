"use client";

import Link from "next/link";
import { User, ShoppingCart, Heart, Home } from "lucide-react";
import { Divide as Hamburger } from "hamburger-react";
import { useState } from "react";
import { CartDrawer } from "../ui/drawer-cart";
import { FilterDrawer } from "../ui/drawer-filters";
import { SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="text-white relative items-center flex sm:hidden justify-between w-full bg-[#3A7D44] rounded-t-xl p-4 shadow-2xl">
      <FilterDrawer onOpenChange={setIsOpen} open={isOpen}>
        <SheetTrigger>
          <div>
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              color={isOpen ? "#f28c28" : "#fff"} // vermelho quando aberto, branco quando fechado
            />
          </div>
        </SheetTrigger>
      </FilterDrawer>

      <Link href="/">
        <Home className="w-6 h-6 cursor-pointer hover:text-orange-500" />
      </Link>
      {/* div fantasma */}
      <div className="opacity-0">
        <ShoppingCart className="w-6 h-6" />
      </div>

      <CartDrawer>
        <SheetTrigger>
          <div
            className="absolute left-1/2 -translate-x-1/3 -top-2 bg-orange-500 rounded-full p-4 cursor-pointer z-2 hover:opacity-93 hover:scale-102
         transition-all duration-200"
          >
            <ShoppingCart className="w-8 h-8" />
          </div>
        </SheetTrigger>
      </CartDrawer>

      <div>
        <Heart className="w-6 h-6 hover:text-red-500 hover:fill-red-500 transition cursor-pointer" />
      </div>

      <Link href='/login'>
        <User className="w-6 h-6 cursor-pointer hover:text-orange-500" />
      </Link>
    </section>
  );
}
