import Link from "next/link";

import { LoginForm } from "./_components/login-form";

export default async function Login({
  searchParams,
}: {
  searchParams: { rto?: string };
}) {
  const resolveParams = await searchParams;

  const rto = resolveParams.rto ?? "/";
  return (
    <section className="w-full flex flex-col gap-4 items-center justify-center  h-auto">
      <h1 className="font-bold text-green-800 text-center text-2xl">Login</h1>
      <LoginForm returnTo={rto} />
      <div>
        Não tem conta?{" "}
        <span className="font-bold text-green-700">
          <Link href="/cadastro">Cadastre-se</Link>
        </span>
      </div>
    </section>
  );
}
