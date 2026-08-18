import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { SkillsPreview } from "@/components/sections/home/SkillsPreview";
import { Projects } from "@/components/sections/Projects";
import { ExperiencePreview } from "@/components/sections/home/ExperiencePreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { pageSeo } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";
import heroIso from "@/assets/hero-iso.webp";

const DESCRIPTION =
  "Portfolio of Mostafa Samir, Senior Full Stack Engineer specializing in .NET 8 microservices, React.js and Angular platforms.";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = pageSeo({
      title: `${SITE.name} | ${SITE.role}`,
      description: DESCRIPTION,
      path: "/",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE.name,
          jobTitle: SITE.role,
          url: absoluteUrl("/"),
          knowsAbout: [
            ".NET 8 microservices",
            "Next.js",
            "Multi-vendor marketplaces",
            "Real-time bidding systems",
          ],
        },
      ],
    });

    return {
      ...seo,
      links: [...seo.links, { rel: "preload", as: "image", href: heroIso, fetchPriority: "high" }],
    };
  },
  component: Index,
});

function Index() {
  return (
    <PageShell contained={false} padded={false}>
      <Hero />
      <Projects />
      <div className="defer-paint">
        <SkillsPreview />
      </div>
      <div className="defer-paint">
        <ExperiencePreview />
      </div>
      <div className="defer-paint">
        <AboutPreview />
      </div>
      <div className="defer-paint">
        <Testimonials />
      </div>
      <div className="defer-paint">
        <ContactCta />
      </div>
    </PageShell>
  );
}
