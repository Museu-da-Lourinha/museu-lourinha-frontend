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
  title: "Visita",
  description:
    "Bilheteira, exposições, horários e informação prática para preparar a visita ao Museu da Lourinhã.",
  openGraph: {
    title: "Visita · Museu da Lourinhã",
    description:
      "Bilheteira, exposições, horários e informação prática para preparar a visita ao Museu da Lourinhã.",
    type: "website",
    locale: "pt_PT",
  },
};

export default async function VisitaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <>
      <PageHeader
        number="01"
        eyebrow={isEn ? "Chapter · Visit" : "Capítulo · Visita"}
        title={isEn ? "Plan your visit." : "Preparar a visita."}
        lead={
          isEn
            ? "Everything you need for a smooth and informed museum visit - tickets, exhibitions, opening hours and practical tips."
            : "Tudo o que precisa para chegar ao museu confortável e bem informado — bilheteira, exposições em sala, horário e dicas práticas."
        }
        imageSrc="/assets/home/expo-2.png"
        imageAlt={isEn ? "Exhibition room at Museu da Lourinhã" : "Sala de exposição do Museu da Lourinhã"}
        caption={isEn ? "Room 01 · general view" : "Sala 01 · vista geral"}
      />

      <PageSection
        id="bilheteira"
        eyebrow={isEn ? "01 · Tickets" : "01 · Bilheteira"}
        title={isEn ? "How to enter the museum." : "Como entrar no museu."}
        description={
          isEn
            ? "Individual, family and group admission options, including offers for schools and researchers."
            : "Modalidades de ingresso individuais, familiares e de grupo, com opções para escolas e investigadores."
        }
        tone="paper"
      >
        <div className="grid gap-px bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
          <ContentCard
            index="01·a"
            title={isEn ? "Individual ticket" : "Bilhete individual"}
            description={
              isEn
                ? "EUR5 per adult. Children up to 12 enter free. Students and seniors have reduced fares."
                : "€5 por adulto. Crianças até 12 anos têm entrada gratuita. Estudantes e seniores com tarifa reduzida."
            }
            imageSrc="/assets/home/expo-1.png"
            imageAlt={isEn ? "Museum exhibition view" : "Vista expositiva do museu"}
          />
          <ContentCard
            index="01·b"
            title={isEn ? "Groups and schools" : "Grupos e escolas"}
            description={
              isEn
                ? "From 10 people, with prior booking by email. Guided or self-guided programs available."
                : "A partir de 10 pessoas, com marcação prévia por email. Programas guiados ou autónomos, sob proposta."
            }
            imageSrc="/assets/home/expo-3.png"
            imageAlt={isEn ? "Featured object" : "Peça em destaque"}
          />
          <ContentCard
            index="01·c"
            title={isEn ? "Research" : "Investigação"}
            description={
              isEn
                ? "Special access to collections and scientific archive by credential and contact with the research team."
                : "Acesso especial a coleções e arquivo científico mediante credencial e contacto com a equipa de investigação."
            }
            imageSrc="/assets/home/featured.png"
            imageAlt={isEn ? "Collection under study" : "Coleção em estudo"}
          />
        </div>
      </PageSection>

      <PageSection
        id="exposicoes"
        eyebrow={isEn ? "02 · Exhibitions" : "02 · Exposições"}
        title={isEn ? "Currently on display." : "Em sala, agora."}
        description={
          isEn
            ? "Permanent exhibition in three rooms and rotating temporary displays. Highlights below are currently on view."
            : "Exposição permanente em três salas e mostras temporárias rotativas. Os destaques abaixo estão atualmente em sala."
        }
        tone="soft"
      >
        <div className="grid gap-px bg-[var(--color-rule)] sm:grid-cols-2">
          <ContentCard
            index="02·a"
            title={isEn ? "Jurassic paleontology" : "Paleontologia jurássica"}
            description={
              isEn
                ? "Core collection of Upper Jurassic fossils, dinosaur eggs and west-coast ichnofossils."
                : "O núcleo central — fósseis do Jurássico Superior, ovos de dinossauro e icnofósseis da costa oeste."
            }
            imageSrc="/assets/home/featured.png"
            imageAlt={isEn ? "Paleontology gallery" : "Sala de paleontologia"}
          />
          <ContentCard
            index="02·b"
            title={isEn ? "Regional archaeology" : "Arqueologia regional"}
            description={
              isEn
                ? "Lithic, ceramic and numismatic material tracing human presence in the west from Paleolithic to modern times."
                : "Material lítico, cerâmico e numismático que contam a presença humana no oeste, do Paleolítico ao Moderno."
            }
            imageSrc="/assets/home/expo-3.png"
            imageAlt={isEn ? "Archaeology gallery" : "Sala de arqueologia"}
          />
          <ContentCard
            index="02·c"
            title={isEn ? "Local ethnography" : "Etnografia local"}
            description={
              isEn
                ? "Agricultural, maritime and domestic material culture with objects, tools and regional clothing."
                : "Cultura material agrícola, marítima e doméstica, com recurso a peças, ferramentas e indumentária regional."
            }
            imageSrc="/assets/home/expo-2.png"
            imageAlt={isEn ? "Ethnography section" : "Núcleo etnográfico"}
          />
          <ContentCard
            index="02·d"
            title={isEn ? "Jurassic Garden" : "Jardim Jurássico"}
            description={
              isEn
                ? "Scale reconstructions and flora tied to Jurassic habitats - open-air visit outside the building."
                : "Reconstituições à escala e flora associada ao habitat jurássico — visita ao ar livre, no exterior do edifício."
            }
            imageSrc="/assets/home/about.png"
            imageAlt={isEn ? "Outdoor museum garden" : "Jardim exterior do museu"}
          />
        </div>
      </PageSection>

      <PageSection
        id="horarios"
        eyebrow={isEn ? "03 · Practical information" : "03 · Informação prática"}
        title={isEn ? "Before you arrive." : "Antes de chegar."}
        description={
          isEn
            ? "Opening hours, access, transport and useful recommendations for your visit day."
            : "Horário, acessos, transportes e recomendações úteis para o dia da visita."
        }
      >
        <dl className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2">
          <Fact label={isEn ? "Opening hours" : "Horário"} value={isEn ? "Tue-Sun · 10:00-13:00 · 14:30-18:00" : "Ter–Dom · 10h00–13h00 · 14h30–18h00"} />
          <Fact label={isEn ? "Closed" : "Encerrado"} value={isEn ? "Mondays and official holidays" : "Segundas-feiras e feriados oficiais"} />
          <Fact label={isEn ? "Address" : "Morada"} value="Rua João Luís de Moura, 95 · 2530-158 Lourinhã" />
          <Fact label={isEn ? "Coordinates" : "Coordenadas"} value="38° 44′ 56″ N · 9° 18′ 48″ O" />
          <Fact label={isEn ? "Parking" : "Estacionamento"} value={isEn ? "Free by the building, including coach spaces" : "Gratuito junto ao edifício, com lugares para autocarros"} />
          <Fact label={isEn ? "Accessibility" : "Acessibilidade"} value={isEn ? "Wheelchair accessible across all galleries" : "Acessível a mobilidade reduzida em todas as salas"} />
          <Fact label={isEn ? "Languages" : "Idiomas"} value={isEn ? "Signage and materials in PT and EN; guided visits by booking" : "Sinalética e materiais em PT e EN; visitas guiadas mediante marcação"} />
          <Fact label={isEn ? "Contact" : "Contacto"} value="+351 261 414 003 · geral@museulourinha.org" />
        </dl>
      </PageSection>

      <Footer />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 bg-paper p-7">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink-faint">{label}</dt>
      <dd className="text-base leading-[1.6] text-ink sm:text-[17px]">{value}</dd>
    </div>
  );
}
