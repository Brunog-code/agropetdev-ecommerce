import Link from "next/link";

import { RegisterForm } from "./_components/register-form";

export default function Login() {
  return (
    <section className="w-full flex flex-col gap-4 items-center justify-center  h-auto">
      <h1 className="font-bold text-green-800 text-center text-2xl">
        Cadastre-se
      </h1>
      <RegisterForm />
      <div>
        Já possui conta?
        <span className="font-bold text-green-700">
          <Link href="/login"> Login</Link>
        </span>
      </div>
    </section>
  );
}
