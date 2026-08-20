/**
 * Loading skeletons that mirror the real layouts 1:1 so swapping in the
 * content causes zero layout shift.
 */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-md ${className}`} />;
}

function ProjectCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-2xl">
      <div className={`skeleton-shimmer ${compact ? "h-36" : "h-48"}`} />
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <Bar className="h-5 w-2/3" />
        <div className="space-y-2">
          <Bar className="h-3 w-full" />
          <Bar className="h-3 w-4/5" />
        </div>
        <div className="flex gap-2">
          <Bar className="h-6 w-16 rounded-xl" />
          <Bar className="h-6 w-20 rounded-xl" />
        </div>
        <div className="flex gap-2">
          <Bar className="h-6 w-14" />
          <Bar className="h-6 w-14" />
          <Bar className="h-6 w-14" />
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
          <Bar className="h-4 w-24" />
          <div className="flex gap-2">
            <Bar className="size-9 rounded-xl" />
            <Bar className="size-9 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRowSkeleton() {
  return (
    <div className="glass grid grid-cols-1 gap-5 rounded-2xl p-4 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
      <div className="skeleton-shimmer h-36 rounded-2xl" />
      <div className="space-y-3">
        <Bar className="h-5 w-1/2" />
        <Bar className="h-3 w-full" />
        <Bar className="h-3 w-3/4" />
        <div className="flex gap-2">
          <Bar className="h-6 w-16" />
          <Bar className="h-6 w-16" />
          <Bar className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ProjectGridSkeleton({
  count = 6,
  view = "grid",
}: {
  count?: number;
  view?: "grid" | "list";
}) {
  const items = Array.from({ length: count });

  if (view === "list") {
    return (
      <div className="flex flex-col gap-4" aria-hidden>
        {items.map((_, i) => (
          <ProjectRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {items.map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-background" aria-hidden>
      <div className="pt-20">
        <div className="skeleton-shimmer h-96 md:h-[500px]" />
        <div className="container-narrow page-gutter section-y-sm space-y-6">
          <Bar className="h-9 w-2/3" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-5/6" />
          <div className="flex gap-2 pt-2">
            <Bar className="h-7 w-20 rounded-xl" />
            <Bar className="h-7 w-24 rounded-xl" />
            <Bar className="h-7 w-16 rounded-xl" />
          </div>
          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            <Bar className="h-24 rounded-2xl" />
            <Bar className="h-24 rounded-2xl" />
            <Bar className="h-24 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-background" aria-hidden>
      <div className="container-page page-gutter space-y-6 pt-32">
        <Bar className="h-4 w-28" />
        <Bar className="h-10 w-2/3" />
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-4/5" />
        <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          <Bar className="h-40 rounded-2xl" />
          <Bar className="h-40 rounded-2xl" />
          <Bar className="h-40 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
