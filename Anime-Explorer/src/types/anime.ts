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
};