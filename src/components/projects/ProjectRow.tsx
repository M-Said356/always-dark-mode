import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data";
import { Tag } from "@/components/ui/Tag";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent, latinProps } from "@/lib/localize";
import { layoutTransition } from "@/lib/motion";
import { ProjectCardImage } from "./ProjectCardImage";
import { ProjectDetailsLink, ProjectExternalLinks } from "./ProjectLinks";
import { TechStackPreview } from "./TechStackPreview";

interface ProjectRowProps {
  project: Project;
  index: number;
}

/** Horizontal project entry used by the list view. */
export function ProjectRow({ project, index }: ProjectRowProps) {
  const { tr } = useI18n();
  const { projectTitle, projectDescription, projectType } = useLocalizedContent();
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.3,
        delay: reduce ? 0 : Math.min(index, 6) * 0.03,
        layout: layoutTransition(reduce),
      }}
      className="group grid grid-cols-1 gap-5 overflow-hidden rounded-2xl bg-card p-5 border border-border shadow-lg text-card-foreground transition-all duration-300 hover:bg-card/90 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center"
    >
      <div className="overflow-hidden rounded-xl">
        <ProjectCardImage project={project} compact priority={index < 2} />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="type-h3 text-card-foreground">{projectTitle(project)}</h3>
          <Tag>{projectType(project.type)}</Tag>
          {project.client && <Tag {...latinProps}>{project.client}</Tag>}
        </div>
        <p className="type-body mt-2 line-clamp-2 text-card-foreground/85">
          {projectDescription(project)}
        </p>
        <div className="mt-3">
          <TechStackPreview techs={project.tech} limit={5} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <ProjectDetailsLink project={project} label={tr("projects.card.details")} />
          <ProjectExternalLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}
