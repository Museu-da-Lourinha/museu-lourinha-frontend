import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Image from "next/image";
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
      <Section id="onde-estamos" title={t("sections.onde-estamos")}>
        <p>{t("sections.ondeEstamosLead")}</p>
        <p className="mt-3 font-semibold">{t("sections.ondeEstamosAddress")}</p>
        <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700">
          <iframe
            title={t("sections.ondeEstamosMapTitle")}
            src="https://maps.google.com/maps?q=Museu%20da%20Lourinh%C3%A3&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Section>
      <Section
        id="mapa-do-museu"
        title={t("sections.mapa-do-museu")}
        contentClassName="!max-w-none"
      >
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-4 text-justify lg:col-span-5">
            <p>{t("sections.mapaMuseuLead")}</p>
            <p>{t("sections.mapaMuseuDescription")}</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900 lg:col-span-7">
            <Image
              src="/assets/visitar/mapa-museu-lourinha.png"
              alt={t("sections.mapaMuseuImageAlt")}
              width={1280}
              height={945}
              className="h-auto w-full"
              sizes="(min-width: 1280px) 1024px, 100vw"
            />
          </div>
        </div>
      </Section>
      <Section
        id="acessibilidade"
        title={t("sections.acessibilidade")}
        contentClassName="!max-w-none"
      >
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-12">
          <div className="overflow-hidden rounded-none border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900 lg:col-span-7">
            <Image
              src="/assets/visitar/acessibilidade-mobilidade.png"
              alt={t("sections.acessibilidadeImageAlt")}
              width={1024}
              height={683}
              className="h-auto w-full"
              sizes="(min-width: 1280px) 1280px, 100vw"
            />
          </div>
          <p className="text-justify lg:col-span-5">{t("sections.acessibilidadeLead")}</p>
        </div>
      </Section>
      <Section id="horario" title={t("sections.horario")}>
        <p>{t("sections.horarioLead")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
            <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
              {t("sections.horarioSetJunTitle")}
            </h3>
            <p className="mt-2">{t("sections.horarioSetJunDays")}</p>
            <p>{t("sections.horarioSetJunMorning")}</p>
            <p>{t("sections.horarioSetJunAfternoon")}</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
            <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
              {t("sections.horarioJulAgoTitle")}
            </h3>
            <p className="mt-2">{t("sections.horarioJulAgoDays")}</p>
            <p>{t("sections.horarioJulAgoMorning")}</p>
            <p>{t("sections.horarioJulAgoAfternoon")}</p>
          </div>
        </div>
        <p className="mt-5 text-sm">{t("sections.horarioNotaEntrada")}</p>
        <p className="mt-1 text-sm">{t("sections.horarioNotaFecho")}</p>
        <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">
          <Image
            src="/assets/visitar/horario-museu-lourinha.png"
            alt={t("sections.horarioImageAlt")}
            width={1200}
            height={775}
            className="h-auto w-full"
            sizes="(min-width: 1280px) 1024px, 100vw"
          />
        </div>
      </Section>
    </PageShell>
  );
}
