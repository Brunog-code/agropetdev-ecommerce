import { ShieldCheck } from "lucide-react";

export const HeaderSecurity = () => {
  return (
    <article className="bg-white flex flex-col items-center justify-center gap-2 p-4 rounded-lg md:flex-row md:justify-around">
      <h1 className="text-xl font-bold">MEU CARRINHO</h1>
      <span className="flex gap-1 font-semibold">
        <ShieldCheck size={22} color="#3a7d44" /> Compra 100% segura
      </span>
    </article>
  );
};
