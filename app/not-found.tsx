import Image from "next/image";
import Link from "next/link";
import notfoundImg from "@/app/assets/not-404.jpg";

export default function NotFound() {
  return (
    <section className="mx-auto w-full py-20 text-center">
      <h2 className="text-4xl font-black">Nada encontrado aqui...</h2>

      <Image
        className="mx-auto w-sm rounded-lg mt-10"
        src={notfoundImg}
        alt="cachorro"
      />

      <p className="text-3xl text-gray-400">
        Não foi possível encontrar a página solicitada.
      </p>
      <div className=" mt-20">
        <Link
          className="bg-orange-500 p-4 rounded-lg text-white hover:opacity-90"
          href="/"
        >
          Voltar à Home
        </Link>
      </div>
    </section>
  );
}
