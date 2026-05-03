import { useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import  { useDebounce } from "../hooks/useDebounce";

export default function AnimePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debounceSearch = useDebounce(search, 500);

  const { data, isLoading, isError,isFetching } = useAnimeSearch(
    debounceSearch,
    page
  );

  const hasSearch = debounceSearch.trim().length > 0;

   return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Anime Search</h2>
        <p className="text-slate-600">
          Search anime titles from Jikan API.
        </p>
      </div>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search anime, e.g. Naruto, One Piece..."
        className="w-full rounded-lg border border-slate-300 bg-white p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {!hasSearch && (
        <p className="text-slate-500">
          Type something to search anime.
        </p>
      )}

      {isLoading && <p className="text-slate-600">Searching anime...</p>}

      {isError && (
        <p className="text-red-500">
          Failed to search anime. Please try again.
        </p>
      )}

      {hasSearch && !isLoading && data?.data.length === 0 && (
        <p className="text-slate-500">No anime found.</p>
      )}

      {data && (
        <>
          {isFetching && !isLoading && (
            <p className="mb-4 text-sm text-slate-500">Updating...</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {data.data.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="rounded bg-slate-300 px-4 py-2 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-slate-600">
              Page {page} / {data.pagination.last_visible_page}
            </span>

            <button
              disabled={!data.pagination.has_next_page}
              onClick={() => setPage((p) => p + 1)}
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