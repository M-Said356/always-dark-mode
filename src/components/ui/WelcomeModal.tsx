import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
  type Transition,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { LottieIcon } from "@/components/ui/LottieIcon";

const STORAGE_KEY = "welcome-modal-seen";
const DELAY_MS = 10_000;
const AUTO_CLOSE_MS = 5_000;
const RING_RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;


/**
 * Welcome invitation that appears once per session, 10s after the visitor
 * lands, then auto-dismisses after 5s with a progress bar. Hovering, focusing
 * or touching the dialog pauses the countdown so nobody loses the message
 * mid-read. Presentation comes from the shared utilities in styles.css.
 */
export function WelcomeModal() {
  const { tr, dir } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(AUTO_CLOSE_MS / 1000);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(1);
  const dashOffset = useTransform(progress, (v: number) => CIRCUMFERENCE * (1 - v));

  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable — modal simply shows again next load */
    }
    if (previouslyFocused.current instanceof HTMLElement) {
      previouslyFocused.current.focus();
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      // Focus trap: keep Tab/Shift+Tab cycling inside the dialog.
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;

      if (!active || !root.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  // Countdown driven by a motion value: the bar/ring interpolate on the
  // compositor thread (perfectly smooth) while React only re-renders once
  // per whole second for the visible digit.
  useEffect(() => {
    if (!open) return;
    progress.set(1);
    setSeconds(AUTO_CLOSE_MS / 1000);
  }, [open, progress]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (value) => {
      const next = Math.max(0, Math.ceil((value * AUTO_CLOSE_MS) / 1000));
      setSeconds((current) => (current === next ? current : next));
    });
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    if (!open || paused) return;
    const left = progress.get() * AUTO_CLOSE_MS;
    if (left <= 0) {
      close();
      return;
    }

    // Reduced motion: step the ring/bar once per second instead of sweeping,
    // so the countdown stays readable and announced without continuous motion.
    if (prefersReducedMotion) {
      let remaining = Math.ceil(left / 1000) * 1000;
      const id = window.setInterval(() => {
        remaining -= 1000;
        progress.set(Math.max(0, remaining / AUTO_CLOSE_MS));
        if (remaining <= 0) {
          window.clearInterval(id);
          close();
        }
      }, 1000);
      return () => window.clearInterval(id);
    }

    const controls = animate(progress, 0, {
      duration: left / 1000,
      ease: "linear",
      onComplete: close,
    });
    return () => controls.stop();
  }, [open, paused, progress, close, prefersReducedMotion]);


  if (!open) return null;

  const hold = () => setPaused(true);
  const release = () => setPaused(false);

  const transition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] };


  return (
    <AnimatePresence>
      <motion.div
        key="welcome-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        role="presentation"
        onClick={close}
      >
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />

        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
          aria-describedby="welcome-modal-body welcome-modal-desc welcome-modal-countdown"
          tabIndex={-1}
          dir={dir}
          onClick={(event) => event.stopPropagation()}
          onMouseEnter={hold}
          onMouseLeave={release}
          onFocusCapture={(event) => {
            // Ignore the initial programmatic focus on the close button.
            if ((event.target as Node) !== closeRef.current) hold();
          }}
          onBlurCapture={(event) => {
            // Resume the countdown once keyboard focus leaves the dialog.
            const next = event.relatedTarget as Node | null;
            if (!next || !dialogRef.current?.contains(next)) release();
          }}
          onTouchStart={hold}
          onTouchEnd={release}

          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={transition}
          className="relative w-full max-w-[min(100%,34rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:max-w-3xl"
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={tr("welcome.close")}
            className="absolute end-3 top-3 z-20 rounded-xl bg-card/80 p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:end-4 sm:top-4"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Two-column grid on desktop: visual rail + message column */}
          <div className="relative grid gap-6 p-6 pb-10 text-center sm:p-8 sm:pb-12 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:items-stretch md:gap-8 md:p-10 md:pb-14 md:text-start">
            {/* Visual rail: exact top half Lottie, bottom half large counter */}
            <div className="grid min-h-[22rem] grid-rows-2 items-center justify-items-center md:min-h-full">
              {/* Top half — Lottie */}
              <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                <LottieIcon
                  src="/lottie/welcome-hello.lottie"
                  className="h-full max-h-[8.5rem] w-auto min-w-32"
                  fallback={<Sparkles className="h-12 w-12 text-accent" />}
                />
                <span className="chip">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  {tr("welcome.eyebrow")}
                </span>
              </div>


              {/* Bottom half — large countdown counter */}
              <motion.div
                aria-hidden="true"
                className="relative flex h-full w-full flex-col items-center justify-center gap-2"
                initial={false}
                animate={paused && !prefersReducedMotion ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <div className="relative grid aspect-square h-full max-h-[8.5rem] place-items-center">
                  {/* Background track */}
                  <svg
                    viewBox={`0 0 ${RING_RADIUS * 2 + 12} ${RING_RADIUS * 2 + 12}`}
                    className="absolute inset-0 size-full -rotate-90"
                  >
                    <circle
                      cx={RING_RADIUS + 6}
                      cy={RING_RADIUS + 6}
                      r={RING_RADIUS}
                      className="fill-none stroke-muted"
                      strokeWidth="6"
                    />
                    <motion.circle
                      cx={RING_RADIUS + 6}
                      cy={RING_RADIUS + 6}
                      r={RING_RADIUS}
                      className="fill-none stroke-accent"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      style={{ strokeDashoffset: dashOffset }}
                    />
                  </svg>


                  {/* Center number: cross-fades normally, static under reduced motion */}
                  <div className="relative flex items-center justify-center">
                    {prefersReducedMotion ? (
                      <span className="type-h1 absolute font-bold tabular-nums text-foreground">
                        {paused ? "II" : seconds}
                      </span>
                    ) : (
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={paused ? "paused" : seconds}
                          initial={{ opacity: 0, y: 12, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -12, scale: 0.8 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="type-h1 absolute font-bold tabular-nums text-foreground"
                        >
                          {paused ? "II" : seconds}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </div>

                </div>

                {/* Counter label */}
                <motion.span
                  key={paused ? "paused" : "counting"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
                >
                  {paused ? tr("welcome.paused") : tr("welcome.autocloseLabel")}
                </motion.span>
              </motion.div>
            </div>


            <div className="min-w-0">
              <h2 id="welcome-modal-title" className="type-h2 text-balance text-foreground">
                {tr("welcome.title")}
              </h2>

              <p id="welcome-modal-body" className="mt-3 type-lead text-muted-foreground">
                {tr("welcome.body")}
              </p>

              <p className="mt-3 type-body-strong text-accent">{tr("welcome.highlight")}</p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  to="/contact"
                  onClick={close}
                  className="btn-accent w-full items-center justify-center gap-2 whitespace-nowrap py-3.5 type-body-sm"
                >
                  {tr("welcome.primary")}
                  <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" />
                </Link>
                <Link
                  to="/projects"
                  onClick={close}
                  className="btn-accent-outline w-full items-center justify-center gap-2 whitespace-nowrap py-3.5 type-body-sm"
                >
                  {tr("welcome.secondary")}
                </Link>
              </div>

              <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <p className="eyebrow min-w-0 text-muted-foreground">{tr("welcome.footnote")}</p>
                <span
                  aria-live="polite"
                  className="eyebrow shrink-0 tabular-nums text-muted-foreground"
                >
                  {paused
                    ? tr("welcome.paused")
                    : tr("welcome.autoclose").replace("{s}", String(seconds))}
                </span>
              </div>
            </div>
          </div>

          {/* Auto-close progress bar pinned to the bottom edge */}
          <div
            role="progressbar"
            aria-label={tr("welcome.autoclose").replace("{s}", String(seconds))}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((seconds / (AUTO_CLOSE_MS / 1000)) * 100)}
            className="absolute inset-x-0 bottom-0 h-1.5 overflow-hidden bg-muted"
          >
            <motion.div
              className="h-full w-full origin-left bg-accent rtl:origin-right"
              style={{ scaleX: progress, willChange: "transform" }}
            />
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
