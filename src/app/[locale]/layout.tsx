import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/site/Header";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://museulourinha.org"),
  title: {
    default: "Museu da Lourinhã",
    template: "%s · Museu da Lourinhã",
  },
  description:
    "Site institucional do Museu da Lourinhã — paleontologia jurássica, arqueologia regional, etnografia da costa oeste e programa educativo.",
  openGraph: {
    siteName: "Museu da Lourinhã",
    type: "website",
    locale: "pt_PT",
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
