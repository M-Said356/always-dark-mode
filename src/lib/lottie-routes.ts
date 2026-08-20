import { prefetchLottie } from "@/lib/lottie-cache";

/**
 * Which animations each route will ask for.
 *
 * Used to warm the module-level Lottie cache on navigation *intent*
 * (hover/focus/touch on a nav link) so the asset is already parsed by the time
 * the route mounts. Fetches are deduped and shared across routes by
 * `lottie-cache`, so warming is free if the asset was seen before.
 */
export const ROUTE_LOTTIE: Record<string, readonly string[]> = {
  "/": [
    "/lottie/cred-education.lottie",
    "/lottie/cred-certification.lottie",
    "/lottie/cred-award.lottie",
  ],
  "/about": ["/lottie/about-side.lottie"],
  "/skills": ["/lottie/skills-side.lottie"],
  "/experience": ["/lottie/experience-side.lottie"],
  "/contact": ["/lottie/contact-mail.lottie", "/lottie/contact-side.lottie"],
};

const warmed = new Set<string>();

/** Warm the animations a route needs. Safe to call repeatedly. */
export function prefetchRouteLottie(path: string) {
  if (typeof window === "undefined") return;
  if (warmed.has(path)) return;
  warmed.add(path);
  const run = () => (ROUTE_LOTTIE[path] ?? []).forEach(prefetchLottie);
  const idle = (
    window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void;
    }
  ).requestIdleCallback;
  if (idle) idle(run, { timeout: 1200 });
  else window.setTimeout(run, 0);
}
