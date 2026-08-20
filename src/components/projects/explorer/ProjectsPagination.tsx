import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface ProjectsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const pageButton = (active: boolean) =>
  `type-label size-10 rounded-xl transition-all ${
    active
      ? "bg-foreground text-background shadow-md"
      : "border border-border bg-foreground/10 text-foreground hover:bg-foreground/20"
  }`;

const stepButton =
  "type-label inline-flex items-center gap-2 rounded-xl bg-foreground/10 border border-border px-4 py-2 text-foreground transition-all disabled:opacity-40 hover:enabled:bg-foreground/20";

/** Numbered pagination for the project results. */
export function ProjectsPagination({ page, totalPages, onPageChange }: ProjectsPaginationProps) {
  const { tr } = useI18n();
  if (totalPages < 2) return null;

  return (
    <nav
      aria-label={tr("projects.index.pagination")}
      className="flex flex-wrap items-center justify-center gap-3"
    >
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={stepButton}
      >
        <ChevronLeft className="size-4 text-primary rtl:rotate-180" />
        {tr("projects.index.prev")}
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((value) => (
          <button
            key={value}
            onClick={() => onPageChange(value)}
            aria-current={value === page ? "page" : undefined}
            className={pageButton(value === page)}
          >
            {value}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={stepButton}
      >
        {tr("projects.index.next")}
        <ChevronRight className="size-4 text-primary rtl:rotate-180" />
      </button>
    </nav>
  );
}
