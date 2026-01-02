import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { ContentAreaClient } from "./_components/content-area-client";

export default async function ClientArea() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }

  return (
    <section className="flex flex-col gap-4 mt-4">
      <h1 className="font-bold text-green-800 text-2xl">Area do cliente</h1>

      <ContentAreaClient />
    </section>
  );
}
