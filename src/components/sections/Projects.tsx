import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/Reveal";
import { Code2, ExternalLink, Rocket } from "lucide-react";
import { projects } from "@/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent } from "@/lib/localize";

export function Projects() {
  const { tr } = useI18n();
  const { projectTitle, projectDescription, category, projectType } = useLocalizedContent();
  // Grab the first 3 projects as featured for the homepage
  const featuredWorks = projects.slice(0, 3);

  // Assign icons based on index for some variety
  const icons = [Rocket, Code2, ExternalLink];

  return (
    <section
      id="works"
      className="section-shell section-y select-none"
    >
      <div className="container-page">
        <SectionHeading title={tr("works.title")} align="start" />
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {featuredWorks.map((project, index) => {
            const num = `0${index + 1}`;
            const Icon = icons[index % icons.length] ?? Rocket;
            const tags = project.tech.slice(0, 3);

            return (
              <Reveal
                key={project.id}
                delay={index * 0.1}
                className="relative flex flex-col justify-between rounded-2xl bg-card p-7 border border-border shadow-glow group hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div>
                      <span className="type-h3 text-card-foreground leading-none block">{num}</span>
                      <span className="type-micro text-card-foreground/80">
                        {category(project.category)}
                      </span>
                    </div>
                    <div className="grid size-9 place-items-center rounded-xl bg-foreground/10 border border-border text-card-foreground">
                      <Icon className="size-4 text-primary" />
                    </div>
                  </div>

                  {/* Card Artwork Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-5 shadow-[0_10px_25px_rgba(0,0,0,0.25)] border border-border group-hover:border-border/60 transition-colors">
                    <SmartImage
                      src={project.image}
                      alt={projectTitle(project)}
                      fallbackStyle={project.gradient}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Dark Vignette Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top-Right Badge Overlay */}
                    <div className="absolute top-3 end-3 rounded-xl bg-black/40 backdrop-blur-md px-3 py-1 type-micro text-overlay-foreground border border-white/20">
                      {projectType(project.type)}
                    </div>
                  </div>

                  {/* Card Title & Subtitle */}
                  <h3 className="type-h3 text-card-foreground mb-2 px-1 line-clamp-1">
                    {projectTitle(project)}
                  </h3>

                  {/* Description */}
                  <p className="type-body text-card-foreground/85 mb-4 px-1 line-clamp-3">
                    {projectDescription(project)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 px-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        dir="ltr"
                        className="keep-latin rounded-xl bg-primary/10 border border-primary/20 px-3 py-1 type-micro text-primary shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="rounded-xl bg-foreground/5 border border-border px-2 py-1 type-micro text-foreground shadow-sm">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-auto pt-4 px-1">
                  <Link
                    to="/projects/$id"
                    params={{ id: project.id }}
                    className="btn-surface w-full group/btn"
                  >
                    <span className="type-micro text-foreground group-hover/btn:text-primary transition-colors">
                      {tr("projects.preview.view")}
                    </span>
                    <ArrowRightIcon className="size-3 text-foreground group-hover/btn:text-primary transition-colors group-hover/btn:translate-x-1 rtl:rotate-180" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Arrow helper icon
function ArrowRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
