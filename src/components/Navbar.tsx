"use client";

import Image from "next/image";
import { useState } from "react";
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
      { key: "mesaAssembleia", subKey: "mesaAssembleia", href: "/geal#mesa-assembleia-geral" },
      { key: "direccao", subKey: "direccao", href: "/geal#direccao" },
      { key: "conselhoFiscal", subKey: "conselhoFiscal", href: "/geal#conselho-fiscal" },
      { key: "conselhoCientifico", subKey: "conselhoCientifico", href: "/geal#conselho-cientifico" },
      { key: "colaboracoes", subKey: "colaboracoes", href: "/geal#colaboracoes" },
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
  { key: "lojaOnline", href: "/loja-online" },
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

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (item: NavItem) => pathname === item.href;

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-0 right-0 top-0 z-50 overflow-visible bg-transparent backdrop-blur-md backdrop-saturate-150"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-end px-6 py-2 pl-40 sm:pl-44">
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

          <SearchBar locale={locale as SearchLocale} />

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
