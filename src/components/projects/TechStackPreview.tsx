interface TechStackPreviewProps {
  techs: string[];
  limit?: number;
}

/** Compact tech chips with an overflow counter. */
export function TechStackPreview({ techs, limit = 3 }: TechStackPreviewProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {techs.slice(0, limit).map((tech) => (
        <span
          key={tech}
          dir="ltr"
          className="keep-latin rounded-xl bg-foreground/10 border border-border px-2.5 py-1 type-tag text-card-foreground/90"
        >
          {tech}
        </span>
      ))}
      {techs.length > limit && (
        <span className="rounded-xl bg-primary/20 border border-primary/40 px-2.5 py-1 type-tag text-primary">
          +{techs.length - limit}
        </span>
      )}
    </div>
  );
}
