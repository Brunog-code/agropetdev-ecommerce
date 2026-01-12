import { ResetForm } from "./_components/reset-form";

interface IResetPasswordProps {
  searchParams: {
    token: string;
  };
}

export default async function ResetPassword({
  searchParams,
}: IResetPasswordProps) {
  const resolveParams = await searchParams;
  const token = resolveParams.token;

  return (
    <section className="w-full flex flex-col gap-4 items-center justify-center  h-auto">
      <h1 className="font-bold text-green-800 text-center text-2xl">
        Digite a nova senha
      </h1>
      <ResetForm token={token} />
    </section>
  );
}
