import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/ui/PageIntro";
import { CtaLink } from "@/components/ui/CtaLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { ExperiencePreview } from "@/components/sections/home/ExperiencePreview";
import { pageSeo, pageTitle } from "@/lib/seo";
import { useI18n } from "@/lib/i18n";

const DESCRIPTION =
  "Professional software engineering experience of Mostafa Samir — .NET 8 Microservices, SignalR IoT telemetry, and multi-tenant marketplace architectures.";

export const Route = createFileRoute("/experience")({
  head: () =>
    pageSeo({ title: pageTitle("Experience"), description: DESCRIPTION, path: "/experience" }),
  pendingComponent: PageSkeleton,
  component: ExperiencePage,
});

function ExperiencePage() {
  const { tr } = useI18n();

  return (
    <PageShell>
      <PageIntro
        eyebrow={tr("experience.page.eyebrow")}
        title={tr("experience.page.title")}
        description={tr("experience.page.desc")}
      />

      <ExperiencePreview />

      <CtaBand
        lottie="/lottie/experience-side.lottie"
        eyebrow={tr("cta.band.eyebrow")}
        title={tr("experience.cta.title")}
        description={tr("experience.cta.desc")}
      >
        <CtaLink to="/projects" variant="secondary">
          {tr("skills.page.projectsCta")}
        </CtaLink>
        <CtaLink to="/contact">{tr("about.page.contactCta")}</CtaLink>
      </CtaBand>
    </PageShell>
  );
}
