import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Anime } from "../types/anime";
import type { AnimeSearchFilters } from "../types/animeSearch";

type AnimeSearchResponse = {
  data: Anime[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
    last_visible_page: number;
  };
};

export function useAnimeSearch(
  search: string,
  page: number,
  filters: AnimeSearchFilters,
) {
  return useQuery<AnimeSearchResponse>({
    queryKey: ["anime-search", search, page, filters],
    queryFn: async () => {
      const { data } = await api.get("/anime", {
        params: {
          q: search,
          page,
          limit: 12,
          order_by: filters.orderBy,
          sort: filters.sort,
          ...(filters.type !== "all" ? { type: filters.type } : {}),
          ...(filters.status !== "all" ? { status: filters.status } : {}),
        },
      });

      return data;
    },
    enabled: search.trim().length > 0,
    placeholderData: (previousData) => previousData,
  });
}
