import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/data";
import { Tag } from "@/components/ui/Tag";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent } from "@/lib/localize";

/** Breadcrumb + title block at the top of a project detail page. */
export function ProjectDetailHeader({ project }: { project: Project }) {
  const { tr } = useI18n();
  const L = useLocalizedContent();

  return (
    <>
      <div className="mb-12 md:mb-16">
        <Link
          to="/projects"
          className="type-label group inline-flex items-center gap-2 text-foreground/60 transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180" />
          {tr("project.detail.back")}
        </Link>
      </div>

      <header className="mb-12 md:mb-16">
        <div className="mb-8 flex flex-wrap gap-2">
          <Tag className="border-primary/20 bg-primary/10 text-primary">
            {L.category(project.category)}
          </Tag>
          <Tag className="bg-foreground/5 text-foreground/70">{L.projectType(project.type)}</Tag>
          {project.status && (
            <Tag className="bg-foreground/5 text-foreground/70">
              {L.projectStatus(project.status)}
            </Tag>
          )}
          {project.badges?.map((badge) => (
            <Tag key={badge} className="bg-foreground/5 text-foreground/70">
              {badge}
            </Tag>
          ))}
        </div>

        <h1 className="type-h1 mb-8">{L.projectTitle(project)}</h1>

        <p className="type-lead max-w-4xl text-foreground/70">{L.projectDescription(project)}</p>
      </header>
    </>
  );
}
