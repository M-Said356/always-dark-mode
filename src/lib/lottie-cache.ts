/**
 * Shared, module-level Lottie cache.
 *
 * Two things are memoized for the whole session (so they survive route changes
 * and component unmounts):
 *  1. the dotLottie player bundle import
 *  2. the fetched animation bytes, keyed by src
 *
 * Everything is promise-cached, so N components asking for the same asset at
 * the same time produce exactly one network request.
 */

type PlayerModule = typeof import("@lottiefiles/dotlottie-react");

let playerPromise: Promise<PlayerModule> | null = null;

/** Self-hosted runtime: avoids a cross-origin DNS+TLS round trip to a CDN. */
const WASM_URL = "/wasm/dotlottie-player.wasm";

export function loadLottiePlayer(): Promise<PlayerModule> {
  if (!playerPromise)
    playerPromise = import("@lottiefiles/dotlottie-react").then((mod) => {
      mod.setWasmUrl(WASM_URL);
      return mod;
    });
  return playerPromise;
}

const dataCache = new Map<string, Promise<ArrayBuffer>>();
const resolved = new Map<string, ArrayBuffer>();

export function getCachedLottie(src: string): ArrayBuffer | undefined {
  return resolved.get(src);
}

export function loadLottieData(src: string): Promise<ArrayBuffer> {
  let p = dataCache.get(src);
  if (!p) {
    p = fetch(src, { cache: "force-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load lottie: ${src}`);
        return r.arrayBuffer();
      })
      .then((buf) => {
        resolved.set(src, buf);
        return buf;
      })
      .catch((err) => {
        dataCache.delete(src);
        throw err;
      });
    dataCache.set(src, p);
  }
  return p;
}

/** Warm both the player bundle and the animation bytes ahead of first paint. */
export function prefetchLottie(src: string) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  void loadLottiePlayer();
  void loadLottieData(src).catch(() => {});
}
