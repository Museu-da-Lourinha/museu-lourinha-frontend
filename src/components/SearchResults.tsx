"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { search } from "@/lib/algolia";
import type { SearchHit, SearchLocale, SearchType } from "@/types/search";

type Props = {
  locale: SearchLocale;
  query: string;
  initialHits: SearchHit[];
  initialTotal: number;
};

const TYPE_FILTERS: (SearchType | null)[] = [
  null,
  "news",
  "exhibition",
  "project",
  "publication",
  "team",
  "static",
];

const HITS_PER_PAGE = 20;

export function SearchResults({ locale, query, initialHits, initialTotal }: Props) {
  const t = useTranslations("Search");

  const [filter, setFilter] = useState<SearchType | null>(null);
  const [hits, setHits] = useState<SearchHit[]>(initialHits);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filter === null) {
      setHits(initialHits);
      setTotal(initialTotal);
      return;
    }

    setLoading(true);
    let cancelled = false;
    (async () => {
      try {
        const res = await search({
          locale,
          query,
          hitsPerPage: HITS_PER_PAGE,
          typeFilter: filter,
        });
        if (cancelled) return;
        setHits(res.hits);
        setTotal(res.nbHits);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filter, locale, query, initialHits, initialTotal]);

  if (!query.trim()) {
    return (
      <p className="text-stone-600 dark:text-stone-400">{t("emptyState")}</p>
    );
  }

  return (
    <div>
      <div className="mb-2 text-sm text-stone-500 dark:text-stone-400">
        {t("resultsCount", { count: total })}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {TYPE_FILTERS.map((f) => {
          const isActive = filter === f;
          const labelKey = f === null ? "filterAll" : `filter${capitalize(f)}`;
          return (
            <button
              key={f ?? "all"}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-stone-300 text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              }`}
            >
              {t(labelKey as never)}
            </button>
          );
        })}
      </div>

      {loading && (
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {t("loading")}
        </p>
      )}

      {!loading && hits.length === 0 && (
        <p className="text-stone-600 dark:text-stone-400">
          {t("noResults", { query })}
        </p>
      )}

      <ul className="divide-y divide-stone-200 dark:divide-stone-800">
        {hits.map((hit) => (
          <li key={hit.objectID} className="py-5">
            <Link
              href={hit.url}
              className="group block"
            >
              <div className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">
                {t(`filter${capitalize(hit.type)}` as never)}
              </div>
              <h2 className="mt-1 text-lg font-semibold text-stone-900 group-hover:text-primary dark:text-stone-100">
                {hit.title}
              </h2>
              {hit.excerpt && (
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                  {hit.excerpt}
                </p>
              )}
              <div className="mt-1 text-xs text-stone-400">{hit.url}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
