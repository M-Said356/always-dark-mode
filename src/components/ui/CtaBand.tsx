import type { ReactNode } from "react";
import { LottieIcon } from "@/components/ui/LottieIcon";

/**
 * Closing call-to-action band: copy + buttons on the start side, a compact
 * decorative Lottie on the end side, both vertically centred inside one card.
 *
 * Replaces the old bare `CtaRow` + oversized `LottieAside` pairing, which left
 * a tall empty gutter between the buttons and the animation.
 */
export function CtaBand({
  lottie,
  eyebrow,
  title,
  description,
  children,
}: {
  lottie: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="section-y-sm">
      <div className="relative overflow-hidden surface-card p-8 sm:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="text-center md:text-start">
            {eyebrow ? (
              <span className="inline-block eyebrow-wide text-primary">{eyebrow}</span>
            ) : null}
            <h2 className="mt-3 type-h2-lg text-card-foreground">{title}</h2>
            {description ? (
              <p className="mt-3 max-w-md type-lead text-card-foreground/80 md:mx-0 mx-auto">
                {description}
              </p>
            ) : null}
            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              {children}
            </div>
          </div>

          <div aria-hidden="true" className="hidden sm:block">
            <LottieIcon
              src={lottie}
              className="mx-auto aspect-square w-full max-w-[220px] md:max-w-[260px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
