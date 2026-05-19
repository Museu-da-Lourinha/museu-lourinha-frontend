import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { search } from "@/lib/algolia";
import { SearchResults } from "@/components/SearchResults";
import type { SearchLocale } from "@/types/search";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q } = await searchParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Search");
  const query = (q ?? "").trim();

  const initial = query
    ? await search({
        locale: locale as SearchLocale,
        query,
        hitsPerPage: 20,
      })
    : { hits: [], nbHits: 0, page: 0, nbPages: 0, query: "" };

  return (
    <div className="min-h-screen bg-stone-50 font-sans dark:bg-stone-950">
      <div className="mx-auto max-w-4xl px-6 py-16 pt-32">
        <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
          {query ? t("resultsFor", { query }) : t("label")}
        </h1>

        <div className="mt-8">
          <SearchResults
            locale={locale as SearchLocale}
            query={query}
            initialHits={initial.hits}
            initialTotal={initial.nbHits}
          />
        </div>
      </div>
    </div>
  );
}
