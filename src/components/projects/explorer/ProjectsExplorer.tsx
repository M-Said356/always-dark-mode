import { X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectGridSkeleton } from "@/components/ui/Skeletons";
import { useI18n } from "@/lib/i18n";
import { useProjectsExplorer } from "@/hooks/useProjectsExplorer";
import { ProjectFilterChips } from "./ProjectFilterChips";
import { ProjectsPagination } from "./ProjectsPagination";
import { ProjectsResults } from "./ProjectsResults";
import { ProjectsToolbar } from "./ProjectsToolbar";

/** Full projects browsing experience: search, filters, sorting, pagination. */
export function ProjectsExplorer() {
  const { tr } = useI18n();
  const explorer = useProjectsExplorer();

  return (
    <section className="section-shell section-y nav-offset">
      <div className="container-page">
        <Reveal>
          <header className="mb-8 max-w-2xl text-center md:text-start">
            <span className="eyebrow rounded-xl bg-foreground/10 px-3 py-1 text-primary border border-border inline-block mb-2">
              {tr("projects.index.eyebrow")}
            </span>
            <h1 className="type-h1 text-foreground">{tr("projects.index.title")}</h1>
            <p className="type-body mt-2 text-foreground/90">{tr("projects.index.desc")}</p>
          </header>
        </Reveal>

        <ProjectsToolbar
          searchQuery={explorer.searchQuery}
          onSearchChange={explorer.setSearchQuery}
          sort={explorer.sort}
          onSortChange={explorer.setSort}
          view={explorer.view}
          onViewChange={explorer.setView}
        />

        <ProjectFilterChips
          filter={explorer.filter}
          onChange={explorer.setFilter}
          counts={explorer.counts}
        />

        <div className="type-body mb-8 flex flex-wrap items-center justify-between gap-3 text-foreground/90">
          <p>
            {tr("projects.index.showing")}{" "}
            <span className="type-body-strong text-foreground">{explorer.filtered.length}</span>{" "}
            {tr("projects.index.projectsWord")}
            {explorer.totalPages > 1 &&
              ` · ${tr("projects.index.page")} ${explorer.page} / ${explorer.totalPages}`}
          </p>
          {explorer.hasActiveFilters && (
            <button
              onClick={explorer.reset}
              className="type-label inline-flex items-center gap-1.5 rounded-xl bg-foreground/10 border border-border px-4 py-1.5 text-foreground hover:bg-foreground/20 transition-colors"
            >
              <X className="size-3.5 text-primary" />
              {tr("projects.index.reset")}
            </button>
          )}
        </div>

        {explorer.isFiltering ? (
          <ProjectGridSkeleton count={explorer.perPage} view={explorer.view} />
        ) : explorer.paginated.length > 0 ? (
          <>
            <h2 className="sr-only">{tr("projects.index.results")}</h2>
            <ProjectsResults
              projects={explorer.paginated}
              view={explorer.view}
              sort={explorer.sort}
            />
            <ProjectsPagination
              page={explorer.page}
              totalPages={explorer.totalPages}
              onPageChange={explorer.setCurrentPage}
            />
          </>
        ) : (
          <EmptyState message={tr("projects.index.empty")} />
        )}
      </div>
    </section>
  );
}
