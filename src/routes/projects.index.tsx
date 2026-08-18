import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, projectFilters } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard, type ProjectView } from "@/components/ui/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectGridSkeleton, PageSkeleton } from "@/components/ui/Skeletons";
import { Search, ChevronLeft, ChevronRight, LayoutGrid, Rows3, X, ArrowUpDown } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";
import { pageSeo, pageTitle } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { useLocalizedContent } from "@/lib/localize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROJECTS_DESCRIPTION =
  "Browse every project: multi-vendor marketplaces, e-commerce platforms and high-scale systems, with search, filters and sorting.";

export const Route = createFileRoute("/projects/")({
  head: () =>
    pageSeo({
      title: pageTitle("All Projects"),
      description: PROJECTS_DESCRIPTION,
      path: "/projects",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "All Projects",
          description: PROJECTS_DESCRIPTION,
          url: absoluteUrl("/projects"),
        },
      ],
    }),
  component: ProjectsPage,
  pendingComponent: PageSkeleton,
});

const SORTS = [
  { value: "default", key: "projects.sort.default" },
  { value: "az", key: "projects.sort.az" },
  { value: "za", key: "projects.sort.za" },
  { value: "category", key: "projects.sort.category" },
  { value: "tech", key: "projects.sort.tech" },
] as const;

type SortValue = (typeof SORTS)[number]["value"];

