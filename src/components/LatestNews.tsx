import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { strapiClient } from "@/lib/strapi";
import type { NewsItem, NewsResponse } from "@/types/strapi";

const NEWS_QUERY = `
  query {
    newsItems {
      documentId
      title
      slug
      publishedAt
    }
  }
`;

async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const data = await strapiClient.request<NewsResponse>(NEWS_QUERY);
    const items = data?.newsItems ?? [];
    return [...items]
      .sort((a, b) => {
        const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 3);
  } catch {
    return [];
  }
}

export async function LatestNews({ locale }: { locale: string }) {
  const t = await getTranslations("LatestNews");
  const news = await getLatestNews();
  const dateLocale = locale === "pt" ? "pt-PT" : "en-GB";

  return (
    <section
      aria-labelledby="latest-news-heading"
      className="bg-stone-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2
              id="latest-news-heading"
              className="font-display text-3xl font-bold text-stone-900 sm:text-4xl"
            >
              {t("heading")}
            </h2>
            <p className="mt-3 text-base text-stone-600 sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
          {news.length > 0 && (
            <Link
              href="/noticias"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              {t("viewAll")} →
            </Link>
          )}
        </div>

        {news.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center">
            <p className="text-stone-500">{t("empty")}</p>
          </div>
        ) : (
          <ul role="list" className="mt-10 grid gap-6 md:grid-cols-3">
            {news.map((item) => (
              <li key={item.documentId}>
                <Link
                  href={`/noticias/${item.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.publishedAt && (
                    <time
                      dateTime={item.publishedAt}
                      className="text-xs font-medium uppercase tracking-wider text-stone-500"
                    >
                      {new Date(item.publishedAt).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                  <h3 className="font-display mt-3 text-lg font-semibold text-stone-900 group-hover:text-primary">
                    {item.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
