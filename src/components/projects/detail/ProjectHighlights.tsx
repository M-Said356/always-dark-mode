import type { ProjectHighlight } from "@/data/project-details";

/** "At a glance" metric strip. */
export function ProjectHighlights({ highlights }: { highlights: ProjectHighlight[] }) {
  return (
    <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {highlights.map((item) => (
        <div key={item.label} className="surface-card p-6">
          <div className="type-micro mb-2 text-foreground/50">{item.label}</div>
          <div className="type-h4 text-card-foreground">{item.value}</div>
          {item.hint && (
            <div dir="ltr" className="type-micro mt-1.5 text-foreground/50 keep-latin normal-case">
              {item.hint}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
