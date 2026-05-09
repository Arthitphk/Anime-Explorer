import { useCallback, useEffect, useState } from "react";
import type { Anime } from "../types/anime";

const STORAGE_KEY = "favorite-anime";
const FAVORITES_CHANGED_EVENT = "favorite-anime-changed";

function readFavorites() {
  const storedFavorites = localStorage.getItem(STORAGE_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    return JSON.parse(storedFavorites) as Anime[];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: Anime[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Anime[]>(() => readFavorites());

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(readFavorites());
    };

    window.addEventListener("storage", syncFavorites);
    window.addEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
    };
  }, []);

  const addFavorite = useCallback((anime: Anime) => {
    setFavorites((prev) => {
      const alreadyExists = prev.some((item) => item.mal_id === anime.mal_id);

      if (alreadyExists) {
        return prev;
      }

      const nextFavorites = [...prev, anime];
      saveFavorites(nextFavorites);
      return nextFavorites;
    });
  }, []);

  const removeFavorite = useCallback((animeId: number) => {
    setFavorites((prev) => {
      const nextFavorites = prev.filter((item) => item.mal_id !== animeId);
      saveFavorites(nextFavorites);
      return nextFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (animeId: number) => {
      return favorites.some((item) => item.mal_id === animeId);
    },
    [favorites],
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
