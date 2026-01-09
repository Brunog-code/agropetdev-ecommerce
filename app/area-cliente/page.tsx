import { ContentAreaClient } from "./_components/content-area-client";

export default async function ClientArea() {
  return (
    <section className="flex flex-col gap-4 mt-4">
      <h1 className="font-bold text-green-800 text-2xl">Area do cliente</h1>

      <ContentAreaClient />
    </section>
  );
}
