import { algoliasearch } from "algoliasearch";
import type { SearchHit, SearchLocale, SearchResponse, SearchType } from "@/types/search";

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

export function getIndexName(locale: SearchLocale): string {
  return `content_${locale}`;
}

export function isAlgoliaConfigured(): boolean {
  return Boolean(APP_ID && SEARCH_KEY);
}

let cachedClient: ReturnType<typeof algoliasearch> | null = null;

function getClient() {
  if (!APP_ID || !SEARCH_KEY) {
    throw new Error(
      "Algolia is not configured. Set NEXT_PUBLIC_ALGOLIA_APP_ID and NEXT_PUBLIC_ALGOLIA_SEARCH_KEY."
    );
  }
  if (!cachedClient) {
    cachedClient = algoliasearch(APP_ID, SEARCH_KEY);
  }
  return cachedClient;
}

export type SearchOptions = {
  locale: SearchLocale;
  query: string;
  hitsPerPage?: number;
  page?: number;
  typeFilter?: SearchType | null;
  signal?: AbortSignal;
};

export async function search({
  locale,
  query,
  hitsPerPage = 5,
  page = 0,
  typeFilter = null,
}: SearchOptions): Promise<SearchResponse> {
  if (!isAlgoliaConfigured()) {
    return { hits: [], nbHits: 0, page: 0, nbPages: 0, query };
  }

  const client = getClient();
  const facetFilters = typeFilter ? [`type:${typeFilter}`] : undefined;

  const response = await client.searchSingleIndex<SearchHit>({
    indexName: getIndexName(locale),
    searchParams: {
      query,
      hitsPerPage,
      page,
      facetFilters,
      attributesToHighlight: ["title", "excerpt"],
      highlightPreTag: "<mark>",
      highlightPostTag: "</mark>",
    },
  });

  return {
    hits: response.hits,
    nbHits: response.nbHits ?? 0,
    page: response.page ?? 0,
    nbPages: response.nbPages ?? 0,
    query: response.query ?? query,
  };
}
