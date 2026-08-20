import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";
import {
  getCachedLottie,
  loadLottieData,
  loadLottiePlayer,
  prefetchLottie,
} from "@/lib/lottie-cache";

/**
 * Performance-first Lottie wrapper.
 *
 * - The player bundle *and* the animation bytes are fetched only when the
 *   element gets close to the viewport (IntersectionObserver).
 * - Both are memoized module-level, so revisiting a route (or rendering the
 *   same icon twice) reuses the already-parsed bytes with zero extra requests.
 * - Playback pauses when offscreen or when the tab is hidden.
 * - `prefers-reduced-motion` short-circuits everything: static fallback only,
 *   nothing is downloaded.
 * - SSR-safe: nothing loads during render.
 */
export function LottieIcon({
  src,
  loop = true,
  className,
  fallback = null,
  speed = 1,
  playOnce = false,
  rootMargin = "300px",
  eager = false,
}: {
  /** URL of the animation .lottie/JSON, e.g. `import url from "@/assets/x.lottie?url"` */
  src: string;
  loop?: boolean;
  className?: string;
  /** Static visual shown before load, and permanently when motion is reduced. */
  fallback?: ReactNode;
  speed?: number;
  /** Play a single time when first revealed (no loop, no replay). */
  playOnce?: boolean;
  /** How early to start fetching relative to the viewport. */
  rootMargin?: string;
  /** Skip the viewport gate (use for above-the-fold / hover-triggered icons). */
  eager?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<DotLottie | null>(null);
  const playedRef = useRef(false);
  const startedRef = useRef(false);
  const [Player, setPlayer] = useState<
    typeof import("@lottiefiles/dotlottie-react").DotLottieReact | null
  >(null);
  const [data, setData] = useState<ArrayBuffer | null>(() => getCachedLottie(src) ?? null);

  useEffect(() => {
    setData(getCachedLottie(src) ?? null);
  }, [src]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      void Promise.all([loadLottiePlayer(), loadLottieData(src)])
        .then(([lib, buf]) => {
          if (cancelled) return;
          setPlayer(() => lib.DotLottieReact);
          setData(buf);
        })
        .catch(() => {
          startedRef.current = false;
        });
    };

    if (eager) start();

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) start();
        const p = playerRef.current;
        if (!p) return;
        if (visible) {
          if (playOnce && playedRef.current) return;
          playedRef.current = true;
          p.play();
        } else {
          p.pause();
        }
      },
      { rootMargin },
    );
    io.observe(host);

    const onVisibility = () => {
      const p = playerRef.current;
      if (!p) return;
      if (document.hidden) p.pause();
      else p.play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src, playOnce, rootMargin, eager]);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      {Player && data ? (
        <Player
          // dotLottie can take ownership of the buffer, so hand it a copy and
          // keep the cached original intact for the next mount.
          data={data.slice(0)}
          loop={playOnce ? false : loop}
          autoplay
          speed={speed}
          dotLottieRefCallback={(d) => {
            playerRef.current = d;
          }}
          className="size-full"
          renderConfig={{ autoResize: true, freezeOnOffscreen: true }}
        />
      ) : (
        fallback
      )}
    </div>
  );
}

export { prefetchLottie };
