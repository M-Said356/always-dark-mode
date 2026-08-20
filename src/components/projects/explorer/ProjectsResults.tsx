import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data";
import { ProjectCard } from "../ProjectCard";
import type { ProjectView } from "../types";
import { EASE, layoutTransition } from "@/lib/motion";

interface ProjectsResultsProps {
  projects: Project[];
  view: ProjectView;
  sort: string;
}

/** Animated grid/list of project entries. */
export function ProjectsResults({ projects, view, sort }: ProjectsResultsProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${sort}-${view}`}
        layout
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE, layout: layoutTransition(reduce) }}
        className={
          view === "grid"
            ? "mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "mb-12 flex flex-col gap-4"
        }
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} view={view} />
          ))}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
