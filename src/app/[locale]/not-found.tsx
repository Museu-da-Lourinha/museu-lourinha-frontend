import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
        {t("title")}
      </h2>
      <p className="mt-2 max-w-md text-muted">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
      >
        {t("home")}
      </Link>
    </div>
  );
}
