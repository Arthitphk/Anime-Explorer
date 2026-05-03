import { Link } from "react-router-dom";
import type { Anime } from "../types/anime";

type Props = {
  anime: Anime;
};

export default function AnimeCard({ anime }: Props) {
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 min-h-12">
          {anime.title}
        </h3>

        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
          <span>{anime.type ?? "Unknown"}</span>
          <span>⭐ {anime.score ?? "N/A"}</span>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Episodes: {anime.episodes ?? "N/A"}
        </p>
      </div>
    </Link>
  );
}