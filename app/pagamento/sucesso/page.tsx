import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { DialogResponse } from "../_components/dialog-response";
import { validateCheckoutSessionAccess } from "../actions/validateCheckoutSessionAccess";

export default async function SucessoPagamento({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  //verifica sessão do usuario logado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  //verifica o sessionId do stripe gerado
  const resolveParams = await searchParams;
  if (!resolveParams.session_id) {
    redirect("/");
  }

  const dataValidation = {
    sessionId: resolveParams.session_id,
    userId: session.user.id,
  };
  //chama action que valida userId e session_id
  const response = await validateCheckoutSessionAccess(dataValidation);
  if (!response.success) {
    redirect("/");
  }

  return (
    <section>
      <DialogResponse type="success" />
    </section>
  );
}
