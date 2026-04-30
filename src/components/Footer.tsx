import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { key: "sobreNos", href: "/sobre-nos" },
  { key: "geal", href: "/geal" },
  { key: "visitar", href: "/visitar" },
  { key: "lojaOnline", href: "/loja-online" },
  { key: "guardioes", href: "/guardioes" },
] as const;

export function Footer() {
  const tNav = useTranslations("Nav");
  const tFooter = useTranslations("Footer");

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Museum info */}
          <div>
            <h2 className="font-display text-lg font-bold">
              Museu da Lourinhã
            </h2>
            <address className="mt-3 space-y-1 text-sm text-white/80 not-italic">
              <p>{tFooter("address")}</p>
              <p>
                <a href="tel:+351261413995" className="hover:text-white">
                  +351 261 413 995
                </a>
              </p>
              <p>
                <a
                  href="mailto:geral@museulourinha.org"
                  className="hover:text-white"
                >
                  geral@museulourinha.org
                </a>
              </p>
            </address>
          </div>

          {/* Navigation */}
          <nav aria-label={tFooter("navLabel")}>
            <h2 className="font-display text-lg font-bold">
              {tFooter("explore")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className="hover:text-white">
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Schedule */}
          <div>
            <h2 className="font-display text-lg font-bold">
              {tFooter("schedule")}
            </h2>
            <div className="mt-3 space-y-1 text-sm text-white/80">
              <p>{tFooter("hours")}</p>
              <p>{tFooter("closedDay")}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          <p>
            &copy; {new Date().getFullYear()} Museu da Lourinhã.{" "}
            {tFooter("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
