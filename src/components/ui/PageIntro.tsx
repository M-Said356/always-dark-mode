interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Shared page banner (eyebrow + H1 + lead paragraph) used by every sub page. */
export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="py-12 text-center">
      {eyebrow && (
        <span className="mb-4 inline-block rounded-xl border border-border bg-foreground/10 px-4 py-1.5 font-sans text-xs font-black uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </span>
      )}
      <h1 className="mb-4 font-['Oswald',sans-serif] text-5xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto max-w-2xl font-sans text-sm leading-relaxed text-foreground/90 sm:text-base">
          {description}
        </p>
      )}
    </section>
  );
}
