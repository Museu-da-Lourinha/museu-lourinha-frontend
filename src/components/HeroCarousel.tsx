"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SLIDES = [
  { src: "/assets/images/Backgrounds/paleontologia.jpg", altKey: "slideAlt1" },
  { src: "/assets/images/Backgrounds/arqueologia.jpg", altKey: "slideAlt2" },
  { src: "/assets/images/Backgrounds/etnologia.jpg", altKey: "slideAlt3" },
  { src: "/assets/images/Backgrounds/jardim.jpg", altKey: "slideAlt4" },
] as const;

const ROTATE_MS = 3000;

export function HeroCarousel() {
  const t = useTranslations("HeroCarousel");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const goTo = (next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label={t("label")}
      className="relative -mt-16 h-[100svh] w-full overflow-hidden bg-stone-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      {SLIDES.map((slide, i) => {
        const isActive = i === index;
        return (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={t("slidePosition", { n: i + 1, total: SLIDES.length })}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={t(slide.altKey)}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        );
      })}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 pt-32 text-left text-white sm:pt-36">
        <h1 className="font-display max-w-3xl text-3xl font-bold leading-tight tracking-tight drop-shadow-md sm:text-4xl lg:text-5xl">
          {t("tagline")}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/90 drop-shadow sm:text-lg">
          {t("lead")}
        </p>
        <p className="mt-4 max-w-2xl text-base text-white/85 drop-shadow sm:text-lg">
          {t("lead2")}
        </p>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/visitar"
            className="inline-flex items-center justify-center bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-verde-lima hover:text-primary-dark sm:text-base"
          >
            {t("ctaVisit")}
          </Link>
          <Link
            href="/sobre-nos"
            className="inline-flex items-center justify-center border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 sm:text-base"
          >
            {t("ctaExplore")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4 sm:bottom-8 sm:right-12">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t("goToSlide", { n: i + 1 })}
                aria-current={isActive ? "true" : undefined}
                className={`h-1 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isActive ? "w-8 bg-verde-lima" : "w-2 bg-white/60 hover:bg-white/80"
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={t("previous")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={t("next")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 sm:h-6 sm:w-6"
    >
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
