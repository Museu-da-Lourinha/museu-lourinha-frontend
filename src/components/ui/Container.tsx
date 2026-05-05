import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
};

const sizeMap = {
  default: "max-w-[1240px]",
  wide: "max-w-[1380px]",
  narrow: "max-w-[920px]",
} as const;

export function Container({
  as: Tag = "div",
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${sizeMap[size]} ${className}`}>
      {children}
    </Tag>
  );
}
