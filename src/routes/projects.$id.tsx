import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data";
import { getProjectDetail, getRelatedProjects } from "@/data/project-details";
import { PageShell } from "@/components/layout/PageShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { ProjectDetailSkeleton } from "@/components/ui/Skeletons";
import { ProjectDetailHeader } from "@/components/projects/detail/ProjectDetailHeader";
import { ProjectHighlights } from "@/components/projects/detail/ProjectHighlights";
import { ProjectShowcase } from "@/components/projects/detail/ProjectShowcase";
import {
  ProjectChallengeSolution,
  ProjectFeatures,
  ProjectOverview,
} from "@/components/projects/detail/ProjectNarrative";
import {
  ProjectArchitecture,
  ProjectOutcomes,
  ProjectProcess,
  ProjectResponsibilities,
} from "@/components/projects/detail/ProjectDelivery";
import { ProjectBrief } from "@/components/projects/detail/ProjectBrief";
import { RelatedProjects } from "@/components/projects/detail/RelatedProjects";
import { ProjectPager } from "@/components/projects/detail/ProjectPager";
import { useI18n } from "@/lib/i18n";
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
            { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(path) },
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
        <h1 className="mb-4 type-h1 text-foreground">{tr("project.notFound.title")}</h1>
        <CtaLink to="/projects" variant="secondary" withArrow={false}>
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {tr("project.notFound.back")}
        </CtaLink>
      </div>
    </PageShell>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const detail = getProjectDetail(project);
  const related = getRelatedProjects(project, projects);

  const hasLiveSite = project.live !== "#";
  const index = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[index + 1] ?? null;
  const prevProject = index > 0 ? (projects[index - 1] ?? null) : null;

  return (
    <PageShell contained={false} padded={false} disableOverflowX className="nav-offset pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-page page-gutter"
      >
        <ProjectDetailHeader project={project} />
        <ProjectHighlights highlights={detail.highlights} />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-20 lg:col-span-8">
            <ProjectShowcase project={project} />
            <ProjectOverview detail={detail} />
            <ProjectChallengeSolution detail={detail} />
            <ProjectFeatures detail={detail} />
            <ProjectArchitecture techs={project.tech} detail={detail} />
            <ProjectResponsibilities detail={detail} />
            <ProjectProcess detail={detail} />
            <ProjectOutcomes detail={detail} />
          </div>

          <ProjectBrief project={project} detail={detail} hasLiveSite={hasLiveSite} />
        </div>

        <RelatedProjects projects={related} />
        <ProjectPager prev={prevProject} next={nextProject} />
      </motion.div>
    </PageShell>
  );
}
