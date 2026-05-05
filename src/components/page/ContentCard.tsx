import Image from "next/image";

type ContentCardProps = {
  index?: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * Cartão usado em páginas internas — ficha de tópico em stack vertical com
 * imagem opcional, índice tipográfico e descrição.
 */
export function ContentCard({ index, title, description, imageSrc, imageAlt }: ContentCardProps) {
  return (
    <article className="group flex h-full flex-col bg-paper-soft outline-none transition focus-within:bg-paper">
      {imageSrc ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-deep">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex h-full flex-col gap-3 p-7">
        <div className="flex items-center justify-between gap-4">
          {index ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">{index}</span>
          ) : (
            <span aria-hidden="true" className="block h-px w-8 bg-[var(--color-rule-strong)]" />
          )}
          <span aria-hidden="true" className="text-ink-faint">◆</span>
        </div>
        <h3 className="font-display text-2xl font-medium leading-snug tracking-tight">{title}</h3>
        <p className="text-sm leading-[1.7] text-ink-soft">{description}</p>
      </div>
    </article>
  );
}
