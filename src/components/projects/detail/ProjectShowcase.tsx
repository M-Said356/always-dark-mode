import { motion } from "framer-motion";
import type { Project } from "@/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMAGE_SIZES } from "@/lib/image";

const WINDOW_DOTS = ["#ff5f57", "#febc2e", "#28c840"];

/** Browser-window framed hero screenshot. */
export function ProjectShowcase({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="group relative overflow-hidden surface-card"
    >
      <div className="absolute inset-x-0 top-0 z-10 flex h-12 items-center gap-2 border-b border-border/50 bg-foreground/5 px-6 backdrop-blur-md">
        {WINDOW_DOTS.map((color) => (
          <div key={color} className="size-3 rounded-full" style={{ backgroundColor: color }} />
        ))}
      </div>

      <div className="aspect-[16/10] pt-12 sm:aspect-[16/9]">
        <SmartImage
          src={project.image}
          alt={`${project.title} showcase`}
          width={1280}
          height={800}
          sizes={IMAGE_SIZES.hero}
          priority
          fallbackStyle={project.gradient}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}
