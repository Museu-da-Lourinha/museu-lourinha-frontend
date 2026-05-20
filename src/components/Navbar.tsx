"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { NavDropdown, type NavDropdownItem } from "@/components/NavDropdown";
import { SearchBar } from "@/components/SearchBar";
import type { SearchLocale } from "@/types/search";

type NavItem = {
  key: string;
  href: string;
  childKeys?: { key: string; subKey: string; href: string }[];
};

const NAV_TREE: NavItem[] = [
  {
    key: "museu",
    href: "/museu",
    childKeys: [
      { key: "sobreNos", subKey: "sobreNos", href: "/museu#sobre-nos" },
      { key: "missao", subKey: "missao", href: "/museu#missao" },
      { key: "exposicoes", subKey: "exposicoes", href: "/exposicoes" },
      { key: "equipa", subKey: "equipa", href: "/museu#equipa" },
    ],
  },
  {
    key: "geal",
    href: "/geal",
    childKeys: [
      { key: "historiaFundadores", subKey: "historiaFundadores", href: "/geal#historia-fundadores" },
      { key: "areasAtuacao", subKey: "areasAtuacao", href: "/geal#areas-de-atuacao" },
      { key: "estatutos", subKey: "estatutos", href: "/geal#estatutos" },
      { key: "orgaosSociais", subKey: "orgaosSociais", href: "/geal#orgaos-sociais" },
    ],
  },
  {
    key: "visitar",
    href: "/visitar",
    childKeys: [
      { key: "planearVisita", subKey: "planearVisita", href: "/visitar#planear-visita" },
      { key: "bilheteira", subKey: "bilheteira", href: "/bilheteira" },
      { key: "visitasEscolares", subKey: "visitasEscolares", href: "/visitar#visitas-escolares" },
      { key: "ondeEstamos", subKey: "ondeEstamos", href: "/visitar#onde-estamos" },
      { key: "mapaMuseu", subKey: "mapaMuseu", href: "/visitar#mapa-do-museu" },
      { key: "acessibilidade", subKey: "acessibilidade", href: "/visitar#acessibilidade" },
      { key: "horario", subKey: "horario", href: "/visitar#horario" },
    ],
  },
  {
    key: "investigacao",
    href: "/investigacao-cientifica",
    childKeys: [
      { key: "investigacao", subKey: "investigacao", href: "/investigacao-cientifica#investigacao" },
      { key: "equipaInvestigacao", subKey: "equipaInvestigacao", href: "/investigacao-cientifica#equipa-de-investigacao" },
      { key: "projectosInvestigacao", subKey: "projectosInvestigacao", href: "/investigacao-cientifica#projectos-de-investigacao" },
      { key: "artigosCientificos", subKey: "artigosCientificos", href: "/investigacao-cientifica#artigos-cientificos" },
      { key: "laboratorio", subKey: "laboratorio", href: "/investigacao-cientifica#laboratorio" },
      { key: "coleccoes", subKey: "coleccoes", href: "/investigacao-cientifica#coleccoes" },
    ],
  },
  {
    key: "guardioes",
    href: "/guardioes",
    childKeys: [
      { key: "comoApoiar", subKey: "comoApoiar", href: "/guardioes#como-apoiar" },
      { key: "apoioCorporativo", subKey: "apoioCorporativo", href: "/guardioes#apoio-corporativo" },
      { key: "doar", subKey: "doar", href: "/guardioes#doar" },
      { key: "serVoluntario", subKey: "serVoluntario", href: "/guardioes#ser-voluntario" },
    ],
  },
];

const TRIGGER_CLASS = "py-4 font-semibold text-white/90 transition-colors hover:text-white";
const UNDERLINE_CLASS = "bg-verde-lima";
const PANEL_CLASS = "bg-black/40 text-white backdrop-blur-md backdrop-saturate-150";
const ITEM_CLASS = "border-b border-white/15 last:border-0 hover:bg-white/10 focus-visible:bg-white/10";

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  const tSub = useTranslations("NavSub");
  const pathname = usePathname();
  const router = useRouter();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [langIndicator, setLangIndicator] = useState<"pt" | "en">(() =>
    locale === "en" ? "en" : "pt",
  );

  useEffect(() => {
    setLangIndicator(locale === "en" ? "en" : "pt");
  }, [locale]);

  const switchLocale = (newLocale: string) => {
    const next = newLocale === "en" ? "en" : "pt";
    if (next === langIndicator) return;
    setLangIndicator(next);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        router.replace(pathname, { locale: newLocale });
      });
    });
  };

  const lang = langIndicator;

  const isActive = (item: NavItem) => pathname === item.href;

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-0 right-0 top-0 z-50 overflow-visible bg-transparent backdrop-blur-md backdrop-saturate-150"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 sm:py-3.5">
        <Link href="/" className="flex shrink-0 items-center">
          <img
            src="/assets/images/museum-logo-asset-6.svg"
            alt="Museu da Lourinhã"
            width={250}
            height={124}
            decoding="async"
            fetchPriority="high"
            className="h-[3.375rem] w-auto max-w-[14.25rem] object-contain object-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:h-[4.75rem] sm:max-w-[16.75rem]"
          />
        </Link>

        <div className="flex flex-col items-end gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/loja-online"
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {t("lojaOnline")}
            </Link>

            <SearchBar locale={locale as SearchLocale} />

            <div
              className="relative inline-flex overflow-hidden rounded-none border border-white/45"
              role="group"
              aria-label="Language selector"
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-white will-change-transform motion-reduce:transition-none motion-reduce:duration-0 ${
                  lang === "pt" ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-500 ease-out`}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1 bottom-1 z-[1] w-px -translate-x-1/2 bg-white/35"
              />
              <button
                type="button"
                onClick={() => switchLocale("pt")}
                aria-current={lang === "pt" ? "true" : undefined}
                aria-label="Português"
                className={`relative z-10 min-w-[2.75rem] flex-1 px-2 py-0.5 text-sm font-medium uppercase tracking-wide transition-colors duration-500 ease-out motion-reduce:transition-none ${
                  lang === "pt"
                    ? "text-primary"
                    : "text-white/75 hover:text-white"
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                aria-current={lang === "en" ? "true" : undefined}
                aria-label="English"
                className={`relative z-10 min-w-[2.75rem] flex-1 px-2 py-0.5 text-sm font-medium uppercase tracking-wide transition-colors duration-500 ease-out motion-reduce:transition-none ${
                  lang === "en"
                    ? "text-primary"
                    : "text-white/75 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <ul className="flex items-center justify-end gap-6" role="list">
            {NAV_TREE.map((item) => {
              const active = isActive(item);

              if (!item.childKeys?.length) {
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-block ${TRIGGER_CLASS}`}
                    >
                      {t(item.key)}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 ease-out ${UNDERLINE_CLASS} ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              }

              const dropdownItems: NavDropdownItem[] = item.childKeys.map((c) => ({
                key: c.key,
                label: tSub(`${item.key}.${c.subKey}`),
                href: c.href,
              }));

              return (
                <li key={item.key}>
                  <NavDropdown
                    label={t(item.key)}
                    items={dropdownItems}
                    active={active}
                    open={openKey === item.key}
                    onOpenChange={(next) => setOpenKey(next ? item.key : null)}
                    triggerHref={item.href}
                    triggerClassName={TRIGGER_CLASS}
                    underlineClassName={UNDERLINE_CLASS}
                    panelClassName={PANEL_CLASS}
                    itemClassName={ITEM_CLASS}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
