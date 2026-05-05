import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Article = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

const ARTICLES: Article[] = [
  {
    category: "Investigação",
    date: "Fev 2026",
    title: "Novo estudo redescreve a anatomia do Allossauro atalaiense.",
    excerpt:
      "A revisão do holótipo, conduzida em parceria com a NOVA, propõe uma reconstrução tridimensional inédita.",
    href: "/investigacao#publicacoes",
    imageSrc: "/assets/home/team-2.png",
    imageAlt: "Trabalho de laboratório no museu",
  },
  {
    category: "Educação",
    date: "Jan 2026",
    title: "Programas escolares 2026 abertos a inscrições.",
    excerpt:
      "Sete itinerários pedagógicos para o pré-escolar, 1.º, 2.º e 3.º ciclos e secundário, com kits de campo incluídos.",
    href: "/educacao#escolas",
    imageSrc: "/assets/home/team-3.png",
    imageAlt: "Atividade pedagógica em sala",
  },
  {
    category: "Coleções",
    date: "Dez 2025",
    title: "Inventário das peças etnográficas do núcleo agrícola disponível online.",
    excerpt:
      "Mais de 800 objetos passam a estar acessíveis em ficha aberta, com fotografia e contexto histórico.",
    href: "/investigacao#etnografia",
    imageSrc: "/assets/home/expo-2.png",
    imageAlt: "Peças etnográficas em exposição",
  },
];

export function InFocus() {
  const isEn = useLocale() === "en";
  const items = isEn
    ? ARTICLES.map((a) => {
        if (a.category === "Investigação") {
          return {
            ...a,
            category: "Research",
            date: "Feb 2026",
            title: "New study redraws Atalaia allosaurus anatomy.",
            excerpt:
              "The holotype revision, conducted with NOVA University, proposes a new 3D reconstruction.",
            imageAlt: "Museum laboratory work",
          };
        }
        if (a.category === "Educação") {
          return {
            ...a,
            category: "Education",
            date: "Jan 2026",
            title: "2026 school programs open for registration.",
            excerpt:
              "Seven educational itineraries for preschool to high school, including field kits.",
            imageAlt: "Educational activity in gallery",
          };
        }
        return {
          ...a,
          category: "Collections",
          date: "Dec 2025",
          title: "Agricultural ethnography inventory now available online.",
          excerpt: "More than 800 objects are now open-access with images and historical context.",
          imageAlt: "Ethnographic objects on display",
        };
      })
    : ARTICLES;

  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="emfoco-title">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{isEn ? "Museum journal" : "Diário do museu"}</Eyebrow>
            <h2 id="emfoco-title" className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">
              {isEn ? "In " : "Em "}
              <span className="italic text-[var(--color-warm)]">{isEn ? "circulation" : "circulação"}</span>.
            </h2>
          </div>
          <Link
            href="/investigacao#publicacoes"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink hover:text-[var(--color-warm)]"
          >
            {isEn ? "View all entries" : "Ver todas as entradas"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8" role="list">
          {items.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="group block outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper">
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-paper-deep">
                  <Image
                    src={a.imageSrc}
                    alt={a.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">
                  <span className="text-ink">{a.category}</span>
                  <span aria-hidden="true">/</span>
                  <span>{a.date}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-medium leading-snug tracking-tight transition group-hover:text-[var(--color-warm)] sm:text-[22px]">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-ink-soft">{a.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
