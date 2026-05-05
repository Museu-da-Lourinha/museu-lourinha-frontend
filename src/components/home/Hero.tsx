import Image from "next/image";
import { useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const locale = useLocale();
  const isEn = locale === "en";
  const stats = isEn
    ? [
        { value: "25,000+", label: "Collection items" },
        { value: "150 m²", label: "Permanent exhibition" },
        { value: "1984", label: "Year founded" },
      ]
    : [
        { value: "25 000+", label: "Peças nas coleções" },
        { value: "150 m²", label: "Exposição permanente" },
        { value: "1984", label: "Ano de fundação" },
      ];

  return (
    <section
      className="relative overflow-hidden bg-paper"
      aria-label={isEn ? "Museu da Lourinhã introduction" : "Apresentação do Museu da Lourinhã"}
    >
      <Container>
        <div className="grid gap-10 pb-12 pt-12 md:gap-16 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-20 lg:pt-20">
          <div className="flex flex-col justify-between">
            <div>
              <Eyebrow>{isEn ? "No. 1 · 2026 Edition" : "N.º 1 · Edição 2026"}</Eyebrow>
              <h1 className="mt-6 font-display text-[44px] font-light leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[80px]">
                <span className="block font-display">{isEn ? "Where the Earth" : "Onde a Terra"}</span>
                <span className="block font-display italic text-[var(--color-accent)]">
                  {isEn ? "remembers." : "guarda memória."}
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-[1.75] text-ink-soft sm:text-[17px]">
                {isEn
                  ? "For more than four decades, Museu da Lourinhã has collected, studied and shared what the Jurassic, regional archaeology and local ethnography have to tell through visits, scientific research and education."
                  : "Há mais de quatro décadas que o Museu da Lourinhã reúne, estuda e devolve ao público o que o Jurássico, a arqueologia regional e a etnografia local têm para contar — através de visita, investigação científica e educação."}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/visita" size="lg">{isEn ? "Plan your visit" : "Planear visita"}</Button>
                <Button href="/investigacao" size="lg" variant="ghost">
                  {isEn ? "View research" : "Ver investigação"}
                </Button>
              </div>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-[var(--color-rule)] pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">{s.label}</dt>
                  <dd className="mt-2 font-display text-2xl font-light tracking-tight sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[3/4]">
              <Image
                src="/assets/home/hero.png"
                alt={isEn ? "Permanent exhibition at Museu da Lourinhã" : "Exposição permanente do Museu da Lourinhã"}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="noise-overlay" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden bg-[var(--color-accent)] px-5 py-4 text-ink shadow-soft sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em]">{isEn ? "On display" : "Em cartaz"}</p>
              <p className="mt-1 font-display text-base font-medium">
                {isEn ? "Atalaia Allosaurus · Room 02" : "Allossauro Atalaiense · Sala 02"}
              </p>
            </div>
            <div className="absolute right-0 top-6 hidden flex-col items-end gap-1 text-right text-[10px] font-medium uppercase tracking-[0.28em] text-ink-faint md:flex">
              <span>38°44′ N</span>
              <span>9°18′ O</span>
              <span aria-hidden="true" className="mt-2 h-8 w-px bg-[var(--color-rule-strong)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
