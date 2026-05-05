import { Marquee } from "@/components/ui/Marquee";

export function Ticker() {
  const items = [
    "Aberto Ter–Dom · 10h–18h",
    "Bilhete €5 · Crianças <12 grátis",
    "Visitas guiadas ao sábado",
    "Allossauro Atalaiense · Sala 02",
    "Coleção paleontológica Jurássica",
    "Núcleo etnográfico do Oeste",
    "Investigação · GEAL",
    "Estágios curriculares abertos",
  ];

  return (
    <section
      aria-label="Informação prática em destaque"
      className="border-y border-[var(--color-rule-strong)] bg-[var(--color-accent)] py-3 text-ink"
    >
      <Marquee items={items} />
    </section>
  );
}
