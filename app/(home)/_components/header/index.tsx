"use client";

import Image from "next/image";
import logoImg from "@/app/assets/logo.png";
import Link from "next/link";
import { User, ShoppingCart, Heart } from "lucide-react";
import { CartDrawer } from "../ui/cart/drawer-cart";
import { SheetTrigger } from "@/components/ui/sheet";
import { PromotionsCarousel } from "../lib/swiper/promoction";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthCont";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { BsSearch } from "react-icons/bs";
import toast from "react-hot-toast";

interface ICategorieData {
  id: string;
  name: string;
  slug: string;
}

export function Header() {
  //zustand
  const quantityItemsCart = useCartStore((state) => state.cart.length);

  //state
  const [categories, setCategories] = useState<ICategorieData[]>([]);
  const [inputSearch, setInputSearch] = useState("");

  //router
  const router = useRouter();

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

  function checkFavoritesAccess() {
    if (!session) {
      //se nao estiver logado, envia para o aviso
      router.push("/login-obrigatorio");
    } else {
      router.push("/favoritos");
    }
  }
  function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (inputSearch === "") {
      toast("Digite algo para buscar");
      return;
    }

    router.push(`/produto/procurar/${inputSearch}`);
  }

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
          <form
            onSubmit={handleSearch}
            className="w-full bg-gray-200 flex items-center justify-between p-2 rounded-lg"
          >
            <input
              type="text"
              className="bg-gray-200 border border-gray-100 rounded-lg w-full p-1"
              placeholder=" Digite sua busca. (ex: ração)"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <button type="submit" className="cursor-pointer">
              {" "}
              <BsSearch size={18} color="#000" />
            </button>
          </form>

          <div className="hidden md:flex gap-6 text-white">
            <CartDrawer>
              <SheetTrigger>
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 cursor-pointer hover:fill-white transition" />
                  {quantityItemsCart > 0 && (
                    <small className="rounded-full w-6 h-6 bg-red-500 absolute -top-4 -right-4 text-white flex items-center justify-center">
                      {quantityItemsCart}
                    </small>
                  )}
                </div>
              </SheetTrigger>
            </CartDrawer>

            <button
              onClick={checkFavoritesAccess}
              className="hidden gap-1 md:flex cursor-pointer"
            >
              <Heart className="w-6 h-6 hover:text-red-500 hover:fill-red-500 transition" />
              Favoritos
            </button>
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
