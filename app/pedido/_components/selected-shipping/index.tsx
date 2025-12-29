"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/app/store/cartStore";
import { formatBRL } from "@/app/utils/helpers/formatBRL";
import { calcShipping } from "@/app/utils/shipping/calc-shipping";

interface ISelectedShipping {
  cep: string;
}

type ShippingMethod = {
  PAC: number;
  SEDEX: number;
};

interface IResponseCalcShipping {
  shippingMethod: string;
  shippingEta: number;
  shippingValue: number;
  shippingOrigin: string;
  shippingDestiy: string;
}

export const SelectedShipping = ({ cep }: ISelectedShipping) => {
  const [shippingValues, setShippingValues] = useState<ShippingMethod>({
    PAC: 0,
    SEDEX: 0,
  });
  const [shippingEta, setShippingEta] = useState<ShippingMethod>({
    PAC: 0,
    SEDEX: 0,
  });

  //zustand
  const setShipping = useCartStore((state) => state.setShipping);
  const shippingMethod = useCartStore((state) => state.shippingMethod);

  useEffect(() => {
    async function loadCep() {
      //simula o valor do frete
      const dataShipping: IResponseCalcShipping[] = await calcShipping(cep);

      let pacValue = 0;
      let pacEta = 0;
      let sedexValue = 0;
      let sedexEta = 0;
      dataShipping.forEach((item) => {
        if (item.shippingMethod === "PAC") {
          pacValue = item.shippingValue;
          pacEta = item.shippingEta;
        } else if (item.shippingMethod === "SEDEX") {
          sedexValue = item.shippingValue;
          sedexEta = item.shippingEta;
        }
      });

      //states front
      setShippingValues({
        PAC: pacValue,
        SEDEX: sedexValue,
      });

      setShippingEta({
        PAC: pacEta,
        SEDEX: sedexEta,
      });
    }
    loadCep();
  }, [cep]);

  return (
    <select
      value={shippingMethod ?? ""}
      onChange={(e) => {
        const method = e.target.value as "PAC" | "SEDEX";
        setShipping(method, shippingValues[method], shippingEta[method]);
      }}
      className="mt-2 w-full rounded-lg border px-3 py-2 text-sm
focus:outline-none focus:ring-1 focus:ring-[#f28c28]"
    >
      <option value="" disabled>
        Selecione uma opção
      </option>

      <option value="PAC">
        PAC • {shippingEta.PAC} dias úteis — {formatBRL(shippingValues.PAC)}
      </option>

      <option value="SEDEX">
        SEDEX • {shippingEta.SEDEX} úteis — {formatBRL(shippingValues.SEDEX)}
      </option>
    </select>
  );
};
