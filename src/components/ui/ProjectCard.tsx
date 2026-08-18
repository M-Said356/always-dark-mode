import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMAGE_SIZES } from "@/lib/image";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent, latinProps } from "@/lib/localize";

export type ProjectView = "grid" | "list";

interface ProjectCardProps {
  project: Project;
  index: number;
  view?: ProjectView;
}

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
        layout: reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 120, damping: 18, mass: 0.6 },
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2 hover:border-border/60 text-card-foreground"
    >
      <ProjectCardImage project={project} priority={index < 3} />

      <div className="flex flex-1 flex-col gap-4 pt-5">
        <header className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-['Oswald',sans-serif] text-2xl font-bold leading-tight text-card-foreground">
              {projectTitle(project)}
            </h3>
            {project.status && (
              <span className="shrink-0 rounded-xl bg-primary px-3 py-0.5 text-[10px] font-black text-primary-foreground uppercase tracking-wider">
                {projectStatus(project.status)}
              </span>
            )}
          </div>
          <p className="mt-2 line-clamp-2 font-sans text-xs text-card-foreground/85 leading-relaxed">
            {projectDescription(project)}
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          <Badge>{projectType(project.type)}</Badge>
          {project.client && <Badge {...latinProps}>{project.client}</Badge>}
        </div>

        <TechStackPreview techs={project.tech} />

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <Link
            to="/projects/$id"
            params={{ id: project.id }}
            className="inline-flex items-center gap-2 font-sans text-xs font-black tracking-widest text-primary uppercase transition-all hover:gap-3"
          >
            {tr("projects.card.details")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
          <div className="flex shrink-0 items-center gap-2">
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
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
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
        layout: reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 120, damping: 18, mass: 0.6 },
      }}
      className="group grid grid-cols-1 gap-5 overflow-hidden rounded-2xl bg-card p-5 border border-border shadow-lg text-card-foreground transition-all duration-300 hover:bg-card/90 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center"
    >
      <div className="overflow-hidden rounded-xl">
        <ProjectCardImage project={project} compact priority={index < 2} />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-card-foreground">
            {projectTitle(project)}
          </h3>
          <Badge>{projectType(project.type)}</Badge>
          {project.client && <Badge {...latinProps}>{project.client}</Badge>}
        </div>
        <p className="mt-2 line-clamp-2 font-sans text-xs text-card-foreground/85 leading-relaxed">
          {projectDescription(project)}
        </p>
        <div className="mt-3">
          <TechStackPreview techs={project.tech} limit={5} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Link
            to="/projects/$id"
            params={{ id: project.id }}
            className="inline-flex items-center gap-2 font-sans text-xs font-black tracking-widest text-primary uppercase transition-all hover:gap-3"
          >
            {tr("projects.card.details")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
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
        </div>
      </div>
    </motion.article>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-xl bg-foreground/10 border border-border text-card-foreground transition-all hover:bg-foreground/20"
    >
      {children}
    </a>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-xl bg-primary px-3 py-1 font-sans text-[10px] font-black tracking-widest text-primary-foreground uppercase shadow-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface ProjectCardImageProps {
  project: Project;
  compact?: boolean;
  priority?: boolean;
}

function ProjectCardImage({ project, compact = false, priority = false }: ProjectCardImageProps) {
  const { category } = useLocalizedContent();
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border ${compact ? "h-36" : "h-48"}`}
    >
      <SmartImage
        src={project.image}
        alt={`${project.title} preview`}
        width={compact ? 220 : 384}
        height={compact ? 144 : 192}
        sizes={compact ? IMAGE_SIZES.thumb : IMAGE_SIZES.card}
        priority={priority}
        fallbackStyle={project.gradient}
        className="size-full"
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <span className="absolute start-3 top-3 rounded-xl bg-black/40 backdrop-blur-md px-3 py-1 text-[9px] font-black tracking-wider text-white border border-white/20 uppercase">
        {category(project.category)}
      </span>
    </div>
  );
}

interface TechStackPreviewProps {
  techs: string[];
  limit?: number;
}

function TechStackPreview({ techs, limit = 3 }: TechStackPreviewProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {techs.slice(0, limit).map((tech) => (
        <span
          key={tech}
          dir="ltr"
          className="keep-latin rounded-xl bg-foreground/10 border border-border px-2.5 py-1 text-xs font-semibold text-card-foreground/90"
        >
          {tech}
        </span>
      ))}
      {techs.length > limit && (
        <span className="rounded-xl bg-primary/20 border border-primary/40 px-2.5 py-1 text-xs font-bold text-primary">
          +{techs.length - limit}
        </span>
      )}
    </div>
  );
}
