import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/data";
import { getProjectDetail, getRelatedProjects } from "@/data/project-details";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowRight,
  Code2,
  Globe,
  Database,
  Briefcase,
  Target,
  Lightbulb,
  Layers,
  CheckCircle2,
  UserCog,
  Route as RouteIcon,
  TrendingUp,
  MonitorSmartphone,
  Users,
  CalendarCheck,
} from "lucide-react";
import { TechStack } from "@/components/ui/TechStack";
import { Badge } from "@/components/ui/ProjectCard";
import { PageShell } from "@/components/layout/PageShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { ProjectDetailSkeleton } from "@/components/ui/Skeletons";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMAGE_SIZES } from "@/lib/image";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent } from "@/lib/localize";
import { pageSeo } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params }) => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) {
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${project.title} | Marketplace Systems Architect`;
    const description = project.description;
    const path = `/projects/${params.id}`;

    return pageSeo({
      title,
      description,
      path,
      type: "article",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description,
          url: absoluteUrl(path),
          creator: { "@type": "Person", name: "Mostafa Samir" },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
            {
              "@type": "ListItem",
              position: 3,
              name: project.title,
              item: absoluteUrl(path),
            },
          ],
        },
      ],
    });
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
  pendingComponent: ProjectDetailSkeleton,
});

function ProjectNotFound() {
  const { tr } = useI18n();
  return (
    <PageShell contained={false}>
      <div className="flex flex-1 flex-col items-center justify-center py-32 text-center">
        <h1 className="mb-4 font-display text-4xl font-bold text-foreground">
          {tr("project.notFound.title")}
        </h1>
        <CtaLink to="/projects" variant="secondary" withArrow={false}>
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {tr("project.notFound.back")}
        </CtaLink>
      </div>
    </PageShell>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: typeof Code2;
  title: string;
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="rounded-2xl bg-primary/10 p-3 text-primary">
        <Icon className="size-7" />
      </div>
      <h2 className="font-display text-2xl font-black uppercase md:text-3xl">{title}</h2>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const { tr } = useI18n();
  const L = useLocalizedContent();
  const detail = getProjectDetail(project);
  const related = getRelatedProjects(project, projects);

  const hasLiveSite = project.live !== "#";
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[projectIndex + 1];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;

  return (
    <PageShell contained={false} padded={false} disableOverflowX className="pb-24 pt-24 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-5 sm:px-8"
      >
        {/* Breadcrumb */}
        <div className="mb-12 md:mb-16">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-foreground/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180" />
            {tr("project.detail.back")}
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 md:mb-16">
          <div className="mb-8 flex flex-wrap gap-2">
            <Badge className="border-primary/20 bg-primary/10 text-primary">
              {L.category(project.category)}
            </Badge>
            <Badge className="bg-foreground/5 text-foreground/70">
              {L.projectType(project.type)}
            </Badge>
            {project.status && (
              <Badge className="bg-foreground/5 text-foreground/70">
                {L.projectStatus(project.status)}
              </Badge>
            )}
            {project.badges?.map((badge) => (
              <Badge key={badge} className="bg-foreground/5 text-foreground/70">
                {badge}
              </Badge>
            ))}
          </div>

          <h1 className="mb-8 font-display text-5xl leading-[0.9] font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            {L.projectTitle(project)}
          </h1>

          <p className="max-w-4xl text-xl leading-relaxed font-light text-foreground/70 md:text-2xl lg:text-3xl">
            {L.projectDescription(project)}
          </p>
        </header>

        {/* At a glance metrics strip */}
        <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {detail.highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-card p-5 md:p-6"
            >
              <div className="mb-2 text-[10px] font-black tracking-widest uppercase text-foreground/50">
                {item.label}
              </div>
              <div className="font-display text-lg font-black uppercase text-card-foreground md:text-xl">
                {item.value}
              </div>
              {item.hint && (
                <div dir="ltr" className="mt-1.5 text-xs text-foreground/50 keep-latin">
                  {item.hint}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-20 lg:col-span-8">
            {/* Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 z-10 flex h-12 items-center gap-2 border-b border-border/50 bg-foreground/5 px-6 backdrop-blur-md">
                <div className="size-3 rounded-full bg-[#ff5f57]" />
                <div className="size-3 rounded-full bg-[#febc2e]" />
                <div className="size-3 rounded-full bg-[#28c840]" />
              </div>

              <div className="aspect-[16/10] pt-12 sm:aspect-[16/9]">
                <SmartImage
                  src={project.image}
                  alt={`${project.title} showcase`}
                  width={1280}
                  height={800}
                  sizes={IMAGE_SIZES.hero}
                  priority
                  fallbackStyle={project.gradient}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Overview */}
            <section>
              <SectionHeader icon={Layers} title={tr("project.detail.overview")} />
              <p className="mb-6 font-display text-xl font-bold text-foreground md:text-2xl">
                {detail.tagline}
              </p>
              <div className="space-y-5">
                {detail.overview.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-foreground/70 md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Challenge / Solution */}
            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex items-center gap-3 text-primary">
                  <Target className="size-5" />
                  <h3 className="font-display text-sm font-black tracking-widest uppercase">
                    {tr("project.detail.challenge")}
                  </h3>
                </div>
                <p className="leading-relaxed text-foreground/70">{detail.challenge}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex items-center gap-3 text-primary">
                  <Lightbulb className="size-5" />
                  <h3 className="font-display text-sm font-black tracking-widest uppercase">
                    {tr("project.detail.solution")}
                  </h3>
                </div>
                <p className="leading-relaxed text-foreground/70">{detail.solution}</p>
              </div>
            </section>

            {/* Features */}
            <section>
              <SectionHeader icon={CheckCircle2} title={tr("project.detail.features")} />
              <div className="grid gap-5 sm:grid-cols-2">
                {detail.features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                  >
                    <div className="mb-3 font-mono text-xs font-black text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mb-2 font-display text-lg font-black uppercase text-card-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Architecture & tech */}
            <section>
              <SectionHeader icon={Code2} title={tr("project.detail.arch")} />
              <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-glow)]">
                <TechStack techs={project.tech} />
                {detail.architecture.length > 0 && (
                  <>
                    <div className="my-8 h-px bg-border" />
                    <div className="mb-4 text-[10px] font-black tracking-widest uppercase text-foreground/50">
                      {tr("project.detail.stackNotes")}
                    </div>
                    <ul className="space-y-4">
                      {detail.architecture.map((note) => (
                        <li key={note} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>

            {/* Role & contributions */}
            <section>
              <SectionHeader icon={UserCog} title={tr("project.detail.responsibilities")} />
              <ul className="grid gap-4 sm:grid-cols-2">
                {detail.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-foreground/70"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Process timeline */}
            <section>
              <SectionHeader icon={RouteIcon} title={tr("project.detail.process")} />
              <ol className="relative space-y-8 border-s border-border ps-8">
                {detail.process.map((step) => (
                  <li key={step.phase} className="relative">
                    <span className="absolute -start-[2.55rem] flex size-8 items-center justify-center rounded-full border border-border bg-card font-mono text-[10px] font-black text-primary">
                      {step.phase}
                    </span>
                    <h3 className="mb-2 font-display text-lg font-black uppercase text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/60">{step.description}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Outcomes */}
            <section>
              <SectionHeader icon={TrendingUp} title={tr("project.detail.outcomes")} />
              <div className="rounded-2xl border border-border bg-card p-8">
                <ul className="space-y-4">
                  {detail.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 leading-relaxed text-foreground/70">
                      <TrendingUp className="mt-1 size-4 shrink-0 text-primary" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:col-span-4 lg:self-start lg:h-fit">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <div className="relative p-8 md:p-10">
                <h3 className="mb-10 font-display text-2xl font-black tracking-wide uppercase">
                  {tr("project.detail.brief")}
                </h3>

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
                    {hasLiveSite
                      ? tr("project.detail.status.live")
                      : tr("project.detail.status.local")}
                  </BriefRow>
                </div>

                {/* Actions */}
                <div className="relative z-10 mt-12 space-y-3">
                  {hasLiveSite && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-sans text-xs font-black tracking-widest uppercase text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:shadow-primary/25"
                    >
                      <ExternalLink className="size-4" />
                      {tr("project.detail.visit")}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-border bg-foreground/5 px-6 py-4 font-sans text-xs font-black tracking-widest uppercase text-foreground transition-all hover:bg-foreground/10"
                    >
                      <Github className="size-4" />
                      {tr("project.detail.source")}
                    </a>
                  )}
                </div>
              </div>
            </div>

          </aside>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <section className="mt-32 border-t border-border pt-16">
            <h3 className="mb-12 text-center font-display text-2xl font-black uppercase text-foreground/50">
              {tr("project.detail.related")}
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to="/projects/$id"
                  params={{ id: item.id }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      width={640}
                      height={400}
                      sizes={IMAGE_SIZES.card}
                      fallbackStyle={item.gradient}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 text-[10px] font-black tracking-widest uppercase text-primary">
                      {L.category(item.category)}
                    </div>
                    <h4 className="font-display text-xl font-black uppercase text-card-foreground">
                      {L.projectTitle(item)}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-foreground/60">
                      {L.projectDescription(item)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Prev/Next Navigation */}
        <div className="mt-24 border-t border-border pt-16">
          <h3 className="mb-12 text-center font-display text-2xl font-black uppercase text-foreground/50">
            {tr("project.detail.continue")}
          </h3>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {prevProject ? (
              <Link
                to="/projects/$id"
                params={{ id: prevProject.id }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2 font-sans text-[10px] font-black tracking-widest uppercase text-primary">
                    <ArrowLeft className="size-3 rtl:rotate-180" /> {tr("project.detail.prev")}
                  </div>
                  <h4 className="font-display text-2xl font-black uppercase text-card-foreground md:text-3xl">
                    {L.projectTitle(prevProject)}
                  </h4>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                to="/projects/$id"
                params={{ id: nextProject.id }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-end shadow-lg transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col items-end">
                  <div className="mb-3 flex items-center gap-2 font-sans text-[10px] font-black tracking-widest uppercase text-primary">
                    {tr("project.detail.next")} <ArrowRight className="size-3 rtl:rotate-180" />
                  </div>
                  <h4 className="font-display text-2xl font-black uppercase text-card-foreground md:text-3xl">
                    {L.projectTitle(nextProject)}
                  </h4>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </motion.div>
    </PageShell>
  );
}

function BriefRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Globe;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="mb-0.5 text-[10px] font-black tracking-widest uppercase text-muted-foreground">
          {label}
        </div>
        <div className="text-base font-bold leading-snug text-foreground">{children}</div>
      </div>
    </div>
  );
}
