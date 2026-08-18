import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const STORAGE_KEY = "welcome-modal-seen";
const DELAY_MS = 10_000;

/**
 * Welcome invitation that appears once per session, 10s after the visitor
 * lands. Presentation comes entirely from the shared utilities in styles.css.
 */
export function WelcomeModal() {
  const { tr, dir } = useI18n();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
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
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
      onClick={close}
    >
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-body"
        dir={dir}
        onClick={(event) => event.stopPropagation()}
        className="relative border border-border bg-card w-full max-w-lg overflow-hidden rounded-2xl p-8 text-center shadow-2xl animate-scale-in sm:p-10"
      >
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label={tr("welcome.close")}
          className="absolute end-4 top-4 rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <span className="chip mx-auto">
            <Sparkles className="h-3.5 w-3.5" />
            {tr("welcome.eyebrow")}
          </span>

          <h2
            id="welcome-modal-title"
            className="mt-5 text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {tr("welcome.title")}
          </h2>

          <p
            id="welcome-modal-body"
            className="mt-4 text-base leading-relaxed text-muted-foreground"
          >
            {tr("welcome.body")}
          </p>

          <p className="mt-4 text-sm font-semibold text-accent">{tr("welcome.highlight")}</p>

          <div className="mt-8 grid grid-cols-1 gap-3">
            <Link
              to="/contact"
              onClick={close}
              className="btn-accent w-full items-center justify-center gap-2 whitespace-nowrap py-4 text-sm"
            >
              {tr("welcome.primary")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              to="/projects"
              onClick={close}
              className="btn-accent-outline w-full items-center justify-center gap-2 whitespace-nowrap py-4 text-sm"
            >
              {tr("welcome.secondary")}
            </Link>
          </div>

          <p className="eyebrow mt-6 text-muted-foreground">{tr("welcome.footnote")}</p>
        </div>
      </div>
    </div>
  );
}
