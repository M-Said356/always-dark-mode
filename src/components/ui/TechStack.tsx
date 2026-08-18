interface TechStackProps {
  techs: string[];
  variant?: "inline" | "grid";
  className?: string;
}

export function TechStack({ techs, variant = "grid", className = "" }: TechStackProps) {
  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {techs.map((tech) => (
          <span
            key={tech}
            className="rounded-xl bg-foreground/10 px-4 py-2 font-sans text-xs font-bold text-card-foreground border border-border"
          >
            {tech}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-card p-8 border border-border shadow-[var(--shadow-glow)] ${className}`}
    >
      <h2 className="font-['Oswald',sans-serif] text-3xl font-bold text-card-foreground mb-6 uppercase">
        Tech Stack
      </h2>
      <div className="flex flex-wrap gap-3">
        {techs.map((tech) => (
          <span
            key={tech}
            className="rounded-xl bg-foreground/10 px-4 py-2 font-sans text-xs font-bold text-card-foreground border border-border shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
