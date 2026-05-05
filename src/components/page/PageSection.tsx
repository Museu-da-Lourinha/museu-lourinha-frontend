import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  tone?: "paper" | "soft" | "deep";
};

const toneMap = {
  paper: "bg-paper",
  soft: "bg-paper-soft",
  deep: "bg-paper-deep",
} as const;

export function PageSection({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "paper",
}: PageSectionProps) {
  return (
    <section id={id} className={`${toneMap[tone]} py-20 sm:py-28`} aria-labelledby={id ? `${id}-title` : undefined}>
      <Container>
        {eyebrow || title || description ? (
          <header className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              {title ? (
                <h2
                  id={id ? `${id}-title` : undefined}
                  className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-[44px]"
                >
                  {title}
                </h2>
              ) : null}
            </div>
            {description ? (
              <p className="max-w-2xl text-base leading-[1.8] text-ink-soft sm:text-lg lg:col-span-7 lg:pt-2">
                {description}
              </p>
            ) : null}
          </header>
        ) : null}
        <div className={`${eyebrow || title || description ? "mt-14" : ""}`}>{children}</div>
      </Container>
    </section>
  );
}
