"use client";

import { Divide as Hamburger } from "hamburger-react";
import { Heart, Home, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@/app/contexts/AuthCont";
import { useCartStore } from "@/app/store/cartStore";
import { SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

import { CartDrawer } from "../ui/cart/drawer-cart";
import { FilterDrawer } from "../ui/drawer-filters";

interface ICategorieData {
  id: string;
  name: string;
  slug: string;
}

export function MobileNav() {
  //zustand
  const quantityItemsCart = useCartStore((state) => state.cart.length);

  //authContext
  const { session, logout } = useAuth();

  //states

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<ICategorieData[]>([]);
  const [showDiv, setShowDiv] = useState(false);

  const router = useRouter();

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

  async function logOut() {
    logout();
    setShowDiv(false);
  }

  function checkFavoritesAccess() {
    if (!session) {
      //se nao estiver logado, envia para o aviso
      router.push("/login-obrigatorio");
    } else {
      router.push("/favoritos");
    }
  }

  return (
    <section className="text-white z-30 relative items-center flex md:hidden justify-around w-full bg-[#3A7D44] rounded-t-xl p-4 shadow-2xl">
      <FilterDrawer
        onOpenChange={setIsOpen}
        open={isOpen}
        categoriesData={categories}
      >
        <SheetTrigger asChild>
          <div>
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              color={isOpen ? "#f28c28" : "#fff"}
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
            <div>
              <ShoppingCart className="w-8 h-8" />
              {quantityItemsCart > 0 && (
                <small className="rounded-full w-6 h-6 bg-red-500 absolute top-1 right-2 text-white flex items-center justify-center">
                  {quantityItemsCart}
                </small>
              )}
            </div>
          </div>
        </SheetTrigger>
      </CartDrawer>

      <button onClick={checkFavoritesAccess}>
        <Heart className="w-6 h-6 hover:text-red-500 hover:fill-red-500 transition cursor-pointer" />
      </button>

      <div className="relative">
        {showDiv && (
          <div className="absolute bg-white rounded-lg -top-17 -left-17 p-4">
            {!session ? (
              <span className=" bg-orange-500 p-2 rounded-lg text-white shadow-lg">
                <Link href="/login">Login</Link>
              </span>
            ) : (
              <div className="absolute bg-white rounded-lg -top-17 -left-14 p-4 flex flex-col gap-2 w-[150px]">
                <span className=" bg-orange-500 p-2 rounded-lg text-white shadow-lg">
                  <Link href="#">Area cliente</Link>
                </span>
                <span
                  className=" bg-orange-500 p-2 rounded-lg text-white shadow-lg cursor-pointer"
                  onClick={logOut}
                >
                  Sair
                </span>
              </div>
            )}
          </div>
        )}

        <User
          className="w-6 h-6 cursor-pointer hover:text-orange-500"
          onClick={() => setShowDiv(!showDiv)}
        />
      </div>
    </section>
  );
}
