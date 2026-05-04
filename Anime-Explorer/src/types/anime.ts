export type AnimeGenre = {
  mal_id: number;
  name: string;
};

export type AnimeTrailer = {
  youtube_id?: string | null;
  url?: string | null;
  embed_url?: string | null;
};

export type Anime = {
  mal_id: number;
  title: string;
  title_english?: string | null;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score?: number | null;
  episodes?: number | null;
  status?: string | null;
  type?: string | null;
  synopsis?: string | null;
  year?: number | null;
  genres?: AnimeGenre[];
  trailer?: AnimeTrailer;
};