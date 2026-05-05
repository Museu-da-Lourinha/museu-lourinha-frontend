import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "paper" | "accent";
};

const toneMap = {
  ink: "text-ink",
  paper: "text-paper",
  accent: "text-accent",
} as const;

export function Eyebrow({ children, className = "", tone = "ink" }: EyebrowProps) {
  return <span className={`eyebrow ${toneMap[tone]} ${className}`}>{children}</span>;
}
