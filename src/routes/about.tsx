import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/ui/PageIntro";
import { CtaLink, CtaRow } from "@/components/ui/CtaLink";
import { pageSeo, pageTitle } from "@/lib/seo";
import { useI18n } from "@/lib/i18n";

const STATS = [
  { value: "4+", key: "about.stat.years" },
  { value: "300%", key: "about.stat.throughput" },
  { value: "1,000+", key: "about.stat.iot" },
  { value: ".NET 8", key: "about.stat.microservices" },
];

const PRINCIPLES = [1, 2, 3, 4].map((n) => ({
  titleKey: `about.principle.${n}.title`,
  bodyKey: `about.principle.${n}.body`,
}));

const DESCRIPTION =
  "Senior Full Stack Engineer with 4+ years of experience specializing in high-performance .NET 8 Microservices & Next.js marketplaces.";

export const Route = createFileRoute("/about")({
  head: () => pageSeo({ title: pageTitle("About"), description: DESCRIPTION, path: "/about" }),
  pendingComponent: PageSkeleton,
  component: AboutPage,
});

function AboutPage() {
  const { tr } = useI18n();

  return (
    <PageShell>
      <PageIntro
        eyebrow={tr("about.page.eyebrow")}
        title={tr("about.page.title")}
        description={tr("about.page.desc")}
      />

      <section className="py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-lg"
            >
              <div
                dir="ltr"
                className="font-['Oswald',sans-serif] text-3xl font-bold text-card-foreground sm:text-4xl"
              >
                {stat.value}
              </div>
              <div className="mt-1 font-sans text-[11px] font-black uppercase tracking-wider text-card-foreground/80">
                {tr(stat.key)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <h2 className="mb-8 text-center font-['Oswald',sans-serif] text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
          {tr("about.page.approach")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.titleKey}
              className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-glow)]"
            >
              <h3 className="mb-3 flex items-center gap-3 font-['Oswald',sans-serif] text-2xl font-bold text-card-foreground">
                <CheckCircle2 className="size-5 text-primary" />
                {tr(principle.titleKey)}
              </h3>
              <p className="font-sans text-xs leading-relaxed text-card-foreground/85 sm:text-sm">
                {tr(principle.bodyKey)}
              </p>
            </div>
          ))}
        </div>

        <CtaRow>
          <CtaLink to="/skills" variant="secondary">
            {tr("about.page.skillsCta")}
          </CtaLink>
          <CtaLink to="/contact">{tr("about.page.contactCta")}</CtaLink>
        </CtaRow>
      </section>
    </PageShell>
  );
}
