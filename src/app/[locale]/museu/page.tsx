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
  const t = await getTranslations({ locale, namespace: "Pages.museu" });
  return { title: t("title") };
}

export default async function MuseuPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Pages.museu");

  return (
    <PageShell
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
    >
      <Section id="sobre-nos" title={t("sections.sobre-nos")} />
      <Section id="missao" title={t("sections.missao")} />
      <Section
        id="exposicoes"
        title={t("sections.exposicoes")}
        cta={{ label: t("sections.exposicoesCta"), href: "/exposicoes" }}
      >
        <p>{t("sections.exposicoesLead")}</p>
      </Section>
      <Section id="equipa" title={t("sections.equipa")} />
      <Section id="contacte-nos" title={t("sections.contacte-nos")} />
    </PageShell>
  );
}
