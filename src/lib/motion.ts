/**
 * Shared motion primitives.
 * Single source of truth for easing / transitions used across sections,
 * so animation feel stays consistent and is tuned in exactly one place.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const LAYOUT_SPRING = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.6,
} as const;

/** Layout transition that collapses to "instant" when motion is reduced. */
export const layoutTransition = (reduce: boolean | null) =>
  reduce ? { duration: 0 } : LAYOUT_SPRING;

/** Fade + rise entrance, disabled when motion is reduced. */
export const fadeUp = (reduce: boolean | null, y = 24) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
});

/** Fade + rise entrance triggered when the element scrolls into view. */
export const fadeUpInView = (reduce: boolean | null, y = 24, duration = 0.6) => ({
  initial: reduce ? {} : { opacity: 0, y },
  whileInView: reduce ? {} : { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 } as const,
  transition: { duration, ease: EASE },
});
