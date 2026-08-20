import { useEffect, useRef, useState } from "react";
import { IMAGE_SIZES, resolveImage } from "@/lib/image";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  /** Logical image path from the data layer. */
  src?: string | undefined;
  alt: string;
  /** Intrinsic size — reserves space so the layout never shifts. */
  width?: number | undefined;
  height?: number | undefined;
  sizes?: string | undefined;
  /** Above-the-fold images should be `true`: eager + high priority. */
  priority?: boolean | undefined;
  className?: string | undefined;
  imgClassName?: string | undefined;
  /** Shown while loading and when the image is missing or fails. */
  fallbackStyle?: string | undefined;
}

/**
 * Image primitive with:
 * - responsive `srcSet`/`sizes` so mobile never downloads a 1280px asset
 * - `loading`/`decoding`/`fetchPriority` tuned per position
 * - a shimmering skeleton until decode completes (no flash of empty box)
 * - graceful gradient fallback when the file is missing or errors
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  sizes = IMAGE_SIZES.card,
  priority = false,
  className,
  imgClassName,
  fallbackStyle,
}: SmartImageProps) {
  const resolved = resolveImage(src);
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    resolved ? "loading" : "error",
  );

  // Images restored from cache can finish before React attaches onLoad.
  useEffect(() => {
    const node = imgRef.current;
    if (node?.complete && node.naturalWidth > 0) setStatus("ready");
  }, [resolved?.src]);

  const gradient = fallbackStyle || "var(--gradient-media)";

  return (
    <div className={cn("relative overflow-hidden bg-secondary/40", className)}>
      {/* Skeleton / fallback layer */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          status === "ready" ? "opacity-0" : "opacity-100",
          status === "loading" && "skeleton-shimmer",
        )}
        style={status === "error" ? { background: gradient } : undefined}
      />

      {resolved && status !== "error" && (
        <picture>
          {resolved.avifSrcSet && (
            <source type="image/avif" srcSet={resolved.avifSrcSet} sizes={sizes} />
          )}
          <img
            ref={imgRef}
            src={resolved.src}
            srcSet={resolved.srcSet}
            sizes={resolved.srcSet ? sizes : undefined}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "low"}
            draggable={false}
            onLoad={() => setStatus("ready")}
            onError={() => setStatus("error")}
            className={cn(
              "size-full object-cover transition-opacity duration-500",
              status === "ready" ? "opacity-100" : "opacity-0",
              imgClassName,
            )}
          />
        </picture>
      )}
    </div>
  );
}
