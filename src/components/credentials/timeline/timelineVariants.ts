import { EASE } from "@/lib/motion";

/** Container variants for the animated timeline list. */
export const timelineListVariants = (reduce: boolean) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: reduce ? { duration: 0 } : { staggerChildren: 0.04, delayChildren: 0.05 },
  },
  exit: reduce
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, x: -16, transition: { duration: 0.2, ease: EASE } },
});

/** Item variants shared by rows and their highlight bullets. */
export const timelineRowVariants = (reduce: boolean) =>
  reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
      };
