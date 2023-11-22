export interface Source {
  id: string | null;
  name: string;
}
export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
}
export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
export interface AdaptedNewsData {
  source: Source;
  author: string;
  title: string;
  description: string | null;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
}
