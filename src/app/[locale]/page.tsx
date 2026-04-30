import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { strapiClient } from "@/lib/strapi";
import type { NewsResponse } from "@/types/strapi";

const NEWS_QUERY = `
  query {
    newsItems {
      documentId
      title
      content
      slug
      publishedAt
    }
  }
`;

async function getNews() {
  try {
    const data = await strapiClient.request<NewsResponse>(NEWS_QUERY);
    return data?.newsItems ?? [];
  } catch {
    return [];
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const news = await getNews();

  return (
    <div className="min-h-screen bg-stone-50 font-sans dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-16">
          <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {t("title")}
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">{t("welcome")}</p>
        </header>

        <section aria-labelledby="news-heading">
          <h2 id="news-heading" className="font-display mb-6 text-xl font-semibold text-stone-800 dark:text-stone-200">
            {t("news")}
          </h2>
          {news.length === 0 ? (
            <div className="rounded-lg border border-dashed border-stone-300 dark:border-stone-600 p-8 text-center">
              <p className="text-stone-600 dark:text-stone-400">
                {t("noNews")}{" "}
                <code className="rounded bg-stone-200 dark:bg-stone-700 px-1">
                  cd cms && npm run develop
                </code>
                ,{" "}
                <a
                  href="http://localhost:1337/admin"
                  className="font-medium text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  localhost:1337/admin
                </a>
                . {t("setupHint")}
              </p>
            </div>
          ) : (
            <ul className="space-y-6" role="list">
              {news.map((item) => (
                <li
                  key={item.documentId}
                  className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6"
                >
                  <Link
                    href={`/news/${item.slug}`}
                    className="block hover:opacity-80"
                  >
                    <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-100">
                      {item.title}
                    </h3>
                    {item.publishedAt && (
                      <time
                        dateTime={item.publishedAt}
                        className="mt-1 block text-sm text-stone-500"
                      >
                        {new Date(item.publishedAt).toLocaleDateString(
                          locale === "pt" ? "pt-PT" : "en-GB"
                        )}
                      </time>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
