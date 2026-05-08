"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { NavDropdown, type NavDropdownItem } from "@/components/NavDropdown";

type NavItem = {
  key: string;
  href: string;
  childKeys?: { key: string; subKey: string; href: string }[];
};

const NAV_TREE: NavItem[] = [
  {
    key: "museu",
    href: "/sobre-nos",
    childKeys: [
      { key: "sobreNos", subKey: "sobreNos", href: "/sobre-nos" },
      { key: "historia", subKey: "historia", href: "/sobre-nos#historia" },
      { key: "equipa", subKey: "equipa", href: "/sobre-nos#equipa" },
      { key: "missao", subKey: "missao", href: "/sobre-nos#missao" },
    ],
  },
  { key: "geal", href: "/geal" },
  {
    key: "visitar",
    href: "/visitar",
    childKeys: [
      { key: "horarios", subKey: "horarios", href: "/visitar#horarios" },
      { key: "comoChegar", subKey: "comoChegar", href: "/visitar#como-chegar" },
      { key: "acessibilidade", subKey: "acessibilidade", href: "/visitar#acessibilidade" },
    ],
  },
  {
    key: "investigacao",
    href: "/investigacao-cientifica",
    childKeys: [
      { key: "projetos", subKey: "projetos", href: "/investigacao-cientifica#projetos" },
      { key: "publicacoes", subKey: "publicacoes", href: "/investigacao-cientifica#publicacoes" },
      { key: "equipa", subKey: "equipa", href: "/investigacao-cientifica#equipa" },
    ],
  },
  {
    key: "guardioes",
    href: "/guardioes",
    childKeys: [
      { key: "tornarSe", subKey: "tornarSe", href: "/guardioes#tornar-se" },
      { key: "beneficios", subKey: "beneficios", href: "/guardioes#beneficios" },
      { key: "empresas", subKey: "empresas", href: "/guardioes#empresas" },
    ],
  },
];

const TRIGGER_CLASS = "py-4 text-white/90 transition-colors hover:text-white";
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
      <Link
        href="/"
        className="absolute bottom-3 left-8 z-10 translate-y-[calc(44%+5px)] sm:bottom-4 sm:left-10 sm:translate-y-[calc(44%+5px)]"
      >
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

      <div className="mx-auto flex max-w-7xl justify-end px-6 pb-2 pl-44 pt-3 sm:pl-52 sm:pt-3.5">
        <div className="flex flex-col items-end gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/loja-online"
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {t("lojaOnline")}
            </Link>

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
