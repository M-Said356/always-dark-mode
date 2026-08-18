import { useEffect } from "react";

/**
 * Smooth scrolling is a progressive enhancement: Lenis is code-split and only
 * imported once the browser is idle, so it never competes with first paint,
 * hydration or the LCP image. Coarse pointers (mobile) and users who prefer
 * reduced motion keep native scrolling and download nothing.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      let raf = requestAnimationFrame(function loop(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      });

      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    };

    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(() => void start(), { timeout: 2000 })
      : window.setTimeout(() => void start(), 1200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
      cleanup?.();
    };
  }, []);
}
