"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SLIDES = [
  {
    src: "/assets/images/Backgrounds/Paleontologia.png",
    frontSrc: "/assets/images/Backgrounds/Fronts/Paleontologia_front.png",
    frontClass: "right-[5vw] top-[calc(50%+5svh)] h-[90svh] w-[50vw] -translate-y-1/2",
    icon: "/assets/images/Paleontology/SVG/Pegada.svg",
    iconBgClass: "bg-verde-lima",
    iconColorClass: "bg-azulao",
    label: "Paleontologia",
    altKey: "slideAlt1",
  },
  {
    src: "/assets/images/Backgrounds/Arqueologia.png",
    frontSrc: "/assets/images/Backgrounds/Fronts/Arqueologia_front.png",
    frontClass: "right-[4vw] top-[calc(50%-1svh)] h-[90svh] w-[50vw] -translate-y-1/2",
    icon: "/assets/images/Archeology/SVG/Biface.svg",
    iconBgClass: "bg-verde-agua",
    iconColorClass: "bg-grena",
    label: "Arqueologia",
    altKey: "slideAlt2",
  },
  {
    src: "/assets/images/Backgrounds/Etnologia.png",
    frontSrc: "/assets/images/Backgrounds/Fronts/Etnografia_front.png",
    frontClass: "right-[5vw] top-[calc(50%+5svh)] h-[99svh] w-[55vw] -translate-y-1/2",
    icon: "/assets/images/Etnography/SVG/Bilha.svg",
    iconBgClass: "bg-azul-claro",
    iconColorClass: "bg-laranja",
    label: "Etnografia",
    altKey: "slideAlt3",
  },
  {
    src: "/assets/images/Backgrounds/jardim.jpg",
    frontSrc: null,
    frontClass: null,
    icon: "/assets/images/Garden/SVG/Gingko.svg",
    iconBgClass: "bg-lilas",
    iconColorClass: "bg-verde-floresta",
    label: "Jardim Jurássico",
    altKey: "slideAlt4",
  },
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
            className={`absolute inset-0 ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={t(slide.altKey)}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {slide.frontSrc && (
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute z-[5] ${slide.frontClass ?? ""}`}
              >
                <Image
                  src={slide.frontSrc}
                  alt=""
                  fill
                  priority
                  sizes="65vw"
                  className="object-contain object-right"
                />
              </div>
            )}
          </div>
        );
      })}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl -translate-y-[5svh] flex-col items-start justify-center px-6 pt-32 text-left text-white sm:pt-36">
        <h1 className="font-display max-w-3xl text-[1.78rem] font-bold leading-tight tracking-tight drop-shadow-md sm:text-[2.14rem] lg:text-[2.85rem]">
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

      <div className="absolute inset-x-0 bottom-6 z-20 sm:bottom-8">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-3 px-6">
          <span
            aria-hidden="true"
            key={SLIDES[index].label}
            className="font-display pointer-events-none mr-2 text-right text-sm font-semibold uppercase tracking-[0.2em] text-white drop-shadow sm:text-base"
          >
            {SLIDES[index].label}
          </span>
          {SLIDES.map((slide, i) => {
            const isActive = i === index;
            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t("goToSlide", { n: i + 1 })}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex h-[2.34rem] w-[2.34rem] items-center justify-center border border-white transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-[2.88rem] sm:w-[2.88rem] ${
                  isActive
                    ? `scale-[1.15] ${slide.iconBgClass}`
                    : "scale-100 bg-transparent hover:bg-white/10"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`block h-[1.44rem] w-[1.44rem] transition-colors duration-300 sm:h-[1.8rem] sm:w-[1.8rem] ${
                    isActive ? slide.iconColorClass : "bg-white"
                  }`}
                  style={{
                    WebkitMaskImage: `url(${slide.icon})`,
                    maskImage: `url(${slide.icon})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

