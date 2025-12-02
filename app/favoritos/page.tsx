import { FavoritesCard } from "./_components/FavoritesCard";

export default function Favorites() {
  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-green-800 text-center text-2xll">
        SEUS ITENS FAVORITOS
      </h1>
      <FavoritesCard />
    </section>
  );
}
