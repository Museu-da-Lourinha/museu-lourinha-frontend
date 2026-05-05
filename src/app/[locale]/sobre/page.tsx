import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/page/PageHeader";
import { PageSection } from "@/components/page/PageSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Missão, visão e enquadramento institucional do Museu da Lourinhã, gerido pelo GEAL desde 1984.",
  openGraph: {
    title: "Sobre · Museu da Lourinhã",
    description:
      "Missão, visão e enquadramento institucional do Museu da Lourinhã, gerido pelo GEAL desde 1984.",
    type: "website",
    locale: "pt_PT",
  },
};

const TIMELINE = [
  { year: "1984", text: "Fundação do GEAL · Grupo de Etnologia e Arqueologia da Lourinhã." },
  { year: "1991", text: "Inauguração do museu, no edifício atual da Rua João Luís de Moura." },
  { year: "2003", text: "Descrição de Allosaurus europaeus a partir de holótipo da coleção." },
  { year: "2014", text: "Acordo de cooperação científica com a Universidade NOVA de Lisboa." },
  { year: "2024", text: "Abertura do Jardim Jurássico ao público." },
];

export default async function SobrePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <>
      <PageHeader
        eyebrow={isEn ? "About" : "Sobre"}
        title={isEn ? "Museu da Lourinhã." : "O Museu da Lourinhã."}
        lead={isEn ? "Cultural and scientific institution managed by GEAL - Grupo de Etnologia e Arqueologia da Lourinhã - dedicated to studying, preserving and sharing the region's paleontological, archaeological and ethnographic heritage." : "Instituição cultural e científica gerida pelo GEAL — Grupo de Etnologia e Arqueologia da Lourinhã, dedicada ao estudo, conservação e divulgação do património paleontológico, arqueológico e etnográfico da região."}
        imageSrc="/assets/home/about.png"
        imageAlt={isEn ? "Museu da Lourinhã building" : "Edifício do Museu da Lourinhã"}
        caption={isEn ? "Headquarters building · Rua João Luís de Moura" : "Edifício sede · Rua João Luís de Moura"}
      />

      <PageSection
        id="manifesto"
        eyebrow={isEn ? "Manifesto" : "Manifesto"}
        title={isEn ? "What we stand for." : "O que defendemos."}
        description={isEn ? "Three principles guiding the museum's scientific, educational and cultural work." : "Três princípios que orientam a atividade científica, educativa e cultural do museu."}
      >
        <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Conhecimento aberto.",
              body: "As coleções existem para serem estudadas e partilhadas — em sala, em publicação e em ficha aberta online.",
            },
            {
              n: "02",
              title: "Rigor científico.",
              body: "Cada peça em exposição é trabalho de investigação prévia. Toda a divulgação parte de evidência verificável.",
            },
            {
              n: "03",
              title: "Diálogo com a comunidade.",
              body: "O museu trabalha em proximidade com escolas, parceiros académicos e tecido associativo da região.",
            },
          ].map((m) => (
            <div key={m.n} className="bg-paper p-10">
              <p className="font-display text-5xl font-light text-[var(--color-rule-strong)]">{m.n}</p>
              <h3 className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight">
                {m.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.7] text-ink-soft">{m.body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="cronologia"
        eyebrow={isEn ? "Timeline" : "Cronologia"}
        title={isEn ? "Four decades as a museum." : "Quatro décadas em museu."}
        description={isEn ? "Institutional and scientific milestones since GEAL was founded." : "Marcos institucionais e científicos desde a fundação do GEAL."}
        tone="soft"
      >
        <ol className="border-t border-[var(--color-rule)]" role="list">
          {TIMELINE.map((t) => (
            <li
              key={t.year}
              className="grid items-baseline gap-4 border-b border-[var(--color-rule)] py-7 sm:grid-cols-[120px_1fr] sm:gap-12"
            >
              <span className="font-display text-3xl font-light tracking-tight text-[var(--color-warm)]">
                {t.year}
              </span>
              <span className="text-base leading-[1.7] text-ink-soft sm:text-lg">{t.text}</span>
            </li>
          ))}
        </ol>
      </PageSection>

      <Footer />
    </>
  );
}
