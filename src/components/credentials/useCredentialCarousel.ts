import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useCredentialSlides } from "./useCredentialSlides";

const AUTOPLAY_MS = 7000;

/** Slide state, autoplay and detail-panel state for the credentials carousel. */
export function useCredentialCarousel() {
  const reduce = useReducedMotion();
  const slides = useCredentialSlides();
  const total = slides.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number, direction: number) => {
      if (total === 0) return;
      setDir(direction);
      setOpenId(null);
      setActiveIdx(((next % total) + total) % total);
    },
    [total],
  );

  const prev = useCallback(() => go(activeIdx - 1, -1), [activeIdx, go]);
  const next = useCallback(() => go(activeIdx + 1, 1), [activeIdx, go]);

  // Autoplay, paused on hover/focus or while a detail panel is open.
  useEffect(() => {
    if (paused || openId || reduce || total < 2) return;
    const id = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [paused, openId, reduce, total, next, activeIdx]);

  return {
    reduce: !!reduce,
    slides,
    total,
    activeIdx,
    dir,
    openId,
    setOpenId,
    setPaused,
    go,
    prev,
    next,
  };
}
