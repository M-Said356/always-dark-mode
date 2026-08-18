/**
 * Responsive image helpers.
 *
 * Every project screenshot in /public ships as two pre-optimised WebP variants:
 *   <base>-640.webp   (mobile / card)
 *   <base>-1280.webp  (desktop / hero)
 *
 * Data files reference the logical path (e.g. "/projects/react/HAVEN.png").
 * `resolveImage` maps that to the real variants so the browser can download the
 * smallest file that fits the layout slot instead of one oversized asset.
 */

/** Bases that have -640/-1280 WebP variants on disk. */
const RESPONSIVE_BASES = new Set([
  "/api/Marketing-Mvc",
  "/api/e-commerce-api",
  "/api/market-api",
  "/projects/angular/luxelle-landing",
  "/projects/angular/zyro-electric",
  "/projects/microservices/Inventory",
  "/projects/microservices/Shop",
  "/projects/react/E-Inventory",
  "/projects/react/HAVEN",
  "/projects/react/TownTeam",
  "/projects/react/UNDER-ARMOUR",
  "/projects/react/VELOCITY",
  "/projects/react/Vingo-Roll",
  "/projects/react/linea-jewelry",
  "/projects/react/little-boys",
  "/projects/react/luminabeaut",
  "/projects/react/luminabeauty",
  "/projects/react/ohanna",
]);

interface ResolvedImage {
  src: string;
  srcSet?: string;
}

const stripExtension = (path: string) => path.replace(/\.(png|jpe?g|webp|avif)$/i, "");

export function resolveImage(path: string | undefined): ResolvedImage | null {
  if (!path) return null;

  const base = stripExtension(path);
  if (RESPONSIVE_BASES.has(base)) {
    return {
      src: `${base}-1280.webp`,
      srcSet: `${base}-640.webp 640w, ${base}-1280.webp 1280w`,
    };
  }

  return { src: path };
}

/** `sizes` presets matching the layout slots used across the app. */
export const IMAGE_SIZES = {
  /** 3-up card grid capped at a 6xl container. */
  card: "(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw",
  /** Narrow thumbnail in the list view. */
  thumb: "(min-width: 640px) 220px, 100vw",
  /** Full-bleed project hero. */
  hero: "100vw",
} as const;
