"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExternalLinkAlt } from "react-icons/fa";

import { SelectedShipping } from "@/app/pedido/_components/selected-shipping";
import { useCartStore } from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const ShippingCost = () => {
  const itemsCart = useCartStore((state) => state.cart);

  //state
  const [inputCep, setInputCep] = useState("");
  const [showResultCep, setShowResultCep] = useState(false);
  const [andress, setAndress] = useState("");
  const [loadingShipping, setLoadingShipping] = useState(false);

  const setShipping = useCartStore((state) => state.setShipping);
  const clearShipping = useCartStore((state) => state.clearShipping);

  useEffect(() => {
    clearShipping();
  }, [clearShipping]);

  if (itemsCart.length < 1) {
    return <></>;
  }

  async function handleShippingCost() {
    setLoadingShipping(true);

    try {
      const cep = inputCep.trim();
      if (cep.length == 0) {
        toast.error("Favor digitar o cep");
        setShowResultCep(false);
        setShipping(null, 0, null);
        return;
      }

      const cepRegex = /^\d{5}-?\d{3}$/;
      if (!cepRegex.test(cep)) {
        toast.error("Cep inválido");
        setShowResultCep(false);
        setShipping(null, 0, null);
        return;
      }
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        toast.error("Cep não encontrado");
        setShowResultCep(false);
        setShipping(null, 0, null);
        return;
      }

      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        setShowResultCep(false);
        setShipping(null, 0, null);
        return;
      }

      const formatedAndress = `${data.logradouro}, ${data.complemento}, ${data.localidade} - ${data.uf}, ${data.cep}`;
      setAndress(formatedAndress);
      setShowResultCep(true);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar o cep");
    } finally {
      setLoadingShipping(false);
    }
  }

  return (
    <aside className=" w-full md:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="border-b-2 p-2">ENTREGA</CardTitle>
        </CardHeader>

        <CardContent>
          <div className=" flex flex-col gap-2">
            <span className="text-sm">Simule seu frete</span>
            <div className="flex gap-1">
              <Input
                value={inputCep}
                inputMode="numeric"
                placeholder="00000-000"
                className=" focus-visible:ring-1 focus-visible:ring-[#f28c28]"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "").slice(0, 8);

                  if (value.length > 5) {
                    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
                  }

                  setInputCep(value);
                }}
              />
              <Button
                onClick={handleShippingCost}
                disabled={loadingShipping}
                className="cursor-pointer bg-[#f28c28] hover:bg-[#f28c28] hover:opacity-85"
              >
                {!loadingShipping ? (
                  <span>Calcular</span>
                ) : (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculando...
                  </div>
                )}
              </Button>
            </div>
            <Link
              href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
              target="_blank"
              className="flex gap-1 items-start text-[#2563EB] text-sm"
            >
              Não sei meu cep <FaExternalLinkAlt size={13} color="#2563EB" />
            </Link>

            {showResultCep && (
              <>
                <div className="bg-green-100 p-2 rounded-lg mt-2 shadow-sm">
                  <small>
                    <span>CEP: </span>13426-563
                  </small>
                  <h2 className="font-semibold mt-2">
                    Enviar para:
                    <span className="font-normal"> {andress}</span>
                  </h2>
                </div>

                <div className="mt-2">
                  <span className="font-semibold">Opções de envio:</span>
                  <SelectedShipping cep={inputCep} />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};
