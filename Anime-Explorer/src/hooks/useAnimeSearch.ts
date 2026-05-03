import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Anime } from "../types/anime"


// type ของdataที่จะดึง
type AnimeSearchResponse = {
    data: Anime[];
    pagination: {
      current_page: number;
      has_next_page: boolean;
      last_visible_page:number;
    };
};

export function useAnimeSearch(search: string, page: number) {
    return useQuery<AnimeSearchResponse>({
        queryKey: ["anime-search", search, page],
        queryFn: async () => {
         const { data } = await api.get("/anime", {
            params: {
                q: search,
                page,
                limit: 12,
            },
         });
         return data;
        },
        enabled: search.trim().length > 0,
        placeholderData: (previousData) => previousData,
    });
}