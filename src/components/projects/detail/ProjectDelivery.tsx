import { Code2, CheckCircle2, Route as RouteIcon, TrendingUp, UserCog } from "lucide-react";
import type { ProjectDetailContent } from "@/data/project-details";
import { TechStack } from "@/components/ui/TechStack";
import { useI18n } from "@/lib/i18n";
import { DetailSectionHeader } from "./DetailSectionHeader";

/** Tech stack plus architecture notes. */
export function ProjectArchitecture({
  techs,
  detail,
}: {
  techs: string[];
  detail: ProjectDetailContent;
}) {
  const { tr } = useI18n();
  return (
    <section>
      <DetailSectionHeader icon={Code2} title={tr("project.detail.arch")} />
      <div className="surface-card p-8">
        <TechStack techs={techs} />
        {detail.architecture.length > 0 && (
          <>
            <div className="my-8 h-px bg-border" />
            <div className="type-micro mb-4 text-foreground/50">
              {tr("project.detail.stackNotes")}
            </div>
            <ul className="space-y-4">
              {detail.architecture.map((note) => (
                <li key={note} className="type-body flex gap-3 text-foreground/70">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

/** Role and contribution list. */
export function ProjectResponsibilities({ detail }: { detail: ProjectDetailContent }) {
  const { tr } = useI18n();
  return (
    <section>
      <DetailSectionHeader icon={UserCog} title={tr("project.detail.responsibilities")} />
      <ul className="grid gap-4 sm:grid-cols-2">
        {detail.responsibilities.map((item) => (
          <li
            key={item}
            className="type-body flex gap-3 rounded-xl border border-border bg-card p-5 text-foreground/70"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Phased delivery timeline. */
export function ProjectProcess({ detail }: { detail: ProjectDetailContent }) {
  const { tr } = useI18n();
  return (
    <section>
      <DetailSectionHeader icon={RouteIcon} title={tr("project.detail.process")} />
      <ol className="relative space-y-8 border-s border-border ps-8">
        {detail.process.map((step) => (
          <li key={step.phase} className="relative">
            <span className="type-micro absolute -start-[2.55rem] flex size-8 items-center justify-center rounded-full border border-border bg-card font-mono text-primary">
              {step.phase}
            </span>
            <h3 className="type-h4 mb-2 text-foreground">{step.title}</h3>
            <p className="type-body text-foreground/60">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Measurable results list. */
export function ProjectOutcomes({ detail }: { detail: ProjectDetailContent }) {
  const { tr } = useI18n();
  return (
    <section>
      <DetailSectionHeader icon={TrendingUp} title={tr("project.detail.outcomes")} />
      <div className="surface-card p-8">
        <ul className="space-y-4">
          {detail.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-3 type-body text-foreground/70">
              <TrendingUp className="mt-1 size-4 shrink-0 text-primary" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
