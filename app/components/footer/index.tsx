import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <section className="w-full p-2  bg-gray-100 shadow-md">

      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-10">

        <div className="w-full  bg-zinc-700 flex flex-col lg:flex-row items-center mx-auto p-4 rounded-xl gap-10  ">
          <h2 className="text-white text-xl mb-4">
            Cadastre-se e receba nossas novidades
          </h2>
          <form className="flex flex-col w-full lg:flex-row gap-5">
            <Input type="text" placeholder="Nome" className="bg-white" />
            <Input type="text" placeholder="Email" className="bg-white" />
            <Button variant={"outline"}>Quero novidades</Button>
          </form>
        </div>

        <div className="">
          <div>logo e redess socias</div>

          <div>A empresa</div>

          <div>politicas</div>

          <div>formas de pagfamento</div>
        </div>

      </div>

    </section>
  );
};
