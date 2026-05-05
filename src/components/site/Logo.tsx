import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
};

/**
 * Logo do Museu da Lourinhã — versão completa (Asset 1) com moldura azul + dinossauro/wordmark branco.
 * Funciona em fundo claro (vê azul+branco) e em fundo navy (a moldura desaparece, fica a silhueta branca).
 */
export function Logo({ size = 44, className = "" }: LogoProps) {
  return (
    <Image
      src="/assets/images/Logos/SVG/Asset 1.svg"
      alt="Museu da Lourinhã"
      width={size}
      height={size}
      priority
      className={`block h-auto w-auto ${className}`}
      style={{ width: size, height: "auto" }}
    />
  );
}
