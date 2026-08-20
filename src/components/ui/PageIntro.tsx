interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Shared page banner (eyebrow + H1 + lead paragraph) used by every sub page. */
export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="section-y-sm text-center">
      {eyebrow && (
        <span className="mb-4 inline-block rounded-xl border border-border bg-foreground/10 px-4 py-1.5 eyebrow-wide type-in text-primary">
          {eyebrow}
        </span>
      )}
      <h1 className="mb-4 type-h1 type-in type-delay-1 text-foreground">{title}</h1>
      {description && (
        <p className="mx-auto max-w-2xl type-lead type-in type-delay-2 text-foreground/90">
          {description}
        </p>
      )}
    </section>
  );
}
