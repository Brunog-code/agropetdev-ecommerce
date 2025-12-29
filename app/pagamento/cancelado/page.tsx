import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { DialogResponse } from "../_components/dialog-response";

export default async function CanceladoPagamento() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  return (
    <section>
      <DialogResponse type="canceled" />
    </section>
  );
}
