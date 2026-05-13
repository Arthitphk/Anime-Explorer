import { Link } from "react-router-dom";
import type { Anime } from "../types/anime";
import { useFavorites } from "../context/useFavorites";
import { 
  Star, 
  Heart, 
  Share2, 
  Play, 
  Info, 
  Tv, 
  Layers,
  Clock
} from 'lucide-react';
import {  useState } from "react";

type Props = {
  anime: Anime;
};

export default function AnimeCard({ anime }: Props) {

  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(anime.mal_id);

  return (
    <div className="flex h-full items-stretch justify-center font-sans">
      <div
        className="relative group flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-500 hover:shadow-purple-500/10 sm:rounded-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          to={`/anime/${anime.mal_id}`}
          className="flex h-full flex-col"
        >
          {/* Image Section */}
          <div className="relative aspect-[3/4] min-h-64 overflow-hidden sm:min-h-72 lg:min-h-80">
            <img
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
              alt={anime.title}
              className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

            {/* Top Badges */}
            <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5">
              <span className="px-3 py-1.5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-purple-900/50">
                {anime.type ?? "Unknown"}
              </span>
              <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/10">
                HD
              </span>
            </div>

            {/* Title & Rating Overlay */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-yellow-400/90 px-2 py-0.5 rounded text-slate-950">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-black">{anime.score ?? "N/A"}</span>
                </div>
                <span className="text-slate-300 text-xs font-medium">Global Score</span>
              </div>

              <h1 className="line-clamp-2 text-xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-purple-400 sm:text-2xl">
                {anime.title}
              </h1>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
            {/* Quick Stats Grid */}
            <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="min-w-0 rounded-xl border border-slate-700/50 bg-slate-800/50 p-2 text-center sm:p-3">
                <Tv size={16} className="mx-auto mb-1 text-purple-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Format</p>
                <p className="truncate text-xs font-bold text-white">{anime.type ?? "Unknown"}</p>
              </div>
              <div className="min-w-0 rounded-xl border border-slate-700/50 bg-slate-800/50 p-2 text-center sm:p-3">
                <Layers size={16} className="mx-auto mb-1 text-blue-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Episodes</p>
                <p className="truncate text-xs font-bold text-white">{anime.episodes ?? "N/A"}</p>
              </div>
              <div className="min-w-0 rounded-xl border border-slate-700/50 bg-slate-800/50 p-2 text-center sm:p-3">
                <Clock size={16} className="mx-auto mb-1 text-emerald-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Status</p>
                <p className="truncate text-xs font-bold text-white">{anime.status ?? "Unknown"}</p>
              </div>
            </div>

            <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-400">
              {anime.synopsis ?? "No synopsis available."}
            </p>

            {/* Action Button */}
            <div className="group/btn relative mt-auto flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 sm:gap-3 sm:py-4">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <Play size={18} fill="currentColor" className="relative z-10" />
              <span className="relative z-10">Start Watching</span>
            </div>
          </div>

          {/* Sub-footer */}
          <div className="flex items-center justify-between border-t border-slate-800/50 bg-slate-950/50 px-4 py-4 sm:px-5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Studio:</span>
            <div className="flex gap-4">
              <Share2 size={16} className="text-slate-500 hover:text-purple-400 cursor-pointer transition-colors" />
              <Info size={16} className="text-slate-500 hover:text-purple-400 cursor-pointer transition-colors" />
            </div>
          </div>
        </Link>

        <button
          type="button"
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
          aria-pressed={favorite}
          onClick={() => {
            if (favorite) {
              removeFavorite(anime.mal_id);
            } else {
              addFavorite(anime);
            }
          }}
          className={`absolute right-4 top-4 rounded-xl p-3 backdrop-blur-xl transition-all duration-300 sm:right-5 sm:top-5 ${
            favorite
              ? 'bg-rose-500 text-white shadow-rose-500/40'
              : 'bg-black/20 text-white border border-white/10 hover:bg-black/40'
          }`}
        >
          <Heart size={20} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
