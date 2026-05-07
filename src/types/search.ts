export type SearchLocale = "pt" | "en";

export type SearchType =
  | "news"
  | "exhibition"
  | "project"
  | "publication"
  | "team"
  | "static";

export type SearchRecord = {
  objectID: string;
  type: SearchType;
  title: string;
  excerpt: string;
  url: string;
  locale: SearchLocale;
  publishedAt?: string;
};

export type SearchHit = SearchRecord & {
  _highlightResult?: {
    title?: { value: string };
    excerpt?: { value: string };
  };
};

export type SearchResponse = {
  hits: SearchHit[];
  nbHits: number;
  page: number;
  nbPages: number;
  query: string;
};
