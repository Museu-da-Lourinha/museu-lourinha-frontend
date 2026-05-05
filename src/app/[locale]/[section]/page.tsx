import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const SECTION_TO_NAV_KEY = {
  "sobre-nos": "sobreNos",
  geal: "geal",
  visitar: "visitar",
  "investigacao-cientifica": "investigacao",
  "loja-online": "lojaOnline",
  guardioes: "guardioes",
} as const;

type SectionSlug = keyof typeof SECTION_TO_NAV_KEY;

type Props = {
  params: Promise<{ locale: string; section: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    (Object.keys(SECTION_TO_NAV_KEY) as SectionSlug[]).map((section) => ({
      locale,
      section,
    }))
  );
}

export default async function SectionPage({ params }: Props) {
  const { locale, section } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  if (!(section in SECTION_TO_NAV_KEY)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Nav");
  const label = t(SECTION_TO_NAV_KEY[section as SectionSlug]);

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
