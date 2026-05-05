import Image from "next/image";
import { useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function Featured() {
  const isEn = useLocale() === "en";

  return (
    <section className="bg-paper py-20 sm:py-28" aria-label={isEn ? "Featured exhibition" : "Exposição em destaque"}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-deep">
              <Image
                src="/assets/home/featured.png"
                alt={isEn ? "Featured Atalaia allosaurus" : "Allossauro atalaiense em destaque"}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              {isEn
                ? "Fig. 01 · Atalaia Allosaurus · holotype · Lourinhã, Room 02"
                : "Fig. 01 · Allossauro Atalaiense · holótipo · Lourinhã, Sala 02"}
            </p>
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <Eyebrow>{isEn ? "In focus" : "Em foco"}</Eyebrow>
              <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">
                {isEn ? "The dinosaur that " : "O dinossauro que "}
                <span className="italic text-[var(--color-warm)]">{isEn ? "redrew" : "redesenhou"}</span>
                {isEn ? " Iberian Jurassic history." : " o Jurássico ibérico."}
              </h2>
              <p className="mt-6 text-base leading-[1.75] text-ink-soft">
                {isEn
                  ? "Among the holotypes preserved by the museum, Atalaia allosaurus is a global reference specimen. Its story - excavation, lab preparation, scientific description and return to exhibition - is also the story of the museum as a research institution."
                  : "Entre os holótipos abrigados pelo museu, o Allossauro atalaiense é peça de referência mundial. A sua história — escavação, preparação laboratorial, descrição científica e devolução à exposição — é também a história do museu como instituição de investigação."}
              </p>
            </div>

            <div className="mt-10">
              <Button href="/investigacao" size="lg">{isEn ? "Scientific research" : "Investigação científica"}</Button>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--color-rule)] pt-6 text-sm text-ink-soft">
                <li className="flex items-center justify-between gap-3">
                  <span className="text-ink-faint">{isEn ? "Period" : "Período"}</span>
                  <span className="font-medium text-ink">{isEn ? "Upper Jurassic" : "Jurássico Sup."}</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-ink-faint">{isEn ? "Location" : "Localização"}</span>
                  <span className="font-medium text-ink">{isEn ? "Areia Branca Beach" : "Praia da Areia Branca"}</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-ink-faint">{isEn ? "Age" : "Idade"}</span>
                  <span className="font-medium text-ink">~150 Ma</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-ink-faint">{isEn ? "Room" : "Sala"}</span>
                  <span className="font-medium text-ink">{isEn ? "02 · Paleontology" : "02 · Paleontologia"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
