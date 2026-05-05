import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-primary text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,_var(--color-azul-claro)_0%,_transparent_45%),radial-gradient(circle_at_85%_80%,_var(--color-verde-floresta)_0%,_transparent_55%)] opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.35)_100%)]"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-40">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.25em] text-white/70">
            {t("eyebrow")}
          </p>
          <h1
            id="hero-heading"
            className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t("tagline")}
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            {t("lead")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/visitar"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-verde-lima hover:text-primary-dark sm:text-base"
            >
              {t("ctaVisit")}
            </Link>
            <Link
              href="/sobre-nos"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
            >
              {t("ctaExplore")}
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden aspect-square w-full max-w-md justify-self-end lg:block"
        >
          <DecorativeMosaic />
        </div>
      </div>
    </section>
  );
}

function DecorativeMosaic() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full opacity-90"
    >
      <defs>
        <linearGradient id="paleo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-verde-lima)" />
          <stop offset="100%" stopColor="var(--color-azul-claro)" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="170" stroke="white" strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="200" cy="200" r="120" stroke="white" strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="200" cy="200" r="70" stroke="white" strokeOpacity="0.18" strokeWidth="1" />
      <path
        d="M70 260 C 110 200, 150 180, 200 200 S 310 260, 340 220 L 340 340 L 70 340 Z"
        fill="url(#paleo)"
        opacity="0.85"
      />
      <path
        d="M120 240 q 30 -50 80 -40 q 40 8 60 -10 q 25 -22 60 0"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="320" cy="120" r="8" fill="var(--color-verde-lima)" />
      <circle cx="100" cy="150" r="5" fill="white" fillOpacity="0.7" />
      <circle cx="260" cy="90" r="3" fill="white" fillOpacity="0.7" />
    </svg>
  );
}
