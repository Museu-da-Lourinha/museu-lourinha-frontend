"use client";

import { Container } from "@/components/ui/Container";
import { usePathname, useRouter } from "@/i18n/navigation";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

type TopBarProps = {
  locale: string;
};

export function TopBar({ locale }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: string) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="bg-ink text-paper">
      <Container>
        <div className="flex h-9 items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em]">
          <ul className="hidden items-center gap-6 md:flex" role="list">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              <span>Aberto · Ter–Dom · 10–18h</span>
            </li>
            <li className="text-paper/70">Bilhete €5 · &lt;12 grátis</li>
            <li className="text-paper/70">Lourinhã · Portugal</li>
          </ul>
          <div className="flex items-center gap-3 md:hidden">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            <span>Aberto hoje 10–18h · €5</span>
          </div>
          <div
            className="flex items-center gap-1"
            role="group"
            aria-label="Selecionar idioma"
          >
            <button
              type="button"
              onClick={() => switchLocale("pt")}
              aria-current={locale === "pt" ? "true" : undefined}
              className={`rounded-xs px-2 py-1 transition ${focusRing} ${
                locale === "pt" ? "text-[var(--color-accent)]" : "text-paper/70 hover:text-paper"
              }`}
            >
              PT
            </button>
            <span aria-hidden="true" className="text-paper/40">/</span>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              aria-current={locale === "en" ? "true" : undefined}
              className={`rounded-xs px-2 py-1 transition ${focusRing} ${
                locale === "en" ? "text-[var(--color-accent)]" : "text-paper/70 hover:text-paper"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
