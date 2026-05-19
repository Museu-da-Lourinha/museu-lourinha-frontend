import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { ExhibitionsCarousel } from "@/components/ExhibitionsCarousel";
import { Link } from "@/i18n/navigation";

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
        contentClassName="max-w-none"
      >
        <div className="mt-4 flex items-start justify-between gap-6">
          <p className="max-w-3xl">{t("sections.exposicoesLead")}</p>
          <Link
            href="/exposicoes"
            className="-translate-y-7 inline-flex shrink-0 items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:text-base"
          >
            {t("sections.exposicoesCta")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ExhibitionsCarousel className="relative left-1/2 right-1/2 -mx-[50vw] mt-8 w-screen rounded-none border-0 shadow-none" />
      </Section>
      <Section id="equipa" title={t("sections.equipa")} />
      <Section id="contacte-nos" title={t("sections.contacte-nos")} />
    </PageShell>
  );
}
