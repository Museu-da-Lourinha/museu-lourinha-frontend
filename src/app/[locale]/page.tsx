import { setRequestLocale } from "next-intl/server";
import { HeroCarousel } from "@/components/HeroCarousel";
import { LandingSections } from "@/components/LandingSections";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroCarousel />
      <LandingSections />
    </>
  );
}
