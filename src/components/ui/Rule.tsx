type RuleProps = {
  className?: string;
  tone?: "default" | "strong";
};

/** Hairline horizontal — usada como separador editorial entre capítulos. */
export function Rule({ className = "", tone = "default" }: RuleProps) {
  const bg = tone === "strong" ? "bg-[var(--color-rule-strong)]" : "bg-[var(--color-rule)]";
  return <hr className={`h-px w-full border-0 ${bg} ${className}`} />;
}
