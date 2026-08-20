import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "app-preloaded";
/** Never flash: once shown, the splash stays up at least this long. */
const MIN_VISIBLE_MS = 350;
/** Hard ceiling — a slow asset must never trap the visitor behind the splash. */
const MAX_VISIBLE_MS = 2500;
/** Webfonts must never gate the splash for longer than this. */
const FONTS_TIMEOUT_MS = 600;
const FADE_MS = 250;

/**
 * Runs before first paint. If this session already booted the app (SPA
 * revisit, back/forward, reload within the tab) the splash is hidden by CSS
 * *before* it can paint, so returning visitors never see it twice. Reduced
 * motion users skip it entirely.
 */
export const preloaderBootstrapScript = `(function(){try{
var seen=false;try{seen=sessionStorage.getItem("${STORAGE_KEY}")==="1";}catch(e){}
var rm=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(seen||rm){document.documentElement.setAttribute("data-preloaded","1");}
}catch(e){}})();`;

/**
 * First-load splash screen.
 *
 * Rendered during SSR so it is part of the very first paint (no white flash,
 * no layout shift). It dismisses on the earliest of:
 *  - boot animation + webfonts ready, past the minimum visible time
 *  - the safety timeout
 */
export function AppPreloader() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(8);
  const doneRef = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage unavailable — splash simply shows again */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setMounted(false);
      return;
    }

    document.documentElement.setAttribute("data-preloading", "1");
    const startedAt = performance.now();
    let raf = 0;

    // Ease towards 92% while we wait; the real "ready" signal finishes it.
    const tick = () => {
      setProgress((p) => (p >= 92 ? p : p + (92 - p) * 0.045 + 0.35));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      cancelAnimationFrame(raf);
      setProgress(100);
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      window.setTimeout(() => {
        setLeaving(true);
        window.setTimeout(() => {
          setMounted(false);
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        }, FADE_MS);
      }, wait);
    };

    // Fonts only, and never for long: the animation runtime now loads lazily
    // after hydration instead of gating first paint.
    const ready = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => window.setTimeout(r, FONTS_TIMEOUT_MS)),
    ]);
    void ready.then(finish);
    const safety = window.setTimeout(finish, MAX_VISIBLE_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (mounted) return;
    document.documentElement.removeAttribute("data-preloading");
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="app-preloader"
      data-leaving={leaving ? "1" : undefined}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="app-preloader__inner">
        <div className="app-preloader__art">
          <span className="app-preloader__mark">MS</span>
        </div>

        <p className="app-preloader__name">Mostafa Samir</p>
        <p className="app-preloader__role">Marketplace Systems Architect</p>

        <div className="app-preloader__bar">
          <span style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
      </div>
    </div>
  );
}
