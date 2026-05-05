import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Numeral } from "@/components/ui/Numeral";

type PageHeaderProps = {
  number?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
};

export function PageHeader({
  number,
  eyebrow,
  title,
  lead,
  imageSrc,
  imageAlt,
  caption,
}: PageHeaderProps) {
  return (
    <section className="relative bg-paper" aria-labelledby="page-title">
      <Container>
        <div className="grid gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-20 lg:pt-20">
          <div className="flex flex-col justify-end lg:col-span-7">
            {number ? (
              <Numeral value={number} className="text-[120px] sm:text-[180px] text-[var(--color-rule-strong)]" />
            ) : null}
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1
              id="page-title"
              className="mt-4 font-display text-5xl font-light leading-[0.98] tracking-tight sm:text-7xl lg:text-[88px]"
            >
              {title}
            </h1>
            {lead ? (
              <p className="mt-8 max-w-2xl text-base leading-[1.8] text-ink-soft sm:text-lg">{lead}</p>
            ) : null}
          </div>

          <figure className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-deep">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            {caption ? (
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                {caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </Container>
      <div className="border-t border-[var(--color-rule)]" />
    </section>
  );
}
