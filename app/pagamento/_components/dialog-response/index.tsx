"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TDialogResponseProps = {
  type: "success" | "canceled";
};

import Image from "next/image";
import Link from "next/link";

import paymentCanceledImg from "@/app/assets/payment-canceled.webp";
import paymentSuccessImg from "@/app/assets/payment-success.webp";

export const DialogResponse = ({ type }: TDialogResponseProps) => {
  return (
    <Dialog open>
      <DialogContent
        //impede fechar clicando fora
        onInteractOutside={(e) => e.preventDefault()}
        //impede fechar com ESC
        onEscapeKeyDown={(e) => e.preventDefault()}
        //remove botão de fechar (X)
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="text-center">
              {type === "success"
                ? "Pagamento realizado com sucesso"
                : "Pagamento cancelado"}
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-4 flex flex-col gap-4 text-center">
              <h2 className="text-base font-medium">
                {type === "success"
                  ? 'Seu pedido foi confirmado e está sendo processado. Você pode acompanhar na seção "meus pedidos".'
                  : "O pagamento foi cancelado. Nenhuma cobrança foi realizada."}
              </h2>

              <Image
                src={
                  type === "success" ? paymentSuccessImg : paymentCanceledImg
                }
                alt={
                  type === "success"
                    ? "pagamento-aprovado"
                    : "pagamento-cancelado"
                }
              />
              <div>
                <Button
                  asChild
                  className="mt-6 bg-white text-black border-2 hover:bg-green-600 hover:text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center"
                >
                  <Link href="/">Pagina inicial</Link>
                </Button>

                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-600 mt-6 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center"
                >
                  <Link href="/meus-pedidos">Ver meus pedidos</Link>
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
