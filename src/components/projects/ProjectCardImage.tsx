import type { Project } from "@/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMAGE_SIZES } from "@/lib/image";
import { useLocalizedContent } from "@/lib/localize";

interface ProjectCardImageProps {
  project: Project;
  compact?: boolean;
  priority?: boolean;
}

/** Thumbnail + category overlay shared by the grid card and the list row. */
export function ProjectCardImage({
  project,
  compact = false,
  priority = false,
}: ProjectCardImageProps) {
  const { category } = useLocalizedContent();
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border ${compact ? "h-36" : "h-48"}`}
    >
      <SmartImage
        src={project.image}
        alt={`${project.title} preview`}
        width={compact ? 220 : 384}
        height={compact ? 144 : 192}
        sizes={compact ? IMAGE_SIZES.thumb : IMAGE_SIZES.card}
        priority={priority}
        fallbackStyle={project.gradient}
        className="size-full"
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <span className="type-micro absolute start-3 top-3 rounded-xl bg-black/40 backdrop-blur-md px-3 py-1 text-white border border-white/20">
        {category(project.category)}
      </span>
    </div>
  );
}
