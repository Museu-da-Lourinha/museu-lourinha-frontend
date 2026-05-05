import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";

const COL_VISIT = [
  { label: "Bilheteira", href: "/visita#bilheteira" },
  { label: "Horários", href: "/visita#horarios" },
  { label: "Exposições", href: "/visita#exposicoes" },
  { label: "Como chegar", href: "/contactos#localizacao" },
] as const;

const COL_RESEARCH = [
  { label: "Laboratório", href: "/investigacao#laboratorio" },
  { label: "Coleções", href: "/investigacao#colecoes" },
  { label: "Publicações", href: "/investigacao#publicacoes" },
  { label: "Equipa", href: "/investigacao#equipa" },
] as const;

const COL_LEARN = [
  { label: "Programas escolares", href: "/educacao#escolas" },
  { label: "Recursos didáticos", href: "/educacao#recursos" },
  { label: "Estágios", href: "/educacao#estagios" },
  { label: "Newsletter", href: "/educacao#newsletter" },
] as const;

export function Footer() {
  const isEn = useLocale() === "en";
  const visit = isEn
    ? [
        { label: "Tickets", href: "/visita#bilheteira" },
        { label: "Opening hours", href: "/visita#horarios" },
        { label: "Exhibitions", href: "/visita#exposicoes" },
        { label: "How to get here", href: "/contactos#localizacao" },
      ]
    : COL_VISIT;
  const research = isEn
    ? [
        { label: "Laboratory", href: "/investigacao#laboratorio" },
        { label: "Collections", href: "/investigacao#colecoes" },
        { label: "Publications", href: "/investigacao#publicacoes" },
        { label: "Team", href: "/investigacao#equipa" },
      ]
    : COL_RESEARCH;
  const learn = isEn
    ? [
        { label: "School programs", href: "/educacao#escolas" },
        { label: "Teaching resources", href: "/educacao#recursos" },
        { label: "Internships", href: "/educacao#estagios" },
        { label: "Newsletter", href: "/educacao#newsletter" },
      ]
    : COL_LEARN;

  return (
    <footer className="bg-ink text-paper">
      <Container>
        <div className="grid gap-14 py-20 md:grid-cols-2 md:gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label={isEn ? "Museu da Lourinhã homepage" : "Página inicial Museu da Lourinhã"}
              className="inline-flex items-center gap-3 text-paper outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Logo size={56} />
              <span className="flex flex-col leading-[1.05]">
                <span className="font-display text-xl font-medium tracking-tight">Museu da Lourinhã</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-paper/60">
                  est. 1984 · GEAL
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-[1.75] text-paper/70">
              {isEn
                ? "Institution dedicated to preserving, researching and sharing the paleontological, archaeological and ethnographic heritage of Portugal's west region."
                : "Instituição dedicada à preservação, investigação e divulgação do património paleontológico, arqueológico e etnográfico da região oeste de Portugal."}
            </p>
            <address className="mt-6 not-italic text-sm leading-[1.75] text-paper/70">
              Rua João Luís de Moura, 95
              <br />
              2530-158 Lourinhã, Portugal
              <br />
              <a
                href="tel:+351261414003"
                className="text-paper underline-offset-4 hover:underline focus-visible:underline"
              >
                +351 261 414 003
              </a>
              <br />
              <a
                href="mailto:geral@museulourinha.org"
                className="text-paper underline-offset-4 hover:underline focus-visible:underline"
              >
                geral@museulourinha.org
              </a>
            </address>
          </div>

          <FooterColumn label={isEn ? "Visit" : "Visita"} eyebrow="01" items={visit} />
          <FooterColumn label={isEn ? "Research" : "Investigação"} eyebrow="02" items={research} />
          <FooterColumn label={isEn ? "Education" : "Educação"} eyebrow="03" items={learn} />
        </div>

        <div className="border-t border-paper/15 py-6">
          <div className="flex flex-col gap-4 text-[11px] uppercase tracking-[0.22em] text-paper/60 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Museu da Lourinhã · GEAL</p>
            <ul className="flex flex-wrap gap-6" role="list">
              <li>
                <Link href="/sobre" className="hover:text-paper">{isEn ? "About" : "Sobre"}</Link>
              </li>
              <li>
                <a href="https://museulourinha.org" target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                  museulourinha.org
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/museudalourinha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  label,
  eyebrow,
  items,
}: {
  label: string;
  eyebrow: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
        <span className="font-display text-base font-light tracking-normal opacity-80">{eyebrow}</span>
        {label}
      </p>
      <ul className="mt-5 space-y-3" role="list">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 text-sm text-paper/80 transition hover:text-paper focus-visible:text-paper outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
