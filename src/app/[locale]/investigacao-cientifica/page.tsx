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
  const t = await getTranslations({ locale, namespace: "Pages.investigacao" });
  return { title: t("title") };
}

export default async function InvestigacaoPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Pages.investigacao");

  return (
    <PageShell eyebrow={t("eyebrow")} title={t("title")}>
      <Section id="investigacao" title={t("sections.investigacao")} />
      <Section id="equipa-de-investigacao" title={t("sections.equipa-de-investigacao")} />
      <Section id="projectos-de-investigacao" title={t("sections.projectos-de-investigacao")} />
      <Section id="artigos-cientificos" title={t("sections.artigos-cientificos")} />
      <Section id="laboratorio" title={t("sections.laboratorio")} />
      <Section id="coleccoes" title={t("sections.coleccoes")}>
        <p>{t("sections.coleccoesLead")}</p>
      </Section>
    </PageShell>
  );
}
