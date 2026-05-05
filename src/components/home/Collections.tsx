import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Collection = {
  label: string;
  count: string;
  description: string;
  iconSrc: string;
  href: string;
};

const COLLECTIONS: Collection[] = [
  {
    label: "Paleontologia",
    count: "12 400+ peças",
    description: "Holótipos do Jurássico Superior, ovos de dinossauro e icnofósseis da costa oeste.",
    iconSrc: "/assets/images/Paleontology/SVG/Asset 1.svg",
    href: "/investigacao#paleontologia",
  },
  {
    label: "Arqueologia",
    count: "6 800+ peças",
    description: "Material lítico, cerâmico e numismático do Paleolítico ao período moderno.",
    iconSrc: "/assets/images/Archeology/SVG/Asset 8.svg",
    href: "/investigacao#arqueologia",
  },
  {
    label: "Etnografia",
    count: "4 500+ peças",
    description: "Cultura material agrícola, marítima e doméstica da região da Lourinhã.",
    iconSrc: "/assets/images/Etnography/SVG/Asset 17.svg",
    href: "/investigacao#etnografia",
  },
  {
    label: "Jardim Jurássico",
    count: "Ao ar livre",
    description: "Reconstituições à escala e flora associada ao habitat jurássico ibérico.",
    iconSrc: "/assets/images/Garden/SVG/Asset 25.svg",
    href: "/visita#jardim",
  },
];

export function Collections() {
  const isEn = useLocale() === "en";
  const items = isEn
    ? COLLECTIONS.map((c) => {
        if (c.label === "Paleontologia") {
          return {
            ...c,
            label: "Paleontology",
            count: "12,400+ items",
            description: "Upper Jurassic holotypes, dinosaur eggs and ichnofossils from Portugal's west coast.",
          };
        }
        if (c.label === "Arqueologia") {
          return {
            ...c,
            label: "Archaeology",
            count: "6,800+ items",
            description: "Lithic, ceramic and numismatic material from the Paleolithic to the modern era.",
          };
        }
        if (c.label === "Etnografia") {
          return {
            ...c,
            label: "Ethnography",
            count: "4,500+ items",
            description: "Agricultural, maritime and domestic material culture from the Lourinhã region.",
          };
        }
        return {
          ...c,
          label: "Jurassic Garden",
          count: "Outdoor",
          description: "Scale reconstructions and flora associated with Iberian Jurassic habitats.",
        };
      })
    : COLLECTIONS;

  return (
    <section className="bg-paper-soft py-20 sm:py-28" aria-labelledby="colecoes-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{isEn ? "Collections" : "Coleções"}</Eyebrow>
            <h2 id="colecoes-title" className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">
              {isEn ? "Four " : "Quatro "}
              <span className="italic text-[var(--color-warm)]">{isEn ? "archives" : "arquivos"}</span>
              {isEn ? " of territory." : " de território."}
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.75] text-ink-soft">
              {isEn
                ? "The museum's collections are organized in four complementary fronts - each with its own inventory, conservation and interpretation criteria."
                : "As coleções do museu organizam-se em quatro frentes complementares — cada uma com critérios de inventário, conservação e interpretação próprios."}
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid grid-cols-1 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2" role="list">
              {items.map((c, idx) => (
                <li key={c.label} className="bg-paper-soft">
                  <Link
                    href={c.href}
                    className="group flex h-full flex-col gap-5 p-7 transition hover:bg-paper outline-none focus-visible:bg-paper focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                        0{idx + 1}
                      </span>
                      <span aria-hidden="true" className="text-ink-faint transition group-hover:translate-x-1 group-hover:text-ink">
                        →
                      </span>
                    </div>
                    <div className="flex h-20 w-20 items-center justify-center text-ink">
                      <Image
                        src={c.iconSrc}
                        alt=""
                        width={80}
                        height={80}
                        aria-hidden="true"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="mt-auto">
                      <p className="font-display text-2xl font-medium tracking-tight">{c.label}</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-faint">
                        {c.count}
                      </p>
                      <p className="mt-3 text-sm leading-[1.7] text-ink-soft">{c.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
