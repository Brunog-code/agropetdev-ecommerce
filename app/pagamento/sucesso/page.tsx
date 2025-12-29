import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { DialogResponse } from "../_components/dialog-response";

export default async function SucessoPagamento({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const resolveParams = await searchParams;

  try{
    //chama action que valida userId e session_id
    await validateCheckoutSessionAccess()
  }catch(error){

  }

  return (
    <section>
      <DialogResponse type="success" />
    </section>
  );
}
