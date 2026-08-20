import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent } from "@/lib/localize";

export function SkillsPreview() {
  const { tr } = useI18n();
  const { skillGroupTitle } = useLocalizedContent();
  const featured = skillGroups.slice(0, 4);

  return (
    <section id="skills" className="section-shell section-y scroll-mt-24">
      <div className="container-narrow">
        <SectionHeading title={tr("skills.title")} />

        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="bg-card border border-border h-full rounded-2xl p-6 shadow-glow transition-transform hover:-translate-y-1">
                <h3 className="mb-4 flex items-center gap-3 type-h4">
                  <span className="size-2 rounded-full bg-accent" />
                  {skillGroupTitle(group.title)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      dir="ltr"
                      className="rounded-xl border border-border bg-foreground/10 px-3 py-1.5 type-body text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                  {group.skills.length > 5 && (
                    <span className="rounded-xl px-3 py-1.5 type-body-strong text-accent">
                      +{group.skills.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Link to="/skills" className="group btn-accent-outline">
              Explore the full stack
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
