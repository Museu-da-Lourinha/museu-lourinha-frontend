import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const VALID_SECTIONS = [
  "museu",
  "visitar",
  "geal",
  "educacao",
  "investigacao",
  "loja",
] as const;

type Props = {
  params: Promise<{ locale: string; section: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_SECTIONS.map((section) => ({ locale, section }))
  );
}

export default async function SectionPage({ params }: Props) {
  const { locale, section } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  if (!VALID_SECTIONS.includes(section as (typeof VALID_SECTIONS)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Nav");
  const label = t(section as (typeof VALID_SECTIONS)[number]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          {label}
        </h1>
        <p className="mt-4 text-stone-600 dark:text-stone-400">
          {locale === "pt"
            ? "Conteúdo em breve."
            : "Content coming soon."}
        </p>
      </div>
    </div>
  );
}
