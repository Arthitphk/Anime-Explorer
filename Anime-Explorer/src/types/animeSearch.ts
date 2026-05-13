
//  TypeScript type สำหรับ filter ทั้งหมด
export type AnimeTypeFilter =
  | "all"
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music";



export type AnimeStatusFilter = "all" | "airing" | "complete" | "upcoming";


export type AnimeOrderByFilter =
  | "score"
  | "popularity"
  | "members"
  | "favorites"
  | "rank";

export type AnimeSortFilter = "desc" | "asc";



export type AnimeSearchFilters = {
  type: AnimeTypeFilter;
  status: AnimeStatusFilter;
  orderBy: AnimeOrderByFilter;
  sort: AnimeSortFilter;
};
