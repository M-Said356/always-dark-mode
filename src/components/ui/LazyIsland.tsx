import { useEffect, useRef, useState, type ReactNode } from "react";

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
  rootMargin = "200px",
  className,
  idleTimeout = 4000,
}: LazyIslandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (hydrated) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setHydrated(true);
    };

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) activate();
        },
        { rootMargin },
      );
      observer.observe(el);
    } else {
      activate();
    }

    const ric = (
      window as typeof window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      }
    ).requestIdleCallback;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    if (ric) {
      idleHandle = ric(activate, { timeout: idleTimeout });
    } else {
      timeoutHandle = window.setTimeout(activate, idleTimeout);
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
