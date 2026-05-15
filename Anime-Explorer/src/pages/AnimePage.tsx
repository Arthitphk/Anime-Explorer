import { useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import { useDebounce } from "../hooks/useDebounce";
import type {
  AnimeFilters,
  AnimeOrderBy,
  AnimeSort,
  AnimeStatus,
  AnimeType,
} from "../types/animeFilters";

const typeOptions: { label: string; value: AnimeType }[] = [
  { label: "All types", value: "all" },
  { label: "TV", value: "tv" },
  { label: "Movie", value: "movie" },
  { label: "OVA", value: "ova" },
  { label: "Special", value: "special" },
  { label: "ONA", value: "ona" },
  { label: "Music", value: "music" },
];

const statusOptions: { label: string; value: AnimeStatus }[] = [
  { label: "All status", value: "all" },
  { label: "Airing", value: "airing" },
  { label: "Complete", value: "complete" },
  { label: "Upcoming", value: "upcoming" },
];

const orderByOptions: { label: string; value: AnimeOrderBy }[] = [
  { label: "Score", value: "score" },
  { label: "Popularity", value: "popularity" },
  { label: "Members", value: "members" },
  { label: "Favorites", value: "favorites" },
  { label: "Rank", value: "rank" },
];

const sortOptions: { label: string; value: AnimeSort }[] = [
  { label: "Desc", value: "desc" },
  { label: "Asc", value: "asc" },
];

const defaultFilters: AnimeFilters = {
  type: "all",
  status: "all",
  orderBy: "score",
  sort: "desc",
};

export default function AnimePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<AnimeFilters>(defaultFilters);

  const debounceSearch = useDebounce(search, 500);

  const { data, isLoading, isError, isFetching } = useAnimeSearch(debounceSearch, page, filters);

  const hasSearch = debounceSearch.trim().length > 0;

  const updateFilter = <Key extends keyof AnimeFilters>(
    key: Key,
    value: AnimeFilters[Key],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Anime Search</h2>
        <p className="text-slate-600">Search anime titles from Jikan API.</p>
      </div>

      <div className="mb-6 space-y-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search anime, e.g. Naruto, One Piece..."
          className="w-full rounded-lg border border-slate-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="text-sm font-medium text-slate-700">
            Type
            <select
              value={filters.type}
              onChange={(e) =>
                updateFilter("type", e.target.value as AnimeType)
              }
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Status
            <select
              value={filters.status}
              onChange={(e) =>
                updateFilter("status", e.target.value as AnimeStatus)
              }
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Order by
            <select
              value={filters.orderBy}
              onChange={(e) =>
                updateFilter("orderBy", e.target.value as AnimeOrderBy)
              }
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {orderByOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Sort
            <select
              value={filters.sort}
              onChange={(e) =>
                updateFilter("sort", e.target.value as AnimeSort)
              }
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {!hasSearch && (
        <p className="text-slate-500">Type something to search anime.</p>
      )}

      {isLoading && <p className="text-slate-600">Searching anime...</p>}

      {isError && (
        <p className="text-red-500">Failed to search anime. Please try again.</p>
      )}

      {hasSearch && !isLoading && data?.data.length === 0 && (
        <p className="text-slate-500">No anime found.</p>
      )}

      {data && (
        <>
          {isFetching && !isLoading && (
            <p className="mb-4 text-sm text-slate-500">Updating...</p>
          )}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-4 sm:gap-5 xl:gap-6">
            {data.data.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              className="rounded bg-slate-300 px-4 py-2 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-slate-600">
              Page {page} / {data.pagination.last_visible_page}
            </span>

            <button
              type="button"
              disabled={!data.pagination.has_next_page}
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="rounded bg-slate-300 px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
