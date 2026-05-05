import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/page/PageHeader";
import { PageSection } from "@/components/page/PageSection";
import { ContentCard } from "@/components/page/ContentCard";
import { Button } from "@/components/ui/Button";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Educação",
  description:
    "Programas escolares, recursos didáticos e estágios curriculares no Museu da Lourinhã.",
  openGraph: {
    title: "Educação · Museu da Lourinhã",
    description:
      "Programas escolares, recursos didáticos e estágios curriculares no Museu da Lourinhã.",
    type: "website",
    locale: "pt_PT",
  },
};

export default async function EducacaoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <>
      <PageHeader
        number="03"
        eyebrow={isEn ? "Chapter · Education" : "Capítulo · Educação"}
        title={isEn ? "Learn with the museum." : "Aprender com o museu."}
        lead={
          isEn
            ? "School programs, learning resources and internships - designed in dialogue with collections, in-house research and national curricula."
            : "Programas escolares, recursos didáticos e estágios — desenhados em diálogo com as coleções, com a investigação interna e com os programas curriculares nacionais."
        }
        imageSrc="/assets/home/team-3.png"
        imageAlt={isEn ? "Educational session at the museum" : "Sessão educativa no museu"}
        caption={isEn ? "School program · workshop" : "Programa escolar · oficina"}
      />

      <PageSection
        id="escolas"
        eyebrow={isEn ? "01 · School programs" : "01 · Programas escolares"}
        title={isEn ? "Itineraries by education level." : "Itinerários por nível de ensino."}
        description={
          isEn
            ? "Seven educational routes from preschool to high school, aligned with curriculum guidelines and adapted to visit duration."
            : "Sete percursos pedagógicos do pré-escolar ao secundário, todos articulados com as orientações curriculares e adaptados à duração da visita."
        }
      >
        <div className="grid gap-px bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            index="01·a"
            title={isEn ? "Preschool" : "Pré-escolar"}
            description={isEn ? "Sensory sessions with replicas, focused on discovery and early scientific vocabulary." : "Sessões sensoriais com manipulação de réplicas, foco na descoberta e no vocabulário científico inicial."}
            imageSrc="/assets/home/team-3.png"
            imageAlt={isEn ? "Preschool session" : "Sessão para pré-escolar"}
          />
          <ContentCard
            index="01·b"
            title={isEn ? "Primary levels" : "1.º e 2.º ciclos"}
            description={isEn ? "Guided visit with field kit - focused observation, sketching and fossil interpretation." : "Visita orientada com kit de campo — observação dirigida, registo gráfico e interpretação de fósseis."}
            imageSrc="/assets/home/team-1.png"
            imageAlt={isEn ? "Educational activity" : "Atividade pedagógica"}
          />
          <ContentCard
            index="01·c"
            title={isEn ? "Middle and high school" : "3.º ciclo e secundário"}
            description={isEn ? "Itineraries linked to Biology, Geology and History, with worksheets and in-gallery discussion." : "Itinerários articulados com Biologia, Geologia e História, com fichas de trabalho e debate em sala."}
            imageSrc="/assets/home/team-2.png"
            imageAlt={isEn ? "High-school session" : "Sessão para secundário"}
          />
        </div>
      </PageSection>

      <PageSection
        id="recursos"
        eyebrow={isEn ? "02 · Learning support" : "02 · Apoio ao conhecimento"}
        title={isEn ? "Teaching support materials." : "Materiais de apoio para docentes."}
        description={isEn ? "Teaching resources for educators and coordinators in open digital format." : "Recursos didáticos disponibilizados a professores e coordenadores pedagógicos, em formato digital aberto."}
        tone="soft"
      >
        <div className="grid gap-px bg-[var(--color-rule)] md:grid-cols-2">
          <ContentCard
            index="02·a"
            title={isEn ? "Gallery worksheets" : "Fichas de sala"}
            description={isEn ? "Curatorial content summarized in printable sheets with suggested reading by education level." : "Conteúdo curatorial sintetizado em ficha imprimível, com leitura sugerida por nível de ensino."}
            imageSrc="/assets/home/expo-2.png"
            imageAlt={isEn ? "Teaching material" : "Material didático"}
          />
          <ContentCard
            index="02·b"
            title={isEn ? "Collections repository" : "Repositório de coleções"}
            description={isEn ? "Online access to inventory records with image and historical context." : "Acesso online ao inventário das peças disponíveis para estudo, com fotografia e contexto histórico."}
            imageSrc="/assets/home/expo-3.png"
            imageAlt={isEn ? "Online repository" : "Repositório online"}
          />
        </div>
      </PageSection>

      <PageSection
        id="estagios"
        eyebrow={isEn ? "03 · Internships" : "03 · Estágios"}
        title={isEn ? "Hands-on work in the museum." : "Trabalho prático no museu."}
        description={isEn ? "Curricular and professional internships in scientific, museological and educational areas, with dedicated mentorship." : "Estágios curriculares e profissionais nas áreas científica, museológica e educativa, com acompanhamento dedicado."}
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]" role="list">
              {[
                { name: isEn ? "Paleontology · preparation" : "Paleontologia · preparação", duration: isEn ? "8-12 wks" : "8–12 sem." },
                { name: isEn ? "Conservation and restoration" : "Conservação e restauro", duration: isEn ? "6-10 wks" : "6–10 sem." },
                { name: isEn ? "Collections and inventory" : "Coleções e inventário", duration: isEn ? "10-16 wks" : "10–16 sem." },
                { name: isEn ? "Cultural mediation" : "Mediação cultural", duration: isEn ? "6-10 wks" : "6–10 sem." },
                { name: isEn ? "Science communication" : "Comunicação científica", duration: isEn ? "6-10 wks" : "6–10 sem." },
              ].map((s, idx) => (
                <li key={s.name} className="grid grid-cols-[60px_1fr_auto] items-center gap-4 py-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-lg font-medium tracking-tight">{s.name}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                    {s.duration}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="bg-paper-soft p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-faint">{isEn ? "Applications" : "Candidaturas"}</p>
            <h3 className="mt-4 font-display text-3xl font-light leading-tight tracking-tight">
              {isEn ? "Open on a " : "Abertas em "}
              <span className="italic text-[var(--color-warm)]">{isEn ? "rolling basis." : "contínuo."}</span>
            </h3>
            <p className="mt-5 text-sm leading-[1.7] text-ink-soft">
              {isEn
                ? "Send a motivation letter and CV to the institutional email. Applications are reviewed according to current openings and academic fit."
                : "Envie carta de motivação e CV para o email institucional. As candidaturas são analisadas em função das vagas em curso e do enquadramento académico do candidato."}
            </p>
            <div className="mt-8">
              <Button href="/contactos" size="lg">{isEn ? "Talk to the education team" : "Falar com a equipa educativa"}</Button>
            </div>
          </aside>
        </div>
      </PageSection>

      <Footer />
    </>
  );
}