function ProjectsPage() {
  const { tr } = useI18n();
  const { category: trCategory } = useLocalizedContent();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const isFiltering = deferredQuery !== searchQuery;
  const [sort, setSort] = useState<SortValue>("default");
  const [view, setView] = useState<ProjectView>("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = view === "grid" ? 9 : 6;

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    let result = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    const query = deferredQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.client?.toLowerCase().includes(query) ?? false) ||
          p.tech.some((t) => t.toLowerCase().includes(query)),
      );
    }
    const sorted = [...result];
    if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") sorted.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "category")
      sorted.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
    if (sort === "tech") sorted.sort((a, b) => b.tech.length - a.tech.length);
    return sorted;
  }, [filter, deferredQuery, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery, sort, view]);

  const page = Math.min(currentPage, totalPages);
  const paginatedProjects = filtered.slice((page - 1) * perPage, page * perPage);
  const hasActiveFilters = filter !== "All" || searchQuery.trim().length > 0 || sort !== "default";

  return (
    <PageShell contained={false} padded={false}>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <header className="mb-8 max-w-2xl text-center md:text-start">
              <span className="rounded-xl bg-foreground/10 px-3 py-1 font-sans text-[11px] font-black tracking-[0.25em] text-primary uppercase border border-border inline-block mb-2">
                {tr("projects.index.eyebrow")}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight uppercase">
                {tr("projects.index.title")}
              </h1>
              <p className="mt-2 font-sans text-sm text-foreground/90">
                {tr("projects.index.desc")}
              </p>
            </header>
          </Reveal>

          {/* Toolbar: search + sort + view mode */}
          <div
            className="sticky z-20 -mx-5 mb-5 px-5 py-1.5"
            style={{ top: "calc(var(--nav-h, 4.5rem) + 0.25rem)" }}
          >
            <div className="rounded-2xl bg-card p-2.5 border border-border shadow-[var(--shadow-glow)] grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
              {/* Search Box */}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-full rounded-xl border border-border bg-foreground/10 ps-10 pe-9 text-sm text-card-foreground placeholder:text-card-foreground/60 transition-all focus:border-foreground/40 focus:bg-foreground/15 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label={tr("projects.index.clear")}
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-xl p-1 text-card-foreground/70 hover:text-card-foreground transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="relative">
                <label htmlFor="project-sort" className="sr-only">
                  {tr("projects.index.sort")}
                </label>
                <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
                  <SelectTrigger
                    id="project-sort"
                    aria-label={tr("projects.index.sort")}
                    className="h-9 w-full gap-2 rounded-xl border-border bg-foreground/10 px-3 text-sm font-bold text-card-foreground shadow-none transition-all hover:bg-foreground/15 focus:ring-0 md:w-44"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2 whitespace-nowrap text-start">
                      <ArrowUpDown className="size-4 shrink-0 text-primary" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border bg-card text-card-foreground">
                    {SORTS.map((s) => (
                      <SelectItem
                        key={s.value}
                        value={s.value}
                        className="cursor-pointer rounded-xl text-sm text-card-foreground hover:bg-foreground/10 focus:bg-foreground/10"
                      >
                        {tr(s.key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Toggle */}
              <div
                role="group"
                aria-label={tr("projects.index.viewMode")}
                className="flex h-9 shrink-0 items-center gap-1 rounded-xl border border-border bg-foreground/10 p-1"
              >
                <ViewButton
                  active={view === "grid"}
                  onClick={() => setView("grid")}
                  label={tr("projects.index.grid")}
                >
                  <LayoutGrid className="size-4" />
                </ViewButton>
                <ViewButton
                  active={view === "list"}
                  onClick={() => setView("list")}
                  label={tr("projects.index.list")}
                >
                  <Rows3 className="size-4" />
                </ViewButton>
              </div>
            </div>
          </div>

          {/* Filter chips */}
          <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-2.5 py-1">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-black tracking-widest uppercase transition-all duration-200 ${
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "border border-border bg-foreground/10 text-foreground/90 hover:bg-foreground/20"
                }`}
              >
                {f === "All" ? tr("projects.index.all") : trCategory(f)}
                {counts[f] != null && (
                  <span className="ms-1.5 text-[10px] opacity-80" dir="ltr">
                    ({counts[f]})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results Count & Reset Button */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-foreground/90 font-medium">
            <p>
              {tr("projects.index.showing")}{" "}
              <span className="font-bold text-foreground">{filtered.length}</span>{" "}
              {tr("projects.index.projectsWord")}
              {totalPages > 1 && ` · ${tr("projects.index.page")} ${page} / ${totalPages}`}
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setFilter("All");
                  setSearchQuery("");
                  setSort("default");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-foreground/10 border border-border px-4 py-1.5 font-sans text-xs font-black tracking-wider uppercase text-foreground hover:bg-foreground/20 transition-colors"
              >
                <X className="size-3.5 text-primary" />
                {tr("projects.index.reset")}
              </button>
            )}
          </div>

          {isFiltering ? (
            <ProjectGridSkeleton count={perPage} view={view} />
          ) : paginatedProjects.length > 0 ? (
            <>
              <h2 className="sr-only">{tr("projects.index.results")}</h2>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${sort}-${view}`}
                  layout
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                    layout: reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 120, damping: 18, mass: 0.6 },
                  }}
                  className={
                    view === "grid"
                      ? "mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      : "mb-12 flex flex-col gap-4"
                  }
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} view={view} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {totalPages > 1 && (
                <nav
                  aria-label={tr("projects.index.pagination")}
                  className="flex flex-wrap items-center justify-center gap-3"
                >
                  <button
                    onClick={() => setCurrentPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-2 rounded-xl bg-foreground/10 border border-border px-4 py-2 text-xs font-black tracking-wider text-foreground transition-all disabled:opacity-40 hover:enabled:bg-foreground/20"
                  >
                    <ChevronLeft className="size-4 text-primary rtl:rotate-180" />
                    {tr("projects.index.prev")}
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        aria-current={p === page ? "page" : undefined}
                        className={`size-10 rounded-xl text-xs font-black transition-all ${
                          p === page
                            ? "bg-foreground text-background shadow-md"
                            : "border border-border bg-foreground/10 text-foreground hover:bg-foreground/20"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-2 rounded-xl bg-foreground/10 border border-border px-4 py-2 text-xs font-black tracking-wider text-foreground transition-all disabled:opacity-40 hover:enabled:bg-foreground/20"
                  >
                    {tr("projects.index.next")}
                    <ChevronRight className="size-4 text-primary rtl:rotate-180" />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <EmptyState message={tr("projects.index.empty")} />
          )}
        </div>
      </section>
    </PageShell>
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
          ? "bg-foreground text-background font-bold shadow-sm"
          : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
