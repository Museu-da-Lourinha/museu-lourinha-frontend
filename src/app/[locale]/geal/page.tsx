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
  const t = await getTranslations({ locale, namespace: "Pages.geal" });
  return { title: t("title") };
}

export default async function GealPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Pages.geal");

  return (
    <PageShell eyebrow={t("eyebrow")} title={t("title")}>
      <Section id="historia-fundadores" title={t("sections.historia-fundadores")} />
      <Section id="areas-de-atuacao" title={t("sections.areas-de-atuacao")} />
      <Section id="estatutos" title={t("sections.estatutos")} />
      <Section id="orgaos-sociais" title={t("sections.orgaos-sociais")} />
      <Section id="mesa-assembleia-geral" title={t("sections.mesa-assembleia-geral")} />
      <Section id="direccao" title={t("sections.direccao")} />
      <Section id="conselho-fiscal" title={t("sections.conselho-fiscal")} />
      <Section id="conselho-cientifico" title={t("sections.conselho-cientifico")} />
      <Section id="colaboracoes" title={t("sections.colaboracoes")} />
    </PageShell>
  );
}
