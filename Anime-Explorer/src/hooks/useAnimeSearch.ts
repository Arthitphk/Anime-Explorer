import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Anime } from "../types/anime";
import type { AnimeFilters } from "../types/animeFilters";

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
  filters: AnimeFilters,
) {
  return useQuery<AnimeSearchResponse>({
    queryKey: ["anime-search", search, page, filters],
    queryFn: async () => {
      const { data } = await api.get("/anime", {
        params: {
          q: search,
          page,
          limit: 12,
          type: filters.type === "all" ? undefined : filters.type,
          status: filters.status === "all" ? undefined : filters.status,
          order_by: filters.orderBy,
          sort: filters.sort,
        },
      });

      return data;
    },
    enabled: search.trim().length > 0,
    placeholderData: (previousData) => previousData,
  });
}
