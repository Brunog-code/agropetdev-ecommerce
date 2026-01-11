import { ForgotForm } from "./_components/forgot-form";

export default function ForgotPassword() {
  return (
    <section className="w-full flex flex-col gap-4 items-center justify-center  h-auto">
        <h1>Digite abaixo o email cadastrado</h1>
      <ForgotForm />
    </section>
  );
}
