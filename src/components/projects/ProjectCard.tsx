import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data";
import { Tag } from "@/components/ui/Tag";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent, latinProps } from "@/lib/localize";
import { layoutTransition } from "@/lib/motion";
import { ProjectCardImage } from "./ProjectCardImage";
import { ProjectDetailsLink, ProjectExternalLinks } from "./ProjectLinks";
import { ProjectRow } from "./ProjectRow";
import { TechStackPreview } from "./TechStackPreview";
import type { ProjectView } from "./types";

interface ProjectCardProps {
  project: Project;
  index: number;
  view?: ProjectView;
}

/** Project entry — renders as a grid card or delegates to the list row. */
export function ProjectCard({ project, index, view = "grid" }: ProjectCardProps) {
  const { tr } = useI18n();
  const { projectTitle, projectDescription, projectType, projectStatus } = useLocalizedContent();
  const reduce = useReducedMotion();

  if (view === "list") return <ProjectRow project={project} index={index} />;

  return (
    <motion.article
      layout
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.35,
        delay: reduce ? 0 : Math.min(index, 6) * 0.04,
        layout: layoutTransition(reduce),
      }}
      className="group relative flex h-full flex-col overflow-hidden surface-card-interactive p-6"
    >
      <ProjectCardImage project={project} priority={index < 3} />

      <div className="flex flex-1 flex-col gap-4 pt-5">
        <header className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="type-h3 text-card-foreground">{projectTitle(project)}</h3>
            {project.status && (
              <span className="type-micro shrink-0 rounded-xl bg-primary px-3 py-0.5 text-primary-foreground">
                {projectStatus(project.status)}
              </span>
            )}
          </div>
          <p className="type-body mt-2 line-clamp-2 text-card-foreground/85">
            {projectDescription(project)}
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          <Tag>{projectType(project.type)}</Tag>
          {project.client && <Tag {...latinProps}>{project.client}</Tag>}
        </div>

        <TechStackPreview techs={project.tech} />

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <ProjectDetailsLink project={project} label={tr("projects.card.details")} />
          <div className="flex shrink-0 items-center gap-2">
            <ProjectExternalLinks project={project} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
