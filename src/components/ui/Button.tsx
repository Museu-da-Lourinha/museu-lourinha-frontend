import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "ghost" | "warm";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  trailingIcon?: ReactNode;
};

const base =
  "group inline-flex items-center gap-2.5 font-sans font-semibold uppercase tracking-[0.18em] transition outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const sizeMap = {
  md: "px-5 py-3 text-[11px]",
  lg: "px-7 py-4 text-xs",
} as const;

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-ink hover:bg-[var(--color-accent-deep)] focus-visible:ring-offset-paper",
  ghost:
    "bg-transparent text-ink border border-[var(--color-rule-strong)] hover:border-ink hover:bg-ink hover:text-paper",
  warm:
    "bg-[var(--color-warm)] text-ink hover:bg-[var(--color-warm-deep)]",
};

const arrow = (
  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
    →
  </span>
);

type ButtonAsLinkProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href">;

type ButtonAsButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;

export function Button(props: ButtonAsLinkProps | ButtonAsButtonProps) {
  const {
    variant = "primary",
    size = "md",
    children,
    className = "",
    trailingIcon = arrow,
  } = props;

  const cls = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLinkProps;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...(rest as ComponentPropsWithoutRef<"a">)}
        >
          {children}
          {trailingIcon}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
        {trailingIcon}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButtonProps;
  return (
    <button type="button" className={cls} {...rest}>
      {children}
      {trailingIcon}
    </button>
  );
}
