"use client";

import { ChevronRight } from "lucide-react";
import { Dog } from "lucide-react";
import { Cat } from "lucide-react";
import { Bird } from "lucide-react";
import { Waves } from "lucide-react";
import { Leaf } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Categories {
  id: string;
  name: string;
  slug: string;
}

interface IFilterDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoriesData: Categories[];
}

export function FilterDrawer({
  children,
  open,
  onOpenChange,
  categoriesData,
}: IFilterDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children}

      <SheetContent side="left" className="w-full">
        <SheetHeader className="mt-10 border-b-2 flex items-center w-full">
          <SheetTitle>MENU</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <ul className="flex flex-col gap-8">
            {categoriesData.map((cat) => (
              <li key={cat.id}>
                <Link
                  onClick={() => onOpenChange(false)}
                  href={`/${cat.slug}`}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <div className="flex gap-2 items-center">
                    <span>
                      {cat.name === "Cachorros" ? (
                        <Dog className="w-8 h-8 text-[#3a7d44]" />
                      ) : cat.name === "Gatos" ? (
                        <Cat className="w-8 h-8 text-[#3a7d44]" />
                      ) : cat.name === "Aves" ? (
                        <Bird className="w-8 h-8 text-[#3a7d44]" />
                      ) : cat.name === "Piscina" ? (
                        <Waves className="w-8 h-8 text-[#3a7d44]" />
                      ) : (
                        <Leaf className="w-8 h-8 text-[#3a7d44]" />
                      )}
                    </span>
                    <span className="text-xl">{cat.name}</span>
                  </div>
                  <div>
                    <span className="rounded-full  flex items-center justify-center bg-[#3a7d44] w-10 h-10">
                      <ChevronRight size={28} color="#fff" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
