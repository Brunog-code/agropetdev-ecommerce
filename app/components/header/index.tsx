"use client";

import Image from "next/image";
import logoImg from "@/app/assets/logo.png";
import Link from "next/link";
import { User, ShoppingCart, Heart } from "lucide-react";
import { CartDrawer } from "../ui/drawer-cart";
import { SheetTrigger } from "@/components/ui/sheet";
import { PromocoesCarousel } from "../lib/swiper/promoction";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export function Header() {
  const [session, setSession] = useState<boolean | null>();
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const { data } = await await authClient.getSession();
        if (!data?.session) {
          setSession(false);
          console.log("NAOOO user");
        } else {
          setSession(true);
          setUserName(data.user.name);
          console.log("tem user");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUserSession();
  }, []);

  return (
    <header className="w-full bg-[#3A7D44]">
      {/* parte superior */}
      <div className="w-full bg-orange-400/90 h-8 flex justify-center md:justify-around items-center text-white">
        <div className="w-full md:max-w-1/3 flex justify-center">
          <PromocoesCarousel />
        </div>

        <Link href="/favoritos" className="hidden gap-2 md:flex">
          <Heart className="w-6 h-6 hover:text-red-500 hover:fill-red-500 transition" />
          Favoritos
        </Link>
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
                <ShoppingCart className="w-6 h-6 cursor-pointer hover:fill-white transition" />
              </SheetTrigger>
            </CartDrawer>

            {loading ? (
              <span>Skeleton</span>
            ) : !session ? (
              <Link
                href="/login"
                className={cn(
                  "flex items-center justify-center gap-1 cursor-pointer",
                  buttonVariants({ variant: "secondary" })
                )}
              >
                <User className="w-6 h-6 hover:fill-white transition cursor-pointer" />
                <span>Login</span>
              </Link>
            ) : (
              <span
                className={cn(
                  "flex items-center justify-center gap-1 cursor-pointer",
                  buttonVariants({ variant: "secondary" })
                )}
              >
                Area do cliente
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
