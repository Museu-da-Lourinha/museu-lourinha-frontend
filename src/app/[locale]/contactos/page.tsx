import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/page/PageHeader";
import { PageSection } from "@/components/page/PageSection";
import { Button } from "@/components/ui/Button";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Morada, telefone, email, horários e localização do Museu da Lourinhã.",
  openGraph: {
    title: "Contactos · Museu da Lourinhã",
    description:
      "Morada, telefone, email, horários e localização do Museu da Lourinhã.",
    type: "website",
    locale: "pt_PT",
  },
};

export default async function ContactosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <>
      <PageHeader
        eyebrow={isEn ? "Contact" : "Contactos"}
        title={isEn ? "Talk to the museum." : "Falar com o museu."}
        lead={isEn ? "Address, direct contacts and channels for visitors, schools, researchers and institutional partners." : "Morada, contactos diretos e canais para visitantes, escolas, investigadores e parceiros institucionais."}
        imageSrc="/assets/home/map-placeholder.png"
        imageAlt={isEn ? "View of the museum entrance" : "Vista da entrada do Museu da Lourinhã"}
        caption={isEn ? "Main access · south facade" : "Acesso principal · fachada sul"}
      />

      <PageSection eyebrow={isEn ? "Direct" : "Direto"} title={isEn ? "Channels by area." : "Canais por área."} tone="paper">
        <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-3">
          <Channel
            label="Geral"
            phone="+351 261 414 003"
            email="geral@museulourinha.org"
            note="Para visitantes e público em geral."
          />
          <Channel
            label="Educação"
            phone="+351 261 414 003"
            email="educativo@museulourinha.org"
            note="Para escolas, professores e marcação de visitas guiadas."
          />
          <Channel
            label="Investigação"
            phone="+351 261 414 003"
            email="investigacao@museulourinha.org"
            note="Para investigadores, parceiros académicos e imprensa especializada."
          />
        </div>
      </PageSection>

      <PageSection
        id="localizacao"
        eyebrow={isEn ? "Location" : "Localização"}
        title={isEn ? "How to get here." : "Como chegar."}
        description={isEn ? "The museum is in Lourinhã historic center, just a few minutes by car from A8 junction 11." : "O museu fica no centro histórico da Lourinhã, a poucos minutos de carro do nó da A8 (saída 11)."}
        tone="soft"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <address className="not-italic">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-faint">Morada</p>
            <p className="mt-3 font-display text-3xl font-light leading-tight tracking-tight">
              Rua João Luís de Moura, 95
              <br />
              2530-158 Lourinhã
              <br />
              Portugal
            </p>
            <ul className="mt-10 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)] text-sm" role="list">
              <li className="grid grid-cols-[120px_1fr] items-center gap-4 py-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">Coordenadas</span>
                <span>38° 44′ 56″ N · 9° 18′ 48″ O</span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4 py-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">Auto-estrada</span>
                <span>A8 · saída 11 (Lourinhã)</span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4 py-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">Lisboa</span>
                <span>~65 km · 50 min</span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4 py-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">Estacionamento</span>
                <span>Gratuito junto ao edifício, com lugares para autocarros</span>
              </li>
            </ul>
            <div className="mt-10">
              <Button
                href="https://www.google.com/maps?q=Rua+João+Luís+de+Moura,+95,+2530-158+Lourinhã"
                external
                size="lg"
              >
                {isEn ? "Open in Google Maps" : "Abrir no Google Maps"}
              </Button>
            </div>
          </address>

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-deep">
            <iframe
              title={isEn ? "Museu da Lourinhã map" : "Mapa do Museu da Lourinhã"}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-9.3192%2C39.2412%2C-9.3057%2C39.2515&layer=mapnik&marker=39.2461%2C-9.3128"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale"
            />
          </div>
        </div>
      </PageSection>

      <PageSection eyebrow={isEn ? "Opening hours" : "Horário"} title={isEn ? "We are open." : "Estamos abertos."} tone="paper">
        <dl className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-3">
          <Slot label={isEn ? "Tuesday to Friday" : "Terça a Sexta"} value="10h00–13h00 · 14h30–18h00" />
          <Slot label={isEn ? "Saturday and Sunday" : "Sábado e Domingo"} value="10h00–13h00 · 14h30–18h00" />
          <Slot label={isEn ? "Closed" : "Encerrado"} value={isEn ? "Mondays and official holidays" : "Segundas-feiras e feriados oficiais"} />
        </dl>
      </PageSection>

      <Footer />
    </>
  );
}

function Channel({
  label,
  phone,
  email,
  note,
}: {
  label: string;
  phone: string;
  email: string;
  note: string;
}) {
  return (
    <div className="bg-paper p-10">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-faint">{label}</p>
      <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight">
        <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-[var(--color-warm)]">
          {phone}
        </a>
      </p>
      <p className="mt-3 text-sm">
        <a href={`mailto:${email}`} className="text-ink-soft underline-offset-4 hover:underline">
          {email}
        </a>
      </p>
      <p className="mt-6 text-sm leading-[1.7] text-ink-soft">{note}</p>
    </div>
  );
}

function Slot({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 bg-paper p-7">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.26em] text-ink-faint">{label}</dt>
      <dd className="text-base text-ink sm:text-[17px]">{value}</dd>
    </div>
  );
}
