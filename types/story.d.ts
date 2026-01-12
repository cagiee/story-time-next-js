export interface IStory {
  id: string;
  slug: string;
  title: string;
  cover_image: string;
  created_at: string;
  content_preview: string;
  author: {
    id: string;
    name: string;
    profile_image: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
}
