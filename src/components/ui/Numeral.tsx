type NumeralProps = {
  value: string;
  className?: string;
};

/**
 * Numeral editorial em serif Fraunces — usado como capítulo "01", "02", "03".
 * Optical sizing alto e weight leve para um look de revista científica.
 */
export function Numeral({ value, className = "" }: NumeralProps) {
  return (
    <span
      aria-hidden="true"
      className={`font-display font-light leading-none tracking-tighter ${className}`}
      style={{ fontFeatureSettings: "'lnum', 'tnum'" }}
    >
      {value}
    </span>
  );
}
