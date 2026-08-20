import type { ReactNode } from "react";
import { LottieIcon } from "@/components/ui/LottieIcon";

/**
 * Content on the start side, a lazy-loaded Lottie on the end side.
 * The animation is decorative: it only downloads near the viewport, pauses
 * off-screen, and is skipped entirely under `prefers-reduced-motion`.
 */
export function LottieAside({
  src,
  children,
  className = "",
  size = "max-w-sm",
  mediaClassName = "",
}: {
  src: string;
  children: ReactNode;
  className?: string;
  /** Tailwind max-width utility for the animation column. */
  size?: string;
  /** Extra classes (e.g. a hue filter) applied to the animation itself. */
  mediaClassName?: string;
}) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] ${className}`}>
      <div className="min-w-0">{children}</div>
      <div aria-hidden="true" className="hidden sm:block">
        <LottieIcon
          src={src}
          className={`mx-auto aspect-square w-full ${size} ${mediaClassName}`}
        />
      </div>
    </div>
  );
}
