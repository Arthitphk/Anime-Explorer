import { Link } from "react-router-dom";
import type { Anime } from "../types/anime";
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
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="block "
    >
    
      <div className="flex items-center justify-center p-6 font-sans ">
        <div
          className="relative group w-full max-w-md bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-purple-500/10 border border-slate-800"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <div className="relative h-[420px] overflow-hidden">
            <img
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
              alt={anime.title}
              className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="px-3 py-1.5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-purple-900/50">
                {anime.type}
              </span>
              <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/10">
                HD
              </span>
            </div>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`absolute top-6 right-6 p-3 rounded-2xl backdrop-blur-xl transition-all duration-300 ${isLiked ? 'bg-rose-500 text-white shadow-rose-500/40' : 'bg-black/20 text-white border border-white/10 hover:bg-black/40'
                }`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            </button>

            {/* Title & Rating Overlay */}
            <div className="absolute bottom-6 left-8 right-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-yellow-400/90 px-2 py-0.5 rounded text-slate-950">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-black">{anime.score ?? "N/A"}</span>
                </div>
                <span className="text-slate-300 text-xs font-medium">Global Score</span>
              </div>

              <h1 className="text-3xl font-black text-white leading-none tracking-tight group-hover:text-purple-400 transition-colors duration-300">
                {anime.title}
              </h1>
            </div>
          </div>

          {/* Info Section */}
          <div className="px-8 pb-8 pt-4">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 text-center">
                <Tv size={16} className="mx-auto mb-1 text-purple-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Format</p>
                <p className="text-xs text-white font-bold">{anime.type ?? "Unknown"}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 text-center">
                <Layers size={16} className="mx-auto mb-1 text-blue-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Episodes</p>
                <p className="text-xs text-white font-bold">{anime.episodes}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 text-center">
                <Clock size={16} className="mx-auto mb-1 text-emerald-400" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Status</p>
                <p className="text-xs text-white font-bold truncate">Finished</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">
              {anime.episodes}
            </p>

            {/* Action Button */}
            <button className="w-full group/btn relative flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <Play size={18} fill="currentColor" className="relative z-10" />
              <span className="relative z-10">Start Watching</span>
            </button>
          </div>

          {/* Sub-footer */}
          <div className="px-8 py-4 bg-slate-950/50 border-t border-slate-800/50 flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Studio:</span>
            <div className="flex gap-4">
              <Share2 size={16} className="text-slate-500 hover:text-purple-400 cursor-pointer transition-colors" />
              <Info size={16} className="text-slate-500 hover:text-purple-400 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}