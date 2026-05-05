import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  className?: string;
  separator?: ReactNode;
};

/**
 * Marquee CSS-only — duplica os itens e move o conjunto -50% para loop perfeito.
 * Respeita prefers-reduced-motion (definido em globals.css).
 */
export function Marquee({
  items,
  className = "",
  separator = <span aria-hidden="true" className="mx-6 text-current/40">◆</span>,
}: MarqueeProps) {
  const renderRow = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "clone" || undefined}>
      {items.map((item, idx) => (
        <span key={`${key}-${idx}`} className="flex items-center">
          <span className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em]">{item}</span>
          {separator}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden ${className}`} role="marquee" aria-live="off">
      <div className="marquee">
        {renderRow("a")}
        {renderRow("clone")}
      </div>
    </div>
  );
}
