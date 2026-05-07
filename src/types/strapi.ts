// Strapi CMS content types

export type NewsItem = {
  documentId: string;
  title: string;
  content: string;
  slug: string;
  publishedAt: string | null;
};

export type NewsResponse = {
  newsItems: NewsItem[];
};

// Add more Strapi content types here as they are created in the CMS
