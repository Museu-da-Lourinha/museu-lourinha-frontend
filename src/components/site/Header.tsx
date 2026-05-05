"use client";

import { useCallback, useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";

const NAV_PT = [
  { label: "Sobre", href: "/sobre" },
  { label: "Museu", href: "/" },
  { label: "GEAL", href: "/sobre#cronologia" },
  { label: "Visitar", href: "/visita" },
  { label: "Investigação Científica", href: "/investigacao" },
  { label: "Guardião do Museu", href: "/guardiao-do-museu" },
  { label: "Loja", href: "/loja" },
] as const;

const NAV_EN = [
  { label: "About", href: "/sobre" },
  { label: "Museum", href: "/" },
  { label: "GEAL", href: "/sobre#cronologia" },
  { label: "Visit", href: "/visita" },
  { label: "Scientific Research", href: "/investigacao" },
  { label: "Museum Guardian", href: "/guardiao-do-museu" },
  { label: "Shop", href: "/loja" },
] as const;

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

type HeaderProps = {
  locale: string;
};

export function Header({ locale }: HeaderProps) {
  const isEn = locale === "en";
  const NAV = isEn ? NAV_EN : NAV_PT;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);
  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-sm focus:bg-ink focus:px-3 focus:py-1.5 focus:text-xs focus:font-semibold focus:text-paper ${focusRing}`}
      >
        {locale === "en" ? "Skip to content" : "Saltar para o conteúdo"}
      </a>
      <div
        className={`border-b transition-colors ${
          scrolled
            ? "bg-paper/75 backdrop-blur-sm border-[var(--color-rule)]"
            : "bg-paper border-transparent"
        }`}
      >
        <Container>
          <nav aria-label={isEn ? "Main navigation" : "Navegação principal"} className="flex h-[72px] items-center justify-between gap-4">
            <Link
              href="/"
              aria-label={isEn ? "Museu da Lourinhã homepage" : "Página inicial Museu da Lourinhã"}
              className={`group flex items-center gap-3 text-ink ${focusRing}`}
            >
              <Logo size={42} />
              <span className="hidden flex-col leading-[1.05] sm:flex">
                <span className="font-display text-[17px] font-medium tracking-tight">Museu da Lourinhã</span>
                <span className="hidden text-[10px] font-medium uppercase tracking-[0.28em] text-ink-soft xl:block">
                  est. 1984 · GEAL
                </span>
              </span>
            </Link>

            <ul className="hidden items-center gap-0 lg:flex" role="list">
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative whitespace-nowrap px-2.5 py-2 text-[12px] font-medium tracking-tight transition lg:text-[13px] xl:px-3 xl:text-sm ${focusRing}`}
                    >
                      <span
                        className={`relative z-10 ${active ? "text-ink" : "text-ink-soft hover:text-ink"}`}
                      >
                        {item.label}
                      </span>
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 bottom-1 h-[2px] bg-[var(--color-accent)]"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/visita"
                className={`group hidden items-center gap-2 whitespace-nowrap bg-[var(--color-accent)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-[var(--color-accent-deep)] xl:inline-flex ${focusRing}`}
              >
                {isEn ? "Buy ticket" : "Comprar bilhete"}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                <Link
                  href={pathname}
                  locale="pt"
                  aria-current={locale === "pt" ? "true" : undefined}
                  className={`rounded-xs px-2 py-1 transition ${focusRing} ${
                    locale === "pt" ? "text-ink" : "hover:text-ink"
                  }`}
                >
                  PT
                </Link>
                <span aria-hidden="true" className="text-ink-faint">/</span>
                <Link
                  href={pathname}
                  locale="en"
                  aria-current={locale === "en" ? "true" : undefined}
                  className={`rounded-xs px-2 py-1 transition ${focusRing} ${
                    locale === "en" ? "text-ink" : "hover:text-ink"
                  }`}
                >
                  EN
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={locale === "en" ? (open ? "Close menu" : "Open menu") : (open ? "Fechar menu" : "Abrir menu")}
              className={`flex h-11 w-11 items-center justify-center border border-[var(--color-rule-strong)] text-ink lg:hidden ${focusRing}`}
            >
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span
                  className={`block h-[2px] w-5 bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span className={`block h-[2px] w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
                <span
                  className={`block h-[2px] w-5 bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </nav>
        </Container>

        {open ? (
          <div id="mobile-nav" className="border-t border-[var(--color-rule)] bg-paper lg:hidden">
            <Container>
              <ul className="flex flex-col py-3" role="list">
                {NAV.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.label} className="border-b border-[var(--color-rule)] last:border-0">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between py-4 text-base font-medium ${focusRing} ${
                          active ? "text-ink" : "text-ink-soft"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span aria-hidden="true" className="text-ink-faint">→</span>
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/visita"
                      onClick={closeMenu}
                      className={`inline-flex flex-1 items-center justify-center gap-2 bg-[var(--color-accent)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink ${focusRing}`}
                    >
                      {isEn ? "Buy ticket" : "Comprar bilhete"} →
                    </Link>
                    <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                      <Link
                        href={pathname}
                        locale="pt"
                        onClick={closeMenu}
                        aria-current={locale === "pt" ? "true" : undefined}
                        className={`rounded-xs px-2 py-1 transition ${focusRing} ${
                          locale === "pt" ? "text-ink" : "hover:text-ink"
                        }`}
                      >
                        PT
                      </Link>
                      <span aria-hidden="true" className="text-ink-faint">/</span>
                      <Link
                        href={pathname}
                        locale="en"
                        onClick={closeMenu}
                        aria-current={locale === "en" ? "true" : undefined}
                        className={`rounded-xs px-2 py-1 transition ${focusRing} ${
                          locale === "en" ? "text-ink" : "hover:text-ink"
                        }`}
                      >
                        EN
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </Container>
          </div>
        ) : null}
      </div>
    </header>
  );
}
