import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Numeral } from "@/components/ui/Numeral";
import { Button } from "@/components/ui/Button";

type ChapterItem = {
  label: string;
  description: string;
};

type ChapterProps = {
  id?: string;
  number: string;
  eyebrow: string;
  title: string;
  lead: string;
  items: ChapterItem[];
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  ctaHref: string;
  ctaLabel: string;
  reverse?: boolean;
  tone?: "paper" | "soft";
};

export function Chapter({
  id,
  number,
  eyebrow,
  title,
  lead,
  items,
  imageSrc,
  imageAlt,
  caption,
  ctaHref,
  ctaLabel,
  reverse = false,
  tone = "paper",
}: ChapterProps) {
  const bg = tone === "soft" ? "bg-paper-soft" : "bg-paper";

  return (
    <section id={id} className={`relative ${bg}`} aria-labelledby={`${id}-title`}>
      <Container>
        <div className="border-t border-[var(--color-rule)]" />
        <div
          className={`grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 ${
            reverse ? "lg:[&>figure]:order-2" : ""
          }`}
        >
          <figure className={`relative lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-deep">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {caption ? (
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                {caption}
              </figcaption>
            ) : null}
          </figure>

          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="flex items-baseline gap-6">
              <Numeral value={number} className="text-[112px] sm:text-[160px] text-[var(--color-rule-strong)]" />
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h2
              id={`${id}-title`}
              className="mt-2 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-[56px]"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-ink-soft sm:text-lg">{lead}</p>

            <ul className="mt-10 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]" role="list">
              {items.map((item) => (
                <li key={item.label} className="grid gap-2 py-5 sm:grid-cols-[1fr_2fr] sm:items-baseline sm:gap-8">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">
                    {item.label}
                  </span>
                  <span className="text-sm leading-[1.7] text-ink-soft sm:text-[15px]">{item.description}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={ctaHref} size="lg">
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
