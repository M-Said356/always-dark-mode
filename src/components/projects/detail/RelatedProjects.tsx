import { Link } from "@tanstack/react-router";
import type { Project } from "@/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMAGE_SIZES } from "@/lib/image";
import { useI18n } from "@/lib/i18n";
import { useLocalizedContent } from "@/lib/localize";

/** Grid of related projects shown below the case study. */
export function RelatedProjects({ projects }: { projects: Project[] }) {
  const { tr } = useI18n();
  const L = useLocalizedContent();
  if (projects.length === 0) return null;

  return (
    <section className="mt-32 border-t border-border pt-16">
      <h3 className="type-h3 mb-12 text-center text-foreground/50">
        {tr("project.detail.related")}
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((item) => (
          <Link
            key={item.id}
            to="/projects/$id"
            params={{ id: item.id }}
            className="group overflow-hidden surface-card-interactive"
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
              <div className="type-micro mb-2 text-primary">{L.category(item.category)}</div>
              <h4 className="type-h3 text-card-foreground">{L.projectTitle(item)}</h4>
              <p className="type-body mt-2 line-clamp-2 text-foreground/60">
                {L.projectDescription(item)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
