"use client";

import Image from "next/image";
import { useState } from "react";
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
    key: "sobreNos",
    href: "/sobre-nos",
    childKeys: [
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
  { key: "lojaOnline", href: "/loja-online" },
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

const TRIGGER_CLASS = "py-1 text-white/90 transition-colors hover:text-white";
const UNDERLINE_CLASS = "bg-verde-lima";
const PANEL_CLASS = "bg-white text-stone-800 ring-stone-200";
const ITEM_CLASS = "hover:bg-stone-50 hover:text-primary focus-visible:bg-stone-50 focus-visible:text-primary";

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  const tSub = useTranslations("NavSub");
  const pathname = usePathname();
  const router = useRouter();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (item: NavItem) => pathname === item.href;

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-0 right-0 top-0 z-50 overflow-visible bg-primary/60 backdrop-blur-sm"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-end px-6 py-6 pl-40 sm:pl-44">
        <Link href="/" className="absolute left-6 bottom-0 translate-y-1/2">
          <Image
            src="/assets/images/logo-white.svg"
            alt="Museu da Lourinhã"
            width={130}
            height={132}
            priority
            className="h-[7rem] w-auto object-contain sm:h-[8rem]"
          />
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6" role="list">
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

          <div
            className="flex items-center gap-1 border-l border-white/40 pl-6"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => switchLocale("pt")}
              aria-current={locale === "pt" ? "true" : undefined}
              aria-label="Português"
              className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
                locale === "pt"
                  ? "bg-white text-primary"
                  : "text-white/90 hover:bg-white/20 hover:text-white"
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              aria-current={locale === "en" ? "true" : undefined}
              aria-label="English"
              className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
                locale === "en"
                  ? "bg-white text-primary"
                  : "text-white/90 hover:bg-white/20 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
