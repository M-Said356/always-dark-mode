import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";

type LazyIslandProps = {
  children: ReactNode;
  /** Start hydrating when the wrapper is within this margin of the viewport. */
  rootMargin?: string;
  className?: string;
  /** Fallback delay (ms) after which we hydrate even if never intersected. */
  idleTimeout?: number;
};

/**
 * Renders children normally on the server (full SSR HTML, so SEO and first
 * paint are untouched) but defers client hydration until the wrapper is near
 * the viewport or the browser goes idle.
 *
 * Before hydration we render an element with an empty dangerouslySetInnerHTML,
 * which tells React to leave the server-rendered DOM inside it alone.
 */
export function LazyIsland({
  children,
  rootMargin = "120px",
  className,
  idleTimeout = 10000,
}: LazyIslandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (hydrated) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const activate = () => {
      if (cancelled) return;
      cancelled = true;
      startTransition(() => setHydrated(true));
    };

    let observer: IntersectionObserver | undefined;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const ric = (
      window as typeof window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      }
    ).requestIdleCallback;

    // Wait for the main thread to settle before even wiring up the observer,
    // so island hydration never competes with the initial render/paint.
    const schedule = () => {
      if (cancelled) return;
      if (typeof IntersectionObserver === "undefined") {
        activate();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) activate();
        },
        { rootMargin },
      );
      observer.observe(el);
      timeoutHandle = window.setTimeout(activate, idleTimeout);
    };

    if (ric) {
      idleHandle = ric(schedule, { timeout: 2000 });
    } else {
      timeoutHandle = window.setTimeout(schedule, 300);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (idleHandle !== undefined) {
        (
          window as typeof window & { cancelIdleCallback?: (handle: number) => void }
        ).cancelIdleCallback?.(idleHandle);
      }
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, [hydrated, rootMargin, idleTimeout]);

  if (typeof document === "undefined") {
    // Server render: emit the full markup so SEO/first paint are unaffected.
    return <div className={className}>{children}</div>;
  }

  if (!hydrated) {
    return (
      <div
        ref={ref}
        className={className}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: "" }}
      />
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
