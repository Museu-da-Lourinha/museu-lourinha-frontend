type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
};

export function PageShell({ eyebrow, title, lead, children }: Props) {
  return (
    <div className="-mt-16 min-h-screen font-sans">
      <header className="bg-primary pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {eyebrow && (
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-verde-lima">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
              {lead}
            </p>
          )}
        </div>
      </header>

      <main className="bg-stone-50 dark:bg-stone-950">{children}</main>
    </div>
  );
}
