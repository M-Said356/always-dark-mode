import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll reveal without any animation library.
 *
 * Uses a single shared IntersectionObserver + CSS transitions, so no JS runs
 * on every frame and the initial bundle stays free of framer-motion. Content
 * is present in the SSR HTML (crawlers see it) and simply fades in.
 */

type Cb = (visible: boolean) => void;

let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Cb>();

function getObserver() {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.(true);
          observer?.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.01 },
    );
  }
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Seconds, matching the previous framer-motion API. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = getObserver();
    if (reduce || !io) {
      setVisible(true);
      return;
    }

    // Already in view on mount (above the fold): reveal immediately.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    callbacks.set(el, setVisible);
    io.observe(el);
    return () => {
      io.unobserve(el);
      callbacks.delete(el);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
