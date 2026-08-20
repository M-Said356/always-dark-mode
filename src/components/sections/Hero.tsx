import { Download, Play, Trophy } from "lucide-react";
const heroIso = "/images/hero-iso.webp";
const heroIsoAvif = "/images/hero-iso.avif";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { tr, dir } = useI18n();

  return (
    <section className="section-shell nav-offset-lg relative overflow-hidden pb-16 select-none">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        {/* Left Column Text & Action */}
        <div className="relative z-10 text-center lg:text-start">
          {/* Eyebrow Label */}
          <p className="type-in mb-4 eyebrow-wide text-primary">{tr("hero.eyebrow")}</p>

          {/* Display headline */}
          <h1 className="type-in type-delay-1 type-display text-foreground">
            {tr("hero.name.first")}
            <br />
            {tr("hero.name.last")}
            <span className="sr-only"> — {tr("hero.subtitle")}</span>
          </h1>

          {/* Subtitle & Trophy Badge */}
          <div className="type-in type-delay-2 mt-6 flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3">
              <p className="max-w-md type-lead text-foreground/90 text-center lg:text-start">
                {tr("hero.subtitle")}
              </p>
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-foreground/10 border border-border text-foreground">
                <Trophy className="size-4 text-primary" />
              </div>
            </div>

            {/* Primary actions: view work + download CV, inline on one line */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#works"
                className="group btn-surface"
              >
                <span className="grid size-7 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-12">
                  <Play
                    className={`size-3.5 fill-primary-foreground text-primary-foreground ${dir === "rtl" ? "me-0.5 rotate-180" : "ms-0.5"}`}
                  />
                </span>
                <span className="whitespace-nowrap type-label text-card-foreground">
                  {tr("hero.cta")}
                </span>
              </a>

              <a
                href="/cv/Mostafa_Samir_CV.pdf"
                download="Mostafa_Samir_CV.pdf"
                type="application/pdf"
                className="group btn-accent"
              >
                <span className="grid size-7 place-items-center rounded-xl bg-primary-foreground/15 text-primary-foreground transition-transform duration-300 group-hover:translate-y-0.5">
                  <Download className="size-3.5" />
                </span>
                <span className="whitespace-nowrap type-label text-primary-foreground">
                  {tr("hero.cv")}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Isometric Art */}
        <div style={{ animationDelay: "0.1s" }} className="enter-up relative">
          <picture>
            <source type="image/avif" srcSet={heroIsoAvif} />
            <img
              src={heroIso}
              alt="Mostafa Samir Full Stack Engineer Workspace"
              width={1200}
              height={1104}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              draggable={false}
              className="mx-auto w-full max-w-xl md:max-w-2xl animate-float drop-shadow-2xl"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
