import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
const portraitWebp = "/images/portrait-cutout.webp";
const portraitAvif = "/images/portrait-cutout.avif";
import { PenTyping } from "@/components/ui/PenTyping";

export function AboutPreview() {
  return (
    <section className="section-shell section-y select-none">
      <div className="container-page">
        <div className="relative surface-card overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* Left Column (5 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center items-start">
              {/* Logo Prefix */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-end gap-[2px] opacity-90">
                  <span className="size-1 rounded-full bg-foreground mb-[1px]" />
                  <div className="flex flex-col gap-[2px]">
                    <span className="size-1 rounded-full bg-foreground" />
                    <span className="size-1 rounded-full bg-foreground" />
                  </div>
                </div>
                <div className="grid place-items-center rounded-[6px] bg-foreground px-2.5 py-0.5 shadow-sm">
                  <span className="type-wordmark text-background">MS</span>
                </div>
                <div className="flex flex-col text-start type-micro text-foreground">
                  <span>MOSTAFA</span>
                  <span>SAMIR</span>
                </div>
              </div>

              {/* Headline */}
              <PenTyping
                lines={["4+ Years of", "Full Stack Excellence"]}
                className="type-script text-card-foreground mb-4"
              />

              {/* Description */}
              <p className="type-body text-card-foreground/85 mb-6 max-w-sm">
                Senior Full Stack Engineer specializing in scaling marketplace throughput by 300%
                using .NET 8, Clean Architecture & Next.js.
              </p>

              {/* CTA Buttons */}
              <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  to="/about"
                  className="group btn-accent"
                >
                  <span className="type-label">ABOUT ME</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
                <Link
                  to="/projects"
                  className="group btn-surface"
                >
                  <span className="type-label text-foreground">VIEW CASES</span>
                  <ArrowRight className="size-4 text-foreground transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Right Column portrait (7 cols) */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto flex w-full max-w-sm sm:max-w-md items-end justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-primary/20 via-background to-background shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                <div className="pointer-events-none absolute inset-x-6 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
                <picture>
                  <source type="image/avif" srcSet={portraitAvif} />
                  <img
                    src={portraitWebp}
                    alt="Portrait of Mostafa Samir"
                    width={861}
                    height={768}
                    loading="lazy"
                    className="relative z-10 w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
