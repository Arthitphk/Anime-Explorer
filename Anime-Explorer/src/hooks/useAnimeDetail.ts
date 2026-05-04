import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Anime } from "../types/anime";

// กำหนดรูปแบบ response จาก API
type AnimeDetailResponse = {
  data: Anime;
};

export function useAnimeDetail(id: string | undefined) {
  return useQuery<AnimeDetailResponse>({
    queryKey: ["anime-detail", id],
    queryFn: async () => {
      const { data } = await api.get(`/anime/${id}/full`);
      return data;
    },
    enabled: Boolean(id),
  });
}