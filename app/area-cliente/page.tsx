import { CardMainClient } from "./_components/card-main-client";
import { CardMenuClient } from "./_components/card-menu-client";

export default function ClientArea() {
  return (
    <section>
      <div>
        <CardMenuClient />
      </div>

      <div>
        <CardMainClient />
      </div>
    </section>
  );
}
