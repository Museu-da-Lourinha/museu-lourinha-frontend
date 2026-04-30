import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-muted">
        Página não encontrada / Page not found
      </p>
      <Link
        href="/pt"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
      >
        Voltar ao início / Back to home
      </Link>
    </div>
  );
}
