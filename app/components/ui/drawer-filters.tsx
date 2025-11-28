"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function FilterDrawer({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children}

      <SheetContent side="left" className="w-full">
        <SheetHeader className="mt-10 border-b-2 flex items-center w-full">
          <SheetTitle>MENU</SheetTitle>
        </SheetHeader>

        <div className="p-4">Conteúdo aqui</div>
      </SheetContent>
    </Sheet>
  );
}
