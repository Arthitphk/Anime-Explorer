export type AnimeType =
  | "all"
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music";

export type AnimeStatus = "all" | "airing" | "complete" | "upcoming";

export type AnimeOrderBy =
  | "score"
  | "popularity"
  | "members"
  | "favorites"
  | "rank";

export type AnimeSort = "desc" | "asc";

export type AnimeFilters = {
  type: AnimeType;
  status: AnimeStatus;
  orderBy: AnimeOrderBy;
  sort: AnimeSort;
};
