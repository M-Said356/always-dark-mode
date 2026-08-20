import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { projects, projectFilters, type Project } from "@/data";
import type { ProjectView } from "@/components/projects/types";

export const PROJECT_SORTS = [
  { value: "default", key: "projects.sort.default" },
  { value: "az", key: "projects.sort.az" },
  { value: "za", key: "projects.sort.za" },
  { value: "category", key: "projects.sort.category" },
  { value: "tech", key: "projects.sort.tech" },
] as const;

export type SortValue = (typeof PROJECT_SORTS)[number]["value"];
export type ProjectFilter = (typeof projectFilters)[number];

const PER_PAGE: Record<ProjectView, number> = { grid: 9, list: 6 };

function matchesQuery(project: Project, query: string) {
  return (
    project.title.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.category.toLowerCase().includes(query) ||
    (project.client?.toLowerCase().includes(query) ?? false) ||
    project.tech.some((tech) => tech.toLowerCase().includes(query))
  );
}

function sortProjects(list: Project[], sort: SortValue) {
  const sorted = [...list];
  switch (sort) {
    case "az":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "category":
      return sorted.sort(
        (a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
      );
    case "tech":
      return sorted.sort((a, b) => b.tech.length - a.tech.length);
    default:
      return sorted;
  }
}

/** Search / filter / sort / paginate state for the projects explorer. */
export function useProjectsExplorer() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("default");
  const [view, setView] = useState<ProjectView>("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const deferredQuery = useDeferredValue(searchQuery);
  const isFiltering = deferredQuery !== searchQuery;
  const perPage = PER_PAGE[view];

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const project of projects) {
      map[project.category] = (map[project.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const byCategory = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    const query = deferredQuery.trim().toLowerCase();
    const searched = query ? byCategory.filter((p) => matchesQuery(p, query)) : byCategory;
    return sortProjects(searched, sort);
  }, [filter, deferredQuery, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery, sort, view]);

  const page = Math.min(currentPage, totalPages);

  const reset = () => {
    setFilter("All");
    setSearchQuery("");
    setSort("default");
  };

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sort,
    setSort,
    view,
    setView,
    page,
    setCurrentPage,
    totalPages,
    perPage,
    counts,
    filtered,
    paginated: filtered.slice((page - 1) * perPage, page * perPage),
    isFiltering,
    hasActiveFilters: filter !== "All" || searchQuery.trim().length > 0 || sort !== "default",
    reset,
  };
}
