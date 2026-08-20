import { motion } from "framer-motion";
import { LottieIcon } from "@/components/ui/LottieIcon";
import { EASE } from "@/lib/motion";

const SLIDE_VISUALS = [
  { lottie: "/lottie/cred-education.lottie" },
  { lottie: "/lottie/cred-certification.lottie" },
  { lottie: "/lottie/cred-award.lottie" },
] as const;

interface CredentialVisualsProps {
  activeIdx: number;
  dir: number;
  reduce: boolean;
}

/** Cross-fading Lottie artwork paired with the active slide. */
export function CredentialVisuals({ activeIdx, dir, reduce }: CredentialVisualsProps) {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border bg-foreground/5 [contain:paint] md:max-w-lg lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:max-w-none lg:self-start">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[5/4]">
        {SLIDE_VISUALS.map((visual, i) => {
          const isActive = i === activeIdx % SLIDE_VISUALS.length;
          const offset = reduce ? 0 : dir * 56;
          return (
            <motion.div
              key={visual.lottie}
              aria-hidden={!isActive}
              initial={false}
              animate={
                isActive ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -offset, scale: 0.985 }
              }
              transition={
                reduce
                  ? { duration: 0.2 }
                  : {
                      x: { type: "spring", stiffness: 480, damping: 44, mass: 0.55 },
                      opacity: { duration: 0.28, ease: EASE },
                      scale: { duration: 0.32, ease: EASE },
                    }
              }
              style={{ zIndex: isActive ? 1 : 0, willChange: "transform, opacity" }}
              className="absolute inset-0 grid size-full place-items-center p-0 [backface-visibility:hidden] [transform:translateZ(0)]"
            >
              <LottieIcon
                src={visual.lottie}
                eager={i === 0}
                className="h-full w-full scale-110"
                fallback={<div className="size-full rounded-2xl bg-foreground/5" />}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
