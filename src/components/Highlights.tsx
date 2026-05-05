import { useTranslations } from "next-intl";

type HighlightKey = "paleontologia" | "arqueologia" | "etnografia" | "jardim";

const HIGHLIGHTS: Array<{
  key: HighlightKey;
  bg: string;
  accent: string;
  text: string;
  glyph: React.ReactNode;
}> = [
  {
    key: "paleontologia",
    bg: "bg-azulao",
    accent: "bg-verde-lima",
    text: "text-white",
    glyph: <BoneGlyph />,
  },
  {
    key: "arqueologia",
    bg: "bg-grena",
    accent: "bg-verde-agua",
    text: "text-white",
    glyph: <AmphoraGlyph />,
  },
  {
    key: "etnografia",
    bg: "bg-laranja",
    accent: "bg-azul-claro",
    text: "text-white",
    glyph: <BoatGlyph />,
  },
  {
    key: "jardim",
    bg: "bg-verde-floresta",
    accent: "bg-lilas",
    text: "text-white",
    glyph: <FernGlyph />,
  },
];

export function Highlights() {
  const t = useTranslations("Highlights");

  return (
    <section
      aria-labelledby="highlights-heading"
      className="bg-stone-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2
            id="highlights-heading"
            className="font-display text-3xl font-bold text-stone-900 sm:text-4xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 text-base text-stone-600 sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <ul
          role="list"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HIGHLIGHTS.map(({ key, bg, accent, text, glyph }) => (
            <li
              key={key}
              className={`group relative flex h-72 flex-col justify-between overflow-hidden rounded-2xl ${bg} ${text} p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <span
                aria-hidden="true"
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${accent} opacity-30 transition-transform duration-500 group-hover:scale-110`}
              />
              <div aria-hidden="true" className="relative z-10 h-12 w-12 opacity-90">
                {glyph}
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-xl font-semibold">
                  {t(`${key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-white/85">
                  {t(`${key}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BoneGlyph() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <path
        d="M11 19a4 4 0 0 1 4-4 4 4 0 0 1 4-4l13 13a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4L11 23a4 4 0 0 1-4-4 4 4 0 0 1 4-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AmphoraGlyph() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <path
        d="M18 8h12M20 8v4l-6 6v14a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V18l-6-6V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M14 22h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BoatGlyph() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <path
        d="M6 30h36l-4 8H10l-4-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 6v24M24 6l10 12H14L24 6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FernGlyph() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <path
        d="M24 42V14M24 14c0-4 4-8 10-8-2 6-6 10-10 10zM24 22c0-3 3-6 8-6-2 5-5 8-8 8zM24 30c0-3 3-5 7-5-2 4-4 7-7 7zM24 14c0-4-4-8-10-8 2 6 6 10 10 10zM24 22c0-3-3-6-8-6 2 5 5 8 8 8zM24 30c0-3-3-5-7-5 2 4 4 7 7 7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
