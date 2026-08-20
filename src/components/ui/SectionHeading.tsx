import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * The single section-heading lockup for the whole app.
 *
 * Owns the kicker → title → rule rhythm, the type ramp step (`type-h2`) and
 * the staggered entrance (`type-in` + `Reveal`). No page or section may
 * hand-roll an `<h2>` with its own size/case/tracking classes — pass `align`
 * instead when a band needs a start-aligned heading.
 */
export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  rule = true,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  rule?: boolean;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn("mb-14", centered ? "text-center" : "text-center md:text-start", className)}
    >
      {kicker && (
        <span className="mb-4 inline-block eyebrow-wide type-in text-accent">{kicker}</span>
      )}
      <h2 className="type-h2 type-in type-delay-1 text-foreground">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl type-lead type-in type-delay-2 text-muted-foreground",
            centered ? "mx-auto" : "mx-auto md:mx-0",
          )}
        >
          {description}
        </p>
      )}
      {rule && (
        <div
          className={cn(
            "mt-5 h-1.5 w-16 rounded-full bg-accent",
            centered ? "mx-auto" : "mx-auto md:ms-0",
          )}
        />
      )}
    </Reveal>
  );
}
