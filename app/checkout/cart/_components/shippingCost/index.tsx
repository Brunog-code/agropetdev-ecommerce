"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaExternalLinkAlt } from "react-icons/fa";

import { useCartStore } from "@/app/store/cartStore";
import { formatBRL } from "@/app/utils/helpers/formatBRL";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ShippingMethod = {
  PAC: number;
  SEDEX: number;
};

export const ShippingCost = () => {
  const itemsCart = useCartStore((state) => state.cart);

  //state
  const [inputCep, setInputCep] = useState("");
  const [showResultCep, setShowResultCep] = useState(false);
  const [andress, setAndress] = useState("");
  const [shippingValues, setShippingValues] = useState<ShippingMethod>({
    PAC: 0,
    SEDEX: 0,
  });
  const [loadingShipping, setLoadingShipping] = useState(false);

  const setShipping = useCartStore((state) => state.setShipping);
  const shippingMethod = useCartStore((state) => state.shippingMethod);

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
        setShipping(null, 0);
        return;
      }

      const cepRegex = /^\d{5}-?\d{3}$/;
      if (!cepRegex.test(cep)) {
        toast.error("Cep inválido");
        setShowResultCep(false);
        setShipping(null, 0);
        return;
      }
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        toast.error("Cep não encontrado");
        setShowResultCep(false);
        setShipping(null, 0);
        return;
      }

      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        setShowResultCep(false);
        setShipping(null, 0);
        return;
      }

      const formatedAndress = `${data.logradouro}, ${data.complemento}, ${data.localidade} - ${data.uf}, ${data.cep}`;
      setAndress(formatedAndress);
      setShowResultCep(true);

      //simula o valor do frete
      const valuePac = Math.floor(Math.random() * 7) + 5;
      const valueSedex = Math.floor(Math.random() * 20) + 12;

      setShippingValues({
        PAC: valuePac,
        SEDEX: valueSedex,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar o cep");
    } finally {
      setLoadingShipping(false);
    }
  }

  return (
    <aside className="bg-white p-4 rounded-lg w-full md:w-1/2">
      <h1 className="font-semibold border-b-2 p-2">Entrega</h1>

      <div className="mt-4 flex flex-col gap-2">
        <span className="text-sm">Calcule seu frete</span>
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
              "Calcular"
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

              <select
                value={shippingMethod ?? ""}
                onChange={(e) => {
                  const method = e.target.value as "PAC" | "SEDEX";
                  setShipping(method, shippingValues[method]);
                }}
                className="mt-2 w-full rounded-lg border px-3 py-2 text-sm
      focus:outline-none focus:ring-1 focus:ring-[#f28c28]"
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>

                <option value="PAC">
                  PAC • 5 a 7 dias úteis — {formatBRL(shippingValues.PAC)}
                </option>

                <option value="SEDEX">
                  SEDEX • 1 a 2 dias úteis — {formatBRL(shippingValues.SEDEX)}
                </option>
              </select>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
