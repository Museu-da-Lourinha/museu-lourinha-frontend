import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { Featured } from "@/components/home/Featured";
import { Chapter } from "@/components/home/Chapter";
import { Collections } from "@/components/home/Collections";
import { InFocus } from "@/components/home/InFocus";
import { VisitGlance } from "@/components/home/VisitGlance";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Museu da Lourinhã · Onde a Terra guarda memória",
  description:
    "Visita, investigação científica e educação no Museu da Lourinhã — paleontologia jurássica, arqueologia regional e etnografia da costa oeste portuguesa.",
  openGraph: {
    title: "Museu da Lourinhã · Onde a Terra guarda memória",
    description:
      "Visita, investigação científica e educação no Museu da Lourinhã — paleontologia jurássica, arqueologia e etnografia.",
    type: "website",
    locale: "pt_PT",
  },
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <>
      <Hero />
      <Featured />

      <Chapter
        id="visita"
        number="01"
        eyebrow={isEn ? "Chapter · Visit" : "Capítulo · Visita"}
        title={isEn ? "Tickets, exhibitions and room route." : "Bilheteira, exposições e roteiro de sala."}
        lead={
          isEn
            ? "A route designed to read this territory - from Jurassic paleontology to west-coast ethnography - in about ninety minutes. For school groups and guided visits, advance booking is recommended."
            : "Um percurso desenhado para ler o território — da paleontologia jurássica à etnografia oeste — em cerca de noventa minutos. Para grupos escolares e visitas guiadas, recomendamos marcação prévia."
        }
        items={[
          {
            label: isEn ? "Tickets" : "Bilheteira",
            description:
              isEn
                ? "Individual admission EUR5. Children up to 12 are free. Group booking at geral@museulourinha.org."
                : "Ingresso individual €5. Crianças até 12 anos grátis. Reservas para grupos em geral@museulourinha.org.",
          },
          {
            label: isEn ? "Exhibitions" : "Exposições",
            description:
              isEn
                ? "Permanent display across three rooms and rotating temporary exhibitions focused on collection pieces."
                : "Exposição permanente em três salas e mostras temporárias rotativas centradas em peças de coleção.",
          },
          {
            label: isEn ? "Practical info" : "Informação prática",
            description:
              isEn
                ? "Open Tue-Sun · 10:00-18:00. Closed on Mondays. Wheelchair accessible."
                : "Horário Ter–Dom · 10h–18h. Encerrado à segunda-feira. Acessível a mobilidade reduzida.",
          },
        ]}
        imageSrc="/assets/home/expo-1.png"
        imageAlt={isEn ? "View of the permanent exhibition room" : "Vista da sala de exposição permanente"}
        caption={isEn ? "Room 02 · Paleontology · south view" : "Sala 02 · Paleontologia · vista a sul"}
        ctaHref="/visita"
        ctaLabel={isEn ? "Visit page" : "Página de Visita"}
      />

      <Chapter
        id="investigacao"
        number="02"
        eyebrow={isEn ? "Chapter · Research" : "Capítulo · Investigação"}
        title={isEn ? "Laboratory, collections and scientific output." : "Laboratório, coleções e produção científica."}
        lead={
          isEn
            ? "The museum works as an active research institution, combining laboratory workbench practice, scientific collection inventory and regular academic publishing with national and international universities."
            : "O museu funciona como instituição de investigação ativa, com bancada laboratorial, inventário científico das coleções e publicação académica regular em parceria com universidades nacionais e internacionais."
        }
        items={[
          {
            label: isEn ? "Laboratory" : "Laboratório",
            description:
              isEn
                ? "Preparation and conservation of fossils and archaeological materials with rigorous technical protocols."
                : "Preparação e conservação de fósseis e materiais arqueológicos com protocolos técnicos rigorosos.",
          },
          {
            label: isEn ? "Collections" : "Coleções",
            description:
              isEn
                ? "Scientific inventory and management of paleontology, archaeology and ethnography collections."
                : "Inventário e gestão científica das coleções de paleontologia, arqueologia e etnografia.",
          },
          {
            label: isEn ? "Publications" : "Publicações",
            description:
              isEn
                ? "Collaboration with NOVA, University of Evora and international partners; taxonomic descriptions and reviews."
                : "Cooperação com a NOVA, U.Évora e parceiros internacionais; descrições taxonómicas e revisões.",
          },
          {
            label: isEn ? "Team" : "Equipa",
            description:
              isEn
                ? "Resident researchers, collaborators and interns integrated in ongoing projects."
                : "Investigadores residentes, colaboradores e estagiários integrados em projetos contínuos.",
          },
        ]}
        imageSrc="/assets/home/team-2.png"
        imageAlt={isEn ? "Research work in the museum laboratory" : "Trabalho de investigação no laboratório do museu"}
        caption={isEn ? "Preparation bench · east wing" : "Bancada de preparação · ala leste"}
        ctaHref="/investigacao"
        ctaLabel={isEn ? "Research page" : "Página de Investigação"}
        reverse
        tone="soft"
      />

      <Chapter
        id="educacao"
        number="03"
        eyebrow={isEn ? "Chapter · Education" : "Capítulo · Educação"}
        title={isEn ? "Programs, resources and practical training." : "Programas, recursos e formação prática."}
        lead={
          isEn
            ? "The museum educational offer covers preschool to higher education, with adapted itineraries, supporting materials and curricular internships - always in dialogue with collections and in-house research."
            : "A oferta educativa do museu cobre o pré-escolar até ao ensino superior, com itinerários adaptados, materiais de apoio e estágios curriculares — sempre em diálogo com as coleções e a investigação interna."
        }
        items={[
          {
            label: isEn ? "School programs" : "Programas escolares",
            description:
              isEn
                ? "Guided visits and workshops aligned with science and history curricula."
                : "Visitas orientadas e oficinas alinhadas com os programas curriculares de ciências e história.",
          },
          {
            label: isEn ? "Learning support" : "Apoio ao conhecimento",
            description:
              isEn
                ? "Teaching resources, gallery worksheets and curatorial content made available to educators."
                : "Recursos didáticos, fichas de sala e conteúdos curatoriais disponibilizados a docentes.",
          },
          {
            label: isEn ? "Internships" : "Estágios",
            description:
              isEn
                ? "Curricular and professional internships in scientific, museological and educational areas."
                : "Estágios curriculares e profissionais nas áreas científica, museológica e educativa.",
          },
        ]}
        imageSrc="/assets/home/team-3.png"
        imageAlt={isEn ? "Educational session with students at the museum" : "Sessão educativa com estudantes no museu"}
        caption={isEn ? "School program · middle school" : "Programa escolar · 3.º ciclo"}
        ctaHref="/educacao"
        ctaLabel={isEn ? "Education page" : "Página de Educação"}
      />

      <Collections />
      <InFocus />
      <VisitGlance />
      <Footer />
    </>
  );
}
