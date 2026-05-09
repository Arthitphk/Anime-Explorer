import AnimeCard from "../components/AnimeCard";
import { useFavorites } from "../hooks/useFavorites";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}
