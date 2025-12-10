import Link from "next/link";
import { LoginForm } from "./_components/loginForm/login-form";

export default function Login() {
  return (
    <section className="w-full flex flex-col gap-4 items-center justify-center  h-auto">
      <h1 className="font-bold text-green-800 text-center text-2xl">Login</h1>
      <LoginForm />
      <div>
        Não tem conta?{" "}
        <span className="font-bold text-green-700">
          <Link href="/cadastro">Cadastre-se</Link>
        </span>
      </div>
    </section>
  );
}
