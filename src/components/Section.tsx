import { Link } from "@/i18n/navigation";

type Props = {
  id: string;
  title: string;
  eyebrow?: string;
  cta?: { label: string; href: string };
  children?: React.ReactNode;
  contentClassName?: string;
};

export function Section({
  id,
  title,
  eyebrow,
  cta,
  children,
  contentClassName,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 border-t border-stone-200 py-20 first:border-0 sm:py-24 dark:border-stone-800"
    >
      <div className="mx-auto max-w-7xl px-6">
        {eyebrow && (
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary dark:text-azul-claro">
            {eyebrow}
          </p>
        )}
        <h2
          id={`${id}-heading`}
          className="font-display mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100"
        >
          {title}
        </h2>

        <div
          className={`mt-6 max-w-3xl text-base leading-relaxed text-stone-700 dark:text-stone-300 ${
            contentClassName ?? ""
          }`}
        >
          {children ?? <PlaceholderText />}
        </div>

        {cta && (
          <div className="mt-8">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:text-base"
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function PlaceholderText() {
  return (
    <p className="italic text-stone-500 dark:text-stone-400">
      Conteúdo em breve.
    </p>
  );
}
