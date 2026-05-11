import { createContext } from "react";
import type { Anime } from "../types/anime";

export type FavoritesContextValue = {
  favorites: Anime[];
  addFavorite: (anime: Anime) => void;
  removeFavorite: (animeId: number) => void;
  isFavorite: (animeId: number) => boolean;
};

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);
