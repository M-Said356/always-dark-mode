import { ArrowUpDown, LayoutGrid, Rows3, Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { PROJECT_SORTS, type SortValue } from "@/hooks/useProjectsExplorer";
import type { ProjectView } from "../types";

interface ProjectsToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  view: ProjectView;
  onViewChange: (value: ProjectView) => void;
}

/** Sticky search + sort + view-mode bar above the project results. */
export function ProjectsToolbar({
  searchQuery,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
}: ProjectsToolbarProps) {
  const { tr } = useI18n();

  return (
    <div
      className="sticky z-20 bleed-gutter mb-5 py-1.5"
      style={{ top: "calc(var(--nav-h, 4.5rem) + 0.25rem)" }}
    >
      <div className="rounded-2xl bg-card p-2.5 border border-border shadow-glow grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
        <div className="relative min-w-0">
          <label htmlFor="project-search" className="sr-only">
            {tr("projects.index.sort")}
          </label>
          <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-card-foreground/70" />
          <input
            id="project-search"
            type="search"
            placeholder={tr("projects.index.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-full rounded-xl border border-border bg-foreground/10 ps-10 pe-9 type-control text-card-foreground placeholder:text-card-foreground/60 transition-all focus:border-foreground/40 focus:bg-foreground/15 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label={tr("projects.index.clear")}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-xl p-1 text-card-foreground/70 hover:text-card-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="relative">
          <label htmlFor="project-sort" className="sr-only">
            {tr("projects.index.sort")}
          </label>
          <Select value={sort} onValueChange={(v) => onSortChange(v as SortValue)}>
            <SelectTrigger
              id="project-sort"
              aria-label={tr("projects.index.sort")}
              className="h-9 w-full gap-2 rounded-xl border-border bg-foreground/10 px-3 type-control text-card-foreground shadow-none transition-all hover:bg-foreground/15 focus:ring-0 md:w-44"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 whitespace-nowrap text-start">
                <ArrowUpDown className="size-4 shrink-0 text-primary" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border bg-card text-card-foreground">
              {PROJECT_SORTS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer rounded-xl type-control text-card-foreground hover:bg-foreground/10 focus:bg-foreground/10"
                >
                  {tr(option.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div
          role="group"
          aria-label={tr("projects.index.viewMode")}
          className="flex h-9 shrink-0 items-center gap-1 rounded-xl border border-border bg-foreground/10 p-1"
        >
          <ViewButton
            active={view === "grid"}
            onClick={() => onViewChange("grid")}
            label={tr("projects.index.grid")}
          >
            <LayoutGrid className="size-4" />
          </ViewButton>
          <ViewButton
            active={view === "list"}
            onClick={() => onViewChange("list")}
            label={tr("projects.index.list")}
          >
            <Rows3 className="size-4" />
          </ViewButton>
        </div>
      </div>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`inline-flex size-9 items-center justify-center rounded-xl transition-all ${
        active
          ? "bg-foreground text-background shadow-sm"
          : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
