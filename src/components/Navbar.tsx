"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { key: "museu", href: "/museu" },
  { key: "visitar", href: "/visitar" },
  { key: "geal", href: "/geal" },
  { key: "educacao", href: "/educacao" },
  { key: "investigacao", href: "/investigacao" },
  { key: "loja", href: "/loja" },
] as const;

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-0 right-0 top-0 z-50 overflow-visible bg-primary/60 backdrop-blur-sm"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-end px-6 py-6 pl-40 sm:pl-44">
        <Link
          href="/"
          className="absolute left-6 bottom-0 translate-y-1/2"
        >
          {/* Logo half above, half below navbar bottom border */}
          <Image
            src="/assets/images/logo-white.svg"
            alt="Museu da Lourinhã"
            width={130}
            height={132}
            priority
            className="h-[7rem] w-auto object-contain sm:h-[8rem]"
          />
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6" role="list">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-white/90 transition-colors hover:text-white"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 border-l border-white/40 pl-6" role="group" aria-label="Language selector">
            <button
              type="button"
              onClick={() => switchLocale("pt")}
              aria-current={locale === "pt" ? "true" : undefined}
              aria-label="Português"
              className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
                locale === "pt"
                  ? "bg-white text-primary"
                  : "text-white/90 hover:bg-white/20 hover:text-white"
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              aria-current={locale === "en" ? "true" : undefined}
              aria-label="English"
              className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
                locale === "en"
                  ? "bg-white text-primary"
                  : "text-white/90 hover:bg-white/20 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
