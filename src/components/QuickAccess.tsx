import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CARDS = [
  { key: "visitar", href: "/visitar", border: "border-l-azulao" },
  { key: "lojaOnline", href: "/loja-online", border: "border-l-laranja" },
  { key: "guardioes", href: "/guardioes", border: "border-l-verde-floresta" },
] as const;

export function QuickAccess() {
  const t = useTranslations("QuickAccess");

  return (
    <section
      aria-labelledby="quick-access-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2
          id="quick-access-heading"
          className="font-display text-3xl font-bold text-stone-900 sm:text-4xl"
        >
          {t("heading")}
        </h2>

        <ul role="list" className="mt-10 grid gap-6 lg:grid-cols-3">
          {CARDS.map(({ key, href, border }) => (
            <li key={key}>
              <Link
                href={href}
                className={`group flex h-full flex-col rounded-xl border border-stone-200 border-l-4 ${border} bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
              >
                <h3 className="font-display text-xl font-semibold text-stone-900">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-sm text-stone-600 sm:text-base">
                  {t(`${key}.description`)}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
                  {t(`${key}.cta`)}
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
    >
      <path
        d="M4 10h12m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
