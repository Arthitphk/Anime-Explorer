import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Anime } from "../types/anime";

type TopAnimeResponse = {
  data: Anime[];
};

export function useTopAnime() {
  return useQuery<TopAnimeResponse>({
    queryKey: ["top-anime"],
    queryFn: async () => {
      const { data } = await api.get("/top/anime", {
        params: {
          limit: 12,
        },
      });

      return data;
    },
  });
}