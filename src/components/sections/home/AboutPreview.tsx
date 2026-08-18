import { Play } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { IMAGE_SIZES } from "@/lib/image";

export function AboutPreview() {
  return (
    <section className="w-full bg-background py-16 px-4 sm:px-8 md:px-12 text-foreground select-none">
      <div className="mx-auto max-w-6xl">
        <div className="relative rounded-2xl bg-card p-8 sm:p-12 md:p-14 border border-border shadow-[var(--shadow-glow)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-center items-start">
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
                  <span className="font-['Oswald',sans-serif] text-sm font-bold text-background">
                    MS
                  </span>
                </div>
                <div className="flex flex-col text-start font-sans text-[9px] font-black tracking-[0.2em] text-foreground leading-tight uppercase">
                  <span>MOSTAFA</span>
                  <span>SAMIR</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="font-['Oswald',sans-serif] text-4xl sm:text-5xl font-bold text-card-foreground leading-[1.0] mb-4">
                4+ Years of
                <br />
                Full Stack Excellence
              </h2>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-card-foreground/85 leading-relaxed mb-6 max-w-sm">
                Senior Full Stack Engineer specializing in scaling marketplace throughput by 300%
                using .NET 8, Clean Architecture & Next.js.
              </p>

              {/* CTA Button */}
              <a
                href="#view"
                className="group inline-flex items-center gap-3 rounded-xl bg-background px-6 py-3 shadow-md border border-border transition-transform hover:scale-105"
              >
                <span className="grid size-6 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Play className="size-3 fill-primary-foreground text-primary-foreground ms-0.5" />
                </span>
                <span className="font-sans text-xs font-black tracking-[0.2em] text-foreground uppercase">
                  VIEW CASE
                </span>
              </a>
            </div>

            {/* Right Column Portfolio Mockup Image (7 cols) */}
            <div className="md:col-span-7">
              <div className="relative overflow-hidden rounded-2xl md:rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-border group">
                <SmartImage
                  src="/projects/microservices/Shop.jpg"
                  alt="Multi-tenant marketplace architecture"
                  width={1280}
                  height={800}
                  sizes={IMAGE_SIZES.hero}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
