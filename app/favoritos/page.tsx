import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { FavoritesCard } from "./_components/favoritesCard";
import { getFavoritesUser } from "./actions/get-favorites";

export default async function Favorites() {
  //headersm passar manualmente do lado server(betherAuth precisa dos cookies de sessao)
  const hdr = await headers();

  //verifica session do lado do servidor
  const sessionData = await auth.api.getSession({ headers: hdr });
  const userId = sessionData!.user.id;

  //verifica os favoritos do user logado
  const response = await getFavoritesUser(userId);

  const favorites = response.favorites;

  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-green-800 text-center text-2xll">
        SEUS ITENS FAVORITOS
      </h1>
      {favorites.length < 1 && (
        <p className="text-center text-2xl font-bold">Nenhum item salvo</p>
      )}
      {favorites.map((fav) => (
        <div key={fav.id}>
          <FavoritesCard product={fav.product} />
        </div>
      ))}
    </section>
  );
}
