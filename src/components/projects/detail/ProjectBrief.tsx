import {
  Briefcase,
  CalendarCheck,
  Database,
  ExternalLink,
  Github,
  Globe,
  MonitorSmartphone,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/data";
import type { ProjectDetailContent } from "@/data/project-details";
import { useI18n } from "@/lib/i18n";

interface ProjectBriefProps {
  project: Project;
  detail: ProjectDetailContent;
  hasLiveSite: boolean;
}

/** Sticky sidebar summarising the engagement and linking out. */
export function ProjectBrief({ project, detail, hasLiveSite }: ProjectBriefProps) {
  const { tr } = useI18n();

  return (
    <aside className="space-y-8 lg:sticky lg:top-24 lg:col-span-4 lg:self-start lg:h-fit">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <div className="relative p-8 md:p-10">
          <h3 className="type-h3 mb-10">{tr("project.detail.brief")}</h3>

          <div className="relative z-10 space-y-8">
            {project.client && (
              <BriefRow icon={Briefcase} label={tr("project.detail.client")}>
                {project.client}
              </BriefRow>
            )}

            <BriefRow icon={UserCog} label={tr("project.detail.role")}>
              {detail.role}
            </BriefRow>

            <BriefRow icon={Users} label={tr("project.detail.team")}>
              {detail.teamSize}
            </BriefRow>

            {project.database && (
              <BriefRow icon={Database} label={tr("project.detail.db")}>
                {project.database}
              </BriefRow>
            )}

            <BriefRow icon={CalendarCheck} label={tr("project.detail.timeline")}>
              {detail.timeline}
            </BriefRow>

            <BriefRow icon={MonitorSmartphone} label={tr("project.detail.platforms")}>
              {detail.platforms.join(" · ")}
            </BriefRow>

            <BriefRow icon={Globe} label={tr("project.detail.status")}>
              {hasLiveSite ? tr("project.detail.status.live") : tr("project.detail.status.local")}
            </BriefRow>
          </div>

          <div className="relative z-10 mt-12 space-y-3">
            {hasLiveSite && (
              <BriefAction
                href={project.live}
                className="bg-primary text-primary-foreground shadow-lg hover:scale-[1.02] hover:shadow-primary/25"
              >
                <ExternalLink className="size-4" />
                {tr("project.detail.visit")}
              </BriefAction>
            )}
            {project.github && (
              <BriefAction
                href={project.github}
                className="border border-border bg-foreground/5 text-foreground hover:bg-foreground/10"
              >
                <Github className="size-4" />
                {tr("project.detail.source")}
              </BriefAction>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

function BriefRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="type-micro mb-0.5 text-muted-foreground">{label}</div>
        <div className="type-body-strong text-foreground">{children}</div>
      </div>
    </div>
  );
}

function BriefAction({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`type-label group inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 transition-all ${className}`}
    >
      {children}
    </a>
  );
}
