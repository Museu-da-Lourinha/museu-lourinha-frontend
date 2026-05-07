"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { search } from "@/lib/algolia";
import type { SearchHit, SearchLocale } from "@/types/search";

type Props = {
  locale: SearchLocale;
};

const DEBOUNCE_MS = 250;
const MIN_CHARS = 2;
const DROPDOWN_HITS = 5;

export function SearchBar({ locale }: Props) {
  const t = useTranslations("Search");
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!expanded) return;
    inputRef.current?.focus();
  }, [expanded]);

  useEffect(() => {
    if (query.trim().length < MIN_CHARS) {
      setHits([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const id = window.setTimeout(async () => {
      try {
        const res = await search({
          locale,
          query: query.trim(),
          hitsPerPage: DROPDOWN_HITS,
        });
        if (controller.signal.aborted) return;
        setHits(res.hits);
        setOpen(true);
        setActiveIndex(-1);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Search failed", err);
          setHits([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(id);
    };
  }, [query, locale]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const submit = (q: string) => {
    if (!q.trim()) return;
    setOpen(false);
    setExpanded(false);
    router.push({ pathname: "/pesquisa", query: { q: q.trim() } });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open && hits.length > 0) setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && hits[activeIndex]) {
        const hit = hits[activeIndex];
        setOpen(false);
        setExpanded(false);
        router.push(hit.url);
      } else {
        submit(query);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (open) {
        setOpen(false);
      } else {
        setExpanded(false);
        inputRef.current?.blur();
      }
    }
  };

  const showDropdown = expanded && open && query.trim().length >= MIN_CHARS;
  const optionId = (i: number) => `${listboxId}-option-${i}`;

  return (
    <div ref={containerRef} className="relative">
      {!expanded && (
        <button
          type="button"
          aria-label={t("openLabel")}
          onClick={() => setExpanded(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <SearchIcon />
        </button>
      )}

      {expanded && (
        <div
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-owns={listboxId}
          className="flex items-center"
        >
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              type="search"
              role="searchbox"
              aria-label={t("label")}
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-activedescendant={
                activeIndex >= 0 ? optionId(activeIndex) : undefined
              }
              placeholder={t("placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => {
                if (hits.length > 0) setOpen(true);
              }}
              className="w-64 rounded-full border border-white/30 bg-black/30 py-2 pl-10 pr-9 text-sm text-white placeholder:text-white/60 backdrop-blur-md focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 sm:w-72"
            />
            {query && (
              <button
                type="button"
                aria-label={t("closeLabel")}
                onClick={() => {
                  setQuery("");
                  setHits([]);
                  setOpen(false);
                  inputRef.current?.focus();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-white/70 hover:bg-white/15 hover:text-white"
              >
                <CloseIcon />
              </button>
            )}
          </div>

          {showDropdown && (
            <ul
              id={listboxId}
              role="listbox"
              aria-label={t("label")}
              className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg bg-black/85 text-white shadow-2xl backdrop-blur-md sm:w-96"
            >
              {loading && hits.length === 0 ? (
                <li className="px-4 py-3 text-sm text-white/70">
                  {t("loading")}
                </li>
              ) : hits.length === 0 ? (
                <li className="px-4 py-3 text-sm text-white/70">
                  {t("noResults", { query: query.trim() })}
                </li>
              ) : (
                <>
                  {hits.map((hit, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <li
                        key={hit.objectID}
                        id={optionId(i)}
                        role="option"
                        aria-selected={isActive}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`border-b border-white/10 last:border-0 ${
                          isActive ? "bg-white/15" : ""
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            setExpanded(false);
                            router.push(hit.url);
                          }}
                          className="block w-full px-4 py-3 text-left"
                        >
                          <div className="text-xs uppercase tracking-wide text-white/60">
                            {t(`filter${capitalize(hit.type)}` as never)}
                          </div>
                          <div className="mt-0.5 text-sm font-semibold">
                            {hit.title}
                          </div>
                          {hit.excerpt && (
                            <div className="mt-1 line-clamp-2 text-xs text-white/75">
                              {hit.excerpt}
                            </div>
                          )}
                        </button>
                      </li>
                    );
                  })}
                  <li className="border-t border-white/15">
                    <button
                      type="button"
                      onClick={() => submit(query)}
                      className="block w-full px-4 py-3 text-left text-sm font-semibold text-verde-lima hover:bg-white/10"
                    >
                      {t("viewAll")} →
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
