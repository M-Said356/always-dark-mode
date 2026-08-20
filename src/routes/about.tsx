import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/ui/PageIntro";
import { LottieAside } from "@/components/ui/LottieAside";
import { CtaLink, CtaRow } from "@/components/ui/CtaLink";
import { pageSeo, pageTitle } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

      <section className="section-y-sm">
        <LottieAside src="/lottie/about-side.lottie" size="max-w-md">
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.key}
                className="surface-card p-6 text-center"
              >
                <div dir="ltr" className="type-h2 text-card-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 type-micro text-card-foreground/80">{tr(stat.key)}</div>
              </div>
            ))}
          </div>
        </LottieAside>
      </section>

      <section className="section-y">
        <SectionHeading title={tr("about.page.approach")} />
        <div className="grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.titleKey}
              className="surface-card p-8"
            >
              <h3 className="mb-3 flex items-center gap-3 type-h3 text-card-foreground">
                <CheckCircle2 className="size-5 text-primary" />
                {tr(principle.titleKey)}
              </h3>
              <p className="type-body text-card-foreground/85">{tr(principle.bodyKey)}</p>
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
