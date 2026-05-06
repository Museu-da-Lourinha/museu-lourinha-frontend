import { Link } from "@/i18n/navigation";

type Card = {
  key: string;
  name: string;
  title: string;
  description?: string[];
  illustrationSrc: string;
  bgClass: string;
  textClass: string;
};

const MUSEU_CARDS: Card[] = [
  {
    key: "paleontologia",
    name: "Paleontologia",
    title: "O mundo perdido da Lourinhã",
    description: [
      "A colecção de Paleontologia, com elevada relevância científica mundial, é constituída maioritariamente por fósseis de dinossauros, tartarugas, corcodilomorfos e répteis voadores do Jurássico Superior da Lourinhã.",
    ],
    illustrationSrc: "/assets/images/Paleontology/SVG/Pegada.svg",
    bgClass: "bg-verde-lima",
    textClass: "text-azulao",
  },
  {
    key: "arqueologia",
    name: "Arqueologia",
    title: "Quem fomos, quem somos",
    description: [
      "Da coleção de Arqueologia, destaca-se o espólio de uma necrópole Neolítica, com vestigios osteológicos e líticos do enterramento coletivo mais antigo do concelho, até agora conhecido.",
    ],
    illustrationSrc: "/assets/images/Archeology/SVG/Biface.svg",
    bgClass: "bg-verde-agua",
    textClass: "text-grena",
  },
  {
    key: "etnografia",
    name: "Etnografia",
    title: "Aqui moram as nossas raízes",
    description: [
      "A Exposição Etnográfica, centra-se no modo de vida e nas principais atividades económicas e socioculturais praticadas no concelho, desde os finais do século XIX até ao século XX, abrange diversas áreas, profissões e ofícios.",
    ],
    illustrationSrc: "/assets/images/Etnography/SVG/Bilha.svg",
    bgClass: "bg-azul-claro",
    textClass: "text-laranja",
  },
  {
    key: "jardim",
    name: "Jardim Jurássico",
    title: "Onde o passado ganha vida",
    description: [
      "A Visita ao Museu da Lourinha inicia-se pelo Jardim Jurássico, onde os visitantes podem ver plantas descendentes daquelas que existiram há milhões de anos.",
      "como é o caso dos fetos arbóreos, cicas, cavalinhas. Ginkgo Biloba, entre inúmeras outras espécies.",
    ],
    illustrationSrc: "/assets/images/Garden/SVG/Gingko.svg",
    bgClass: "bg-lilas",
    textClass: "text-verde-floresta",
  },
];

export function LandingSections() {
  return (
    <>
      <MuseuSection />
      <EducacaoSection />
      <InvestigacaoSection />
    </>
  );
}

function MuseuSection() {
  return (
    <section className="flex h-[100svh] w-full items-center bg-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <h2 className="font-display text-4xl font-bold text-stone-900 sm:text-5xl">
          Exposições
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {MUSEU_CARDS.map((card) => (
            <article
              key={card.key}
              className={`flex h-[calc((100svh-12rem)/2)] flex-col overflow-hidden p-6 sm:p-8 ${card.bgClass} ${card.textClass} ${
                card.description ? "" : "justify-between"
              }`}
            >
              {card.description ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-block self-start">
                      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] sm:text-base">
                        {card.name}
                      </p>
                      <span
                        aria-hidden="true"
                        className="mt-2 block h-1 rounded-full bg-current"
                      />
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.illustrationSrc}
                      alt=""
                      aria-hidden="true"
                      className="h-14 w-auto sm:h-16 lg:h-20"
                    />
                  </div>
                  <div className="mt-4 space-y-2 text-[11px] leading-snug sm:text-xs lg:text-sm">
                    {card.description.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  <h3 className="font-display mt-auto pt-4 text-2xl font-extrabold uppercase tracking-wide sm:text-3xl lg:text-4xl">
                    {card.title}
                  </h3>
                </>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.illustrationSrc}
                    alt=""
                    aria-hidden="true"
                    className="h-24 w-auto self-end sm:h-32 lg:h-40"
                  />
                  <div>
                    <div className="inline-block">
                      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] sm:text-base">
                        {card.name}
                      </p>
                      <span
                        aria-hidden="true"
                        className="mt-2 block h-1 rounded-full bg-current"
                      />
                    </div>
                    <h3 className="font-display mt-4 text-2xl font-extrabold uppercase tracking-wide sm:text-3xl lg:text-4xl">
                      {card.title}
                    </h3>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducacaoSection() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-primary">
      {/* Right-side photo (sits behind the sauropode silhouette) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/fotos/visita_guiada_1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 hidden h-full w-1/2 object-cover lg:block"
      />

      {/* Sauropode silhouette spans the section, layered above the photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/Paleontology/SVG/Sauropode.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 w-[88%] max-w-full -translate-x-1/2 -scale-x-100 brightness-0 invert opacity-90 sm:w-[85%]"
      />

      {/* Content overlay (left half on lg+, full width on mobile) */}
      <div className="relative mx-auto h-full w-full max-w-7xl px-6 pt-24 sm:pt-32">
        <div className="lg:w-1/2 lg:pr-12">
          <h2 className="font-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
            Educação
          </h2>
          <Link
            href="/visitar"
            className="mt-8 inline-flex items-center justify-center bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-verde-lima hover:text-primary-dark sm:text-base"
          >
            Programas escolares
          </Link>
        </div>
      </div>
    </section>
  );
}

function InvestigacaoSection() {
  return (
    <section className="flex h-[100svh] w-full items-center justify-center bg-primary-dark">
      <div className="mx-auto w-full max-w-7xl px-6">
        <h2 className="font-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
          Investigação
        </h2>
      </div>
    </section>
  );
}
