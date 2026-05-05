import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/page/PageHeader";
import { PageSection } from "@/components/page/PageSection";
import { ContentCard } from "@/components/page/ContentCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Investigação Científica",
  description:
    "Laboratório, coleções, publicações e equipa de investigação científica do Museu da Lourinhã.",
  openGraph: {
    title: "Investigação Científica · Museu da Lourinhã",
    description:
      "Laboratório, coleções, publicações e equipa de investigação científica do Museu da Lourinhã.",
    type: "website",
    locale: "pt_PT",
  },
};

export default async function InvestigacaoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <>
      <PageHeader
        number="02"
        eyebrow={isEn ? "Chapter · Research" : "Capítulo · Investigação"}
        title={isEn ? "Scientific work." : "Trabalho científico."}
        lead={isEn ? "Museu da Lourinhã is an active research institution. From laboratory bench to academic publication and reference collection management, everything shown in the galleries is first produced behind the scenes." : "O Museu da Lourinhã é uma instituição de investigação ativa. Da bancada de laboratório à publicação académica, passando pela gestão de coleções de referência, todo o conhecimento que está em sala foi antes produzido nos seus bastidores."}
        imageSrc="/assets/home/team-1.png"
        imageAlt={isEn ? "Researchers in the museum lab" : "Investigadores no laboratório do museu"}
        caption={isEn ? "Scientific team · east wing" : "Equipa científica · ala leste"}
      />

      <PageSection
        id="laboratorio"
        eyebrow={isEn ? "01 · Laboratory" : "01 · Laboratório"}
        title={isEn ? "From rock to record." : "Da rocha ao registo."}
        description={isEn ? "Preparation and conservation of paleontological and archaeological material with rigorous technical protocols and dedicated equipment." : "Preparação e conservação de materiais paleontológicos e arqueológicos, com protocolos técnicos rigorosos e equipamento dedicado."}
      >
        <div className="grid gap-px bg-[var(--color-rule)] md:grid-cols-2">
          <ContentCard
            index="01·a"
            title={isEn ? "Preparation" : "Preparação"}
            description={isEn ? "Mechanical and chemical fossil cleaning with microscopy and pneumatic tools for matrix extraction." : "Limpeza mecânica e química de fósseis, com utilização de microscopia e ferramentas pneumáticas para extração de matriz."}
            imageSrc="/assets/home/team-2.png"
            imageAlt={isEn ? "Preparation bench" : "Bancada de preparação"}
          />
          <ContentCard
            index="01·b"
            title={isEn ? "Conservation" : "Conservação"}
            description={isEn ? "Stabilization, consolidation and controlled storage to ensure long-term material preservation." : "Estabilização, consolidação e armazenamento em condições controladas para garantir longevidade dos materiais."}
            imageSrc="/assets/home/team-3.png"
            imageAlt={isEn ? "Conservation work" : "Trabalho de conservação"}
          />
        </div>
      </PageSection>

      <PageSection
        id="colecoes"
        eyebrow={isEn ? "02 · Collections" : "02 · Coleções"}
        title={isEn ? "Inventory and scientific management." : "Inventário e gestão científica."}
        description={isEn ? "More than 25,000 items organized in three cores - paleontology, archaeology and ethnography - all inventoried, cataloged and progressively available in open records." : "Mais de 25 000 peças organizadas em três núcleos — paleontologia, arqueologia e etnografia — todas inventariadas, catalogadas e progressivamente disponibilizadas em ficha aberta."}
        tone="soft"
      >
        <div className="grid gap-px bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            index="02·a"
            title="Paleontologia"
            description="Holótipos jurássicos, ovos de dinossauro, icnofósseis. Núcleo de referência mundial em terópodes ibéricos."
            imageSrc="/assets/home/featured.png"
            imageAlt="Coleção de paleontologia"
          />
          <ContentCard
            index="02·b"
            title="Arqueologia"
            description="Material lítico, cerâmico, metálico e numismático com proveniência local e regional documentada."
            imageSrc="/assets/home/expo-3.png"
            imageAlt="Coleção de arqueologia"
          />
          <ContentCard
            index="02·c"
            title="Etnografia"
            description="Cultura material agrícola, marítima e doméstica do oeste — séculos XIX e XX, com inventário aberto online."
            imageSrc="/assets/home/expo-2.png"
            imageAlt="Coleção de etnografia"
          />
        </div>
      </PageSection>

      <PageSection
        id="publicacoes"
        eyebrow={isEn ? "03 · Publications" : "03 · Publicações"}
        title={isEn ? "Peer reviewed." : "Em revisão por pares."}
        description={isEn ? "The museum publishes regularly in indexed journals, in co-authorship with national and international universities. Recent selection." : "O museu publica regularmente em revistas indexadas, em coautoria com universidades nacionais e internacionais. Selecção recente."}
      >
        <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]" role="list">
          {[
            {
              year: "2026",
              authors: "Mateus, O.; Ferreira, J.; et al.",
              title: "Revisão anatómica do holótipo de Allosaurus europaeus.",
              journal: "Journal of Vertebrate Paleontology · em revisão",
            },
            {
              year: "2025",
              authors: "Hendrickx, C.; Mateus, O.",
              title: "Theropod tooth morphology of the Lourinhã Formation, Portugal.",
              journal: "Cretaceous Research · vol. 168",
            },
            {
              year: "2024",
              authors: "Antunes, M. T.; Mateus, O.",
              title: "Dinosaurs of Portugal — an updated synthesis.",
              journal: "Comptes Rendus Palevol",
            },
          ].map((p, idx) => (
            <li key={p.title} className="grid gap-3 py-7 sm:grid-cols-[80px_120px_1fr] sm:items-baseline sm:gap-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                Pub. 0{idx + 1}
              </span>
              <span className="text-sm font-medium text-ink-soft">{p.year}</span>
              <div>
                <p className="font-display text-xl font-medium leading-snug tracking-tight">{p.title}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  {p.authors} · <span className="italic">{p.journal}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="equipa"
        eyebrow={isEn ? "04 · Team" : "04 · Equipa"}
        title={isEn ? "Who works behind the scenes." : "Quem trabalha nos bastidores."}
        description={isEn ? "Multidisciplinary team dedicated to research, conservation, communication and scientific mediation." : "Equipa multidisciplinar dedicada à investigação, conservação, divulgação e mediação científica do museu."}
        tone="deep"
      >
        <div className="grid gap-px bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            title="Investigadores residentes"
            description="Paleontólogos, arqueólogos e etnógrafos integrados em projetos contínuos com universidades parceiras."
            imageSrc="/assets/home/team-1.png"
            imageAlt="Equipa de investigação"
          />
          <ContentCard
            title="Técnicos de laboratório"
            description="Especialistas em preparação, conservação e documentação de materiais paleontológicos e arqueológicos."
            imageSrc="/assets/home/team-2.png"
            imageAlt="Equipa de laboratório"
          />
          <ContentCard
            title="Mediação e estágios"
            description="Equipa de mediação cultural, comunicação científica e acompanhamento de estagiários curriculares."
            imageSrc="/assets/home/team-3.png"
            imageAlt="Equipa de mediação"
          />
        </div>
      </PageSection>

      <Footer />
    </>
  );
}
