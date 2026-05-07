import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.visitar" });
  return { title: t("title") };
}

export default async function VisitarPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Pages.visitar");

  return (
    <PageShell eyebrow={t("eyebrow")} title={t("title")}>
      <Section id="planear-visita" title={t("sections.planear-visita")} />
      <Section
        id="bilheteira"
        title={t("sections.bilheteira")}
        cta={{ label: t("sections.bilheteiraCta"), href: "/bilheteira" }}
      >
        <p>{t("sections.bilheteiraLead")}</p>
      </Section>
      <Section id="visitas-escolares" title={t("sections.visitas-escolares")} />
      <Section id="onde-estamos" title={t("sections.onde-estamos")} />
      <Section id="mapa-do-museu" title={t("sections.mapa-do-museu")} />
      <Section id="acessibilidade" title={t("sections.acessibilidade")} />
      <Section id="horario" title={t("sections.horario")} />
    </PageShell>
  );
}
