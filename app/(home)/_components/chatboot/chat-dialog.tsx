"use client";

import Image from "next/image";

import nala from "@/app/assets/mascote.webp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Image src={nala} width={50} height={50} alt="Nala" />
            <span>Olá, sou a Nala, assistente virtual</span>
          </DialogTitle>
        </DialogHeader>

        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded">
          <div className="text-sm bg-muted p-2 rounded">
            Posso te ajudar a encontrar um produto 😊
          </div>
        </div>

        {/* Input */}
        <form className="flex gap-2 mt-2">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Digite sua mensagem..."
          />
          <button className="bg-green-600 text-white px-4 rounded cursor-pointer">
            Enviar
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
