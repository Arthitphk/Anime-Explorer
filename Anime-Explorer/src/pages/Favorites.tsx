import AnimeCard from "../components/AnimeCard";
import { useFavorites } from "../context/useFavorites";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Favorites</h2>
        <p className="text-slate-600">
          Your saved anime collection.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <h3 className="text-lg font-semibold">No favorites yet</h3>
          <p className="mt-2 text-slate-500">
            Add anime to your favorites from the anime list or search page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-4 sm:gap-5 xl:gap-8">
          {favorites.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}
