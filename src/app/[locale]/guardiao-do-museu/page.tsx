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
  title: "Guardiao do Museu",
  description:
    "Programa Guardiao do Museu para apoiar conservacao, investigacao e educacao no Museu da Lourinha.",
};

export default async function GuardiaoDoMuseuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const tiers = [
    {
      name: isEn ? "Explorer" : "Explorador",
      amount: isEn ? "EUR50 / year" : "50 EUR / ano",
      perks: isEn
        ? ["Digital member card", "Quarterly museum bulletin", "10% store discount"]
        : ["Cartao digital de membro", "Boletim trimestral do museu", "10% de desconto na loja"],
    },
    {
      name: isEn ? "Patron" : "Patrono",
      amount: isEn ? "EUR120 / year" : "120 EUR / ano",
      perks: isEn
        ? ["All Explorer benefits", "Priority access to guided events", "Annual behind-the-scenes visit"]
        : ["Todos os beneficios Explorador", "Acesso prioritario a eventos guiados", "Visita anual aos bastidores"],
      featured: true,
    },
    {
      name: isEn ? "Benefactor" : "Benfeitor",
      amount: isEn ? "EUR250 / year" : "250 EUR / ano",
      perks: isEn
        ? ["All Patron benefits", "Acknowledgement in annual supporters list", "Direct support update from research team"]
        : ["Todos os beneficios Patrono", "Reconhecimento na lista anual de apoiantes", "Atualizacao direta da equipa de investigacao"],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={isEn ? "Community" : "Comunidade"}
        title={isEn ? "Museum Guardian." : "Guardiao do Museu."}
        lead={
          isEn
            ? "Join a community that directly supports conservation, research and educational programs at Museu da Lourinha."
            : "Junte-se a uma comunidade que apoia diretamente a conservacao, investigacao e programas educativos do Museu da Lourinha."
        }
        imageSrc="/assets/home/team-1.png"
        imageAlt={isEn ? "Museum community activities" : "Atividades da comunidade do museu"}
        caption={isEn ? "Museum Guardian Program" : "Programa Guardiao do Museu"}
      />

      <PageSection
        id="niveis"
        eyebrow={isEn ? "Membership tiers" : "Niveis de adesao"}
        title={isEn ? "Choose your level." : "Escolha o seu nivel."}
        description={
          isEn
            ? "Each tier helps preserve collections, improve visitor experience and grow educational access."
            : "Cada nivel ajuda a preservar colecoes, melhorar a experiencia de visita e ampliar o acesso educativo."
        }
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`border p-8 ${
                tier.featured
                  ? "border-[var(--color-accent)] bg-paper shadow-soft"
                  : "border-[var(--color-rule)] bg-paper-soft"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">
                {isEn ? "Guardian tier" : "Nivel guardiao"}
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium tracking-tight">{tier.name}</h3>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">
                {tier.amount}
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-[1.7] text-ink-soft" role="list">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span aria-hidden="true" className="text-[var(--color-accent-deep)]">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="impacto"
        eyebrow={isEn ? "Impact areas" : "Areas de impacto"}
        title={isEn ? "Where your support goes." : "Para onde vai o seu apoio."}
        description={
          isEn
            ? "Guardian contributions are allocated across three core museum priorities."
            : "As contribuicoes do programa Guardiao sao aplicadas em tres prioridades centrais do museu."
        }
        tone="soft"
      >
        <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-3">
          {[
            {
              title: isEn ? "Conservation" : "Conservacao",
              text: isEn
                ? "Preventive conservation, restoration planning and long-term storage quality."
                : "Conservacao preventiva, planeamento de restauro e qualidade de armazenamento a longo prazo.",
            },
            {
              title: isEn ? "Research" : "Investigacao",
              text: isEn
                ? "Cataloguing, scientific study and publication outputs tied to the collections."
                : "Catalogacao, estudo cientifico e resultados de publicacao ligados as colecoes.",
            },
            {
              title: isEn ? "Education" : "Educacao",
              text: isEn
                ? "School-facing learning programs, mediated visits and open educational materials."
                : "Programas de aprendizagem para escolas, visitas mediadas e materiais educativos abertos.",
            },
          ].map((item) => (
            <article key={item.title} className="bg-paper p-8">
              <h3 className="font-display text-2xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-[1.7] text-ink-soft">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/contactos" size="lg">
            {isEn ? "Become a Guardian" : "Tornar-me Guardiao"}
          </Button>
        </div>
      </PageSection>

      <Footer />
    </>
  );
}
