import { projectFilters } from "@/data";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent } from "@/lib/localize";
import type { ProjectFilter } from "@/hooks/useProjectsExplorer";

interface ProjectFilterChipsProps {
  filter: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
  counts: Record<string, number>;
}

/** Category chips with per-category result counts. */
export function ProjectFilterChips({ filter, onChange, counts }: ProjectFilterChipsProps) {
  const { tr } = useI18n();
  const { category } = useLocalizedContent();

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-2.5 py-1">
      {projectFilters.map((value) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={filter === value}
          className={`type-label pill-step rounded-xl transition-all duration-200 ${
            filter === value
              ? "bg-primary text-primary-foreground shadow-md scale-105"
              : "border border-border bg-foreground/10 text-foreground/90 hover:bg-foreground/20"
          }`}
        >
          {value === "All" ? tr("projects.index.all") : category(value)}
          {counts[value] != null && (
            <span className="type-micro ms-1.5 opacity-80 normal-case" dir="ltr">
              ({counts[value]})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
