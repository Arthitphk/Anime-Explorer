import { useParams } from "react-router-dom";

export default function AnimeDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Anime Detail</h2>
      <p className="text-slate-600">Anime ID: {id}</p>
    </div>
  );
}