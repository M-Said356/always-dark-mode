import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data";
import { IconLink } from "@/components/ui/IconLink";

/** "View details" link to the project detail route. */
export function ProjectDetailsLink({ project, label }: { project: Project; label: string }) {
  return (
    <Link
      to="/projects/$id"
      params={{ id: project.id }}
      className="type-label inline-flex items-center gap-2 text-primary transition-all hover:gap-3"
    >
      {label}
      <ArrowRight className="size-4 rtl:rotate-180" />
    </Link>
  );
}

/** Live site / source repo icon links, rendered only when available. */
export function ProjectExternalLinks({ project }: { project: Project }) {
  return (
    <>
      {project.live && project.live !== "#" && (
        <IconLink href={project.live} label={`Open live site for ${project.title}`}>
          <ExternalLink className="size-4" />
        </IconLink>
      )}
      {project.github && (
        <IconLink href={project.github} label={`Open GitHub repo for ${project.title}`}>
          <Github className="size-4" />
        </IconLink>
      )}
    </>
  );
}
