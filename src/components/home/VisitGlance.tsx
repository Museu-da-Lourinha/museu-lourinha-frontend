import Image from "next/image";
import { useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

const facts = [
  { label: "Horário", value: "Ter–Dom · 10h–13h · 14h30–18h" },
  { label: "Bilhete", value: "€5 adulto · <12 anos grátis · Grupos sob marcação" },
  { label: "Morada", value: "Rua João Luís de Moura, 95 · 2530-158 Lourinhã" },
  { label: "Acesso", value: "Estacionamento gratuito · Acessível a mobilidade reduzida" },
];

export function VisitGlance() {
  const isEn = useLocale() === "en";
  const facts = isEn
    ? [
        { label: "Hours", value: "Tue-Sun · 10:00-13:00 · 14:30-18:00" },
        { label: "Ticket", value: "EUR5 adult · under 12 free · groups by booking" },
        { label: "Address", value: "Rua Joao Luis de Moura, 95 · 2530-158 Lourinha" },
        { label: "Access", value: "Free parking · wheelchair accessible" },
      ]
    : [
        { label: "Horário", value: "Ter–Dom · 10h–13h · 14h30–18h" },
        { label: "Bilhete", value: "€5 adulto · <12 anos grátis · Grupos sob marcação" },
        { label: "Morada", value: "Rua João Luís de Moura, 95 · 2530-158 Lourinhã" },
        { label: "Acesso", value: "Estacionamento gratuito · Acessível a mobilidade reduzida" },
      ];

  return (
    <section className="relative overflow-hidden bg-ink text-paper" aria-labelledby="visita-glance-title">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/assets/home/about.png"
          alt=""
          fill
          aria-hidden="true"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      </div>

      <Container>
        <div className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow tone="paper">{isEn ? "Quick visit" : "Visita rápida"}</Eyebrow>
            <h2 id="visita-glance-title" className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-[56px]">
              <span className="block">{isEn ? "Everything you need" : "Tudo o que precisa"}</span>
              <span className="block italic text-[var(--color-accent)]">{isEn ? "before you arrive." : "para chegar."}</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.75] text-paper/80">
              {isEn
                ? "Essential information to plan your visit - opening hours, tickets, location and access. For school groups or guided visits, please contact us at least one week in advance."
                : "O essencial para preparar a visita — horários, ingressos, localização e acessos. Para grupos escolares ou visitas guiadas, fale connosco com pelo menos uma semana de antecedência."}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/visita" size="lg" variant="warm">{isEn ? "Plan your visit" : "Planear visita"}</Button>
              <Button href="/contactos" size="lg" variant="ghost" className="text-paper border-paper/40 hover:bg-paper hover:text-ink">
                {isEn ? "Contact museum" : "Contactar museu"}
              </Button>
            </div>
          </div>

          <dl className="lg:col-span-6 lg:pl-10">
            <div className="border-t border-paper/20">
              {facts.map((f) => (
                <div key={f.label} className="grid gap-2 border-b border-paper/20 py-6 sm:grid-cols-[1fr_2fr] sm:items-baseline sm:gap-8">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    {f.label}
                  </dt>
                  <dd className="text-base leading-[1.7] text-paper/90 sm:text-[17px]">{f.value}</dd>
                </div>
              ))}
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
