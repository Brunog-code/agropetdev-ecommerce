"use client";

import Image from "next/image";
import logoImg from "@/app/assets/logo.png";
import Link from "next/link";
import { User, ShoppingCart, Heart } from "lucide-react";
import { CartDrawer } from "../ui/drawer-cart";
import { SheetTrigger } from "@/components/ui/sheet";
import { PromotionsCarousel } from "../lib/swiper/promoction";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuuthContext";

interface ICategorieData {
  id: string;
  name: string;
  slug: string;
}

export function Header() {
  const [categories, setCategories] = useState<ICategorieData[]>([]);

  //context
  const { session, loading, logout } = useAuth();

  //busca categorias para nav
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    getCategories();
  }, []);

  return (
    <header className="w-full bg-[#3A7D44]">
      {/* parte superior */}
      <div className="w-full bg-orange-400/90 h-11 flex justify-center md:justify-around items-center text-white">
        <div className="w-full md:max-w-1/2 flex justify-center">
          <PromotionsCarousel />
        </div>
        {loading ? (
          <p></p>
        ) : !session ? (
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "hidden md:flex items-center justify-center gap-1 cursor-pointer"
            )}
          >
            <User className="w-6 h-6 hover:fill-white transition cursor-pointer" />
            <span>Login</span>
          </Link>
        ) : (
          <div className="gap-2 hidden md:flex ">
            <button
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex items-center justify-center gap-1 cursor-pointer"
              )}
            >
              <User className="w-6 h-6 hover:fill-white transition cursor-pointer" />
              <span>Area cliente</span>
            </button>
            <button
              onClick={logout}
              className={cn(
                "flex items-center justify-center gap-1 cursor-pointer ",
                buttonVariants({ variant: "secondary" })
              )}
            >
              <User className="w-6 h-6 hover:fill-white transition cursor-pointer text-red-500" />
              <span className="text-red-500">Sair</span>
            </button>
          </div>
        )}
      </div>

      {/* parte inferior */}
      <div className="flex flex-col md:flex-row  max-w-7xl mx-auto justify-around items-center p-2">
        <div>
          <Link href="/">
            <Image src={logoImg} alt="Logo" />
          </Link>
        </div>

        <div className="flex gap-6 items-center w-full md:w-1/2 mt-4">
          <input
            type="text"
            className="bg-gray-200 border border-gray-100 rounded-lg w-full p-2"
            placeholder=" Digite sua busca. (ex: ração)"
          />

          <div className="hidden md:flex gap-6 text-white">
            <CartDrawer>
              <SheetTrigger>
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 cursor-pointer hover:fill-white transition" />
                  <small className="rounded-full w-6 h-6 bg-red-500 absolute -top-4 -right-4 text-white flex items-center justify-center">
                    2
                  </small>
                </div>
              </SheetTrigger>
            </CartDrawer>

            <Link href="/favoritos" className="hidden gap-1 md:flex">
              <Heart className="w-6 h-6 hover:text-red-500 hover:fill-red-500 transition" />
              Favoritos
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full p-2 text-white">
        <ul className="hidden md:flex justify-evenly items-center">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="font-bold hover:text-orange-500 py-1 text-lg"
            >
              <li>{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
}
