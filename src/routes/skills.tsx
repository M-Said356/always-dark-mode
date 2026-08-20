import { createFileRoute } from "@tanstack/react-router";
import { Code, Cpu, Database, GitBranch, Layers, Lock, Radio, type LucideIcon } from "lucide-react";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/ui/PageIntro";
import { CtaLink } from "@/components/ui/CtaLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { skillGroups, type SkillIcon } from "@/data";
import { pageSeo, pageTitle } from "@/lib/seo";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent } from "@/lib/localize";

/** Presentation-layer mapping: data ships icon keys, the UI owns the icons. */
const SKILL_ICONS: Record<SkillIcon, LucideIcon> = {
  frontend: Cpu,
  backend: Code,
  database: Database,
  architecture: Layers,
  realtime: Radio,
  devops: GitBranch,
  security: Lock,
};

export const Route = createFileRoute("/skills")({
  head: () =>
    pageSeo({
      title: pageTitle("Skills & Stack"),
      description:
        "Full technical skills & stack: .NET 8 Microservices, Clean Architecture, Angular, Next.js, SQL Server, Redis, and Azure DevOps.",
      path: "/skills",
    }),
  pendingComponent: PageSkeleton,
  component: SkillsPage,
});

function SkillsPage() {
  const { tr } = useI18n();
  const { skillGroupTitle } = useLocalizedContent();

  return (
    <PageShell>
      <PageIntro
        eyebrow={tr("skills.page.eyebrow")}
        title={tr("skills.title")}
        description={tr("skills.page.desc")}
      />

      <section className="section-y-sm">
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map(({ title, icon, skills }) => {
            const Icon: LucideIcon = SKILL_ICONS[icon] ?? Code;
            return (
              <div key={title} className="surface-card p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl border border-border bg-foreground/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="type-h3 text-card-foreground">{skillGroupTitle(title)}</h2>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      dir="ltr"
                      className="rounded-xl border border-border bg-foreground/10 px-4 py-1.5 type-body-strong text-card-foreground shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <CtaBand
          lottie="/lottie/skills-side.lottie"
          eyebrow={tr("cta.band.eyebrow")}
          title={tr("skills.cta.title")}
          description={tr("skills.cta.desc")}
        >
          <CtaLink to="/projects" variant="secondary">
            {tr("skills.page.projectsCta")}
          </CtaLink>
          <CtaLink to="/contact">{tr("skills.page.contactCta")}</CtaLink>
        </CtaBand>
      </section>
    </PageShell>
  );
}
