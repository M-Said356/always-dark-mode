import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent } from "@/lib/localize";

interface ProjectPagerProps {
  prev: Project | null;
  next: Project | null;
}

/** Previous / next project navigation. */
export function ProjectPager({ prev, next }: ProjectPagerProps) {
  const { tr } = useI18n();
  if (!prev && !next) return null;

  return (
    <div className="mt-24 border-t border-border pt-16">
      <h3 className="type-h3 mb-12 text-center text-foreground/50">
        {tr("project.detail.continue")}
      </h3>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {prev ? <PagerCard project={prev} direction="prev" /> : <div />}
        {next ? <PagerCard project={next} direction="next" /> : <div />}
      </div>
    </div>
  );
}

function PagerCard({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const { tr } = useI18n();
  const { projectTitle } = useLocalizedContent();
  const isNext = direction === "next";

  return (
    <Link
      to="/projects/$id"
      params={{ id: project.id }}
      className={`group relative overflow-hidden surface-card-interactive p-8 ${
        isNext ? "text-end" : ""
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-${isNext ? "l" : "r"} from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
      />
      <div className={`relative z-10 ${isNext ? "flex flex-col items-end" : ""}`}>
        <div className="type-micro mb-3 flex items-center gap-2 text-primary">
          {isNext ? (
            <>
              {tr("project.detail.next")} <ArrowRight className="size-3 rtl:rotate-180" />
            </>
          ) : (
            <>
              <ArrowLeft className="size-3 rtl:rotate-180" /> {tr("project.detail.prev")}
            </>
          )}
        </div>
        <h4 className="type-h3 text-card-foreground">{projectTitle(project)}</h4>
      </div>
    </Link>
  );
}
