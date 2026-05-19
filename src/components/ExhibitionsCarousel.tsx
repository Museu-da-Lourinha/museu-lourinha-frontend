"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/assets/exposicoes/slide-3-arqueologia.png",
    alt: "Exposição de Arqueologia do Museu da Lourinhã",
    title: "Arqueologia",
  },
  {
    src: "/assets/exposicoes/slide-1-etnografia.png",
    alt: "Exposição de Etnografia do Museu da Lourinhã",
    title: "Etnografia",
  },
  {
    src: "/assets/exposicoes/slide-2-paleontologia.png",
    alt: "Exposição de Paleontologia do Museu da Lourinhã",
    title: "Paleontologia",
  },
  {
    src: "/assets/exposicoes/slide-4-jardim.jpg",
    alt: "Jardim Jurássico do Museu da Lourinhã",
    title: "Jardim Jurássico",
  },
] as const;

const ROTATE_MS = 3500;

type ExhibitionsCarouselProps = {
  className?: string;
};

export function ExhibitionsCarousel({ className = "" }: ExhibitionsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const currentSlide = SLIDES[index];

  useEffect(() => {
    if (paused) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  };

  return (
    <div
      className={`relative mt-6 w-full overflow-hidden bg-stone-950 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[58svh] min-h-[20rem] w-full sm:h-[62svh] lg:h-[70svh]">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide, slideIndex) => (
            <div key={slide.src} className="relative h-full w-full shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                sizes="(min-width: 1536px) 1280px, (min-width: 1024px) 100vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-3 flex items-center sm:left-5">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Banner anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span aria-hidden="true" className="text-xl">
            ‹
          </span>
        </button>
      </div>

      <div className="absolute inset-y-0 right-3 flex items-center sm:right-5">
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Próximo banner"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span aria-hidden="true" className="text-xl">
            ›
          </span>
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-14 flex justify-center">
        <div className="relative h-16 w-64">
          <div className="absolute inset-0 rounded-t-[999px] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <p className="absolute inset-x-0 bottom-3 text-center font-display text-sm font-semibold text-white sm:text-base">
            {currentSlide.title}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <div className="flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 backdrop-blur-sm">
          {SLIDES.map((_, dotIndex) => {
            const active = dotIndex === index;
            return (
              <button
                key={dotIndex}
                type="button"
                onClick={() => goTo(dotIndex)}
                aria-label={`Ir para banner ${dotIndex + 1}`}
                aria-current={active ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active ? "w-6 bg-verde-lima" : "w-2 bg-white/70 hover:bg-white"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
