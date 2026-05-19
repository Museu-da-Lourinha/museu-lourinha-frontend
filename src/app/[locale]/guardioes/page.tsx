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
  const t = await getTranslations({ locale, namespace: "Pages.guardioes" });
  return { title: t("title") };
}

export default async function GuardioesPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Pages.guardioes");

  return (
    <PageShell eyebrow={t("eyebrow")} title={t("title")}>
      <Section id="como-apoiar" title={t("sections.como-apoiar")} />
      <Section id="apoio-corporativo" title={t("sections.apoio-corporativo")} />
      <Section id="doar" title={t("sections.doar")} />
      <Section id="ser-voluntario" title={t("sections.ser-voluntario")} />
    </PageShell>
  );
}
