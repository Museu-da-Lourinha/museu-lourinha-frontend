import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { QuickAccess } from "@/components/QuickAccess";
import { LatestNews } from "@/components/LatestNews";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Highlights />
      <QuickAccess />
      <LatestNews locale={locale} />
    </>
  );
}
