import AnimeCard from "../components/AnimeCard";
import { useTopAnime } from "../hooks/useTopAnime";

  


export default function Home() {

  const { data, isLoading, isError, isFetching } = useTopAnime();


  if (isLoading) {
    return <p className="text-slate-300">Loading...</p>;
  }

  if (isError) {
    return <p className="text-slate-300">Error loading anime list.</p>;
  }
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Top Anime</h2>
        <p className="text-slate-600">
          Explore top-rated anime from MyAnimeList.
        </p>
      </div>

      {isFetching && <p className="text-slate-300 mb-4">Updating...</p>}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-4 sm:gap-5 xl:gap-8">
        {data?.data.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
