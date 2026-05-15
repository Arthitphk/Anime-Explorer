import { Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../context/useFavorites";
import { useAnimeDetail } from "../hooks/useAnimeDetail";

export default function AnimeDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useAnimeDetail(id);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (isLoading) {
    return <p className="text-slate-600">Loading anime detail...</p>;
  }

  if (isError) {
    return <p className="text-slate-600">Failed to load anime detail.</p>;
  }

  const anime = data?.data;

  if (!anime) {
    return <p className="text-slate-600">Anime not found.</p>;
  }

  const favorite = isFavorite(anime.mal_id);

  return (
    <div>
      <Link
        to="/anime"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        &lt;- Back to search
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-xl bg-white p-4 shadow">
          <img
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold">{anime.title}</h2>

              {anime.title_english && (
                <p className="mt-1 text-slate-500">{anime.title_english}</p>
              )}
            </div>

            <button
              type="button"
              aria-pressed={favorite}
              onClick={() => {
                if (favorite) {
                  removeFavorite(anime.mal_id);
                } else {
                  addFavorite(anime);
                }
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                favorite
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <Heart size={18} fill={favorite ? "currentColor" : "none"} />
              {favorite ? "Remove Favorite" : "Add Favorite"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="rounded bg-yellow-100 px-3 py-1 text-yellow-700">
              Score: {anime.score ?? "N/A"}
            </span>

            <span className="rounded bg-blue-100 px-3 py-1 text-blue-700">
              Type: {anime.type ?? "Unknown"}
            </span>

            <span className="rounded bg-green-100 px-3 py-1 text-green-700">
              Episodes: {anime.episodes ?? "N/A"}
            </span>

            <span className="rounded bg-purple-100 px-3 py-1 text-purple-700">
              Status: {anime.status ?? "Unknown"}
            </span>
          </div>

          {anime.genres && anime.genres.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-2 font-semibold">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-2 font-semibold">Synopsis</h3>
            <p className="leading-7 text-slate-700">
              {anime.synopsis ?? "No synopsis available."}
            </p>
          </div>

          {anime.trailer?.embed_url && (
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Trailer</h3>
              <iframe
                src={anime.trailer.embed_url}
                title={`${anime.title} trailer`}
                className="aspect-video w-full rounded-lg"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
