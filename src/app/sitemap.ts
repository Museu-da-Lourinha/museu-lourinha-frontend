import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://museu-lourinha.pt";

const LOCALES = ["pt", "en"] as const;

const SECTIONS = [
  "sobre-nos",
  "geal",
  "visitar",
  "loja-online",
  "guardioes",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages per locale
  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
        ),
      },
    });
  }

  // Section pages per locale
  for (const locale of LOCALES) {
    for (const section of SECTIONS) {
      entries.push({
        url: `${SITE_URL}/${locale}/${section}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}/${section}`])
          ),
        },
      });
    }
  }

  return entries;
}
