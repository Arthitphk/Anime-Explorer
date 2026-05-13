import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type { Anime } from "../types/anime";

const STORAGE_KEY = "favorite-anime";

type FavoritesProviderProps = {
  children: ReactNode;
};

function getStoredFavorites(): Anime[] {
  try {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(storedFavorites);
    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Anime[]>(getStoredFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (anime: Anime) => {
    setFavorites((prev) => {
      const alreadyExists = prev.some((item) => item.mal_id === anime.mal_id);

      if (alreadyExists) {
        return prev;
      }

      return [...prev, anime];
    });
  };

  const removeFavorite = (animeId: number) => {
    setFavorites((prev) => prev.filter((item) => item.mal_id !== animeId));
  };

  const isFavorite = (animeId: number) => {
    return favorites.some((item) => item.mal_id === animeId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
