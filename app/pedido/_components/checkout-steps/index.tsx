"use client";

import { usePathname } from "next/navigation";
import { HiCheck } from "react-icons/hi";

export const CheckouSteps = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      <div className="flex items-center gap-2">
        <div className="rounded-full w-10 h-10  bg-green-600 border-2 border-green-600 flex items-center justify-center">
          <HiCheck size={25} color="#fff" />
        </div>
        <span className="text-gray-500 font-medium">Carrinho</span>
        <div className="h-1 rounded-xl bg-green-600 hidden md:block w-30"></div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`rounded-full w-10 h-10 ${
            pathname == "/pedido/carrinho" ? "bg-white" : "bg-green-600"
          } border-2 border-green-600 flex items-center justify-center`}
        >
          {pathname == "/pedido/carrinho" ? (
            <span className="text-green-600 font-semibold">2</span>
          ) : (
            <HiCheck size={25} color="#fff" />
          )}
        </div>
        <span className="text-gray-500 font-medium">Identificação</span>
        <div
          className={`h-1 rounded-xl ${
            pathname == "/pedido/carrinho" ? "bg-gray-400" : "bg-green-600"
          } hidden md:block w-30`}
        ></div>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-full w-10 h-10 bg-white border-2 border-green-600 flex items-center justify-center">
          <span className="text-green-600 font-semibold">3</span>
        </div>
        <span className="text-gray-500 font-medium">Pagamento</span>
      </div>
    </div>
  );
};
