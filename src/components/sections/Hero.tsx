import { Download, Play, Trophy } from "lucide-react";
import heroIso from "@/assets/hero-iso.webp";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { tr, dir } = useI18n();

  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-32 sm:pt-36 md:pt-40 text-foreground select-none">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
        {/* Left Column Text & Action */}
        <div className="relative z-10 text-center lg:text-start">
          {/* Eyebrow Label */}
          <p className="enter-up mb-4 font-sans text-xs font-black tracking-[0.35em] text-primary uppercase">
            {tr("hero.eyebrow")}
          </p>

          {/* Large Oswald Headline */}
          <h1
            style={{ animationDelay: "0.08s" }}
            className="enter-up font-display text-[64px] sm:text-[84px] md:text-[104px] font-bold uppercase leading-[0.85] text-foreground tracking-normal"
          >
            {tr("hero.name.first")}
            <br />
            {tr("hero.name.last")}
            <span className="sr-only"> — {tr("hero.subtitle")}</span>
          </h1>

          {/* Subtitle & Trophy Badge */}
          <div
            style={{ animationDelay: "0.18s" }}
            className="enter-up mt-6 flex flex-col items-center lg:items-start gap-4"
          >
            <div className="flex items-center gap-3">
              <p className="max-w-md text-sm sm:text-base font-medium leading-snug text-foreground/90 text-center lg:text-start">
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
                className="group inline-flex items-center gap-3 rounded-xl bg-card px-7 py-3.5 shadow-lg border border-border transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="grid size-7 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-12">
                  <Play
                    className={`size-3.5 fill-primary-foreground text-primary-foreground ${dir === "rtl" ? "me-0.5 rotate-180" : "ms-0.5"}`}
                  />
                </span>
                <span className="whitespace-nowrap font-sans text-xs font-black tracking-[0.2em] text-card-foreground uppercase">
                  {tr("hero.cta")}
                </span>
              </a>

              <a
                href="/cv/Mostafa_Samir_CV.pdf"
                download="Mostafa_Samir_CV.pdf"
                type="application/pdf"
                className="group inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-3.5 shadow-lg border border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="grid size-7 place-items-center rounded-xl bg-primary-foreground/15 text-primary-foreground transition-transform duration-300 group-hover:translate-y-0.5">
                  <Download className="size-3.5" />
                </span>
                <span className="whitespace-nowrap font-sans text-xs font-black tracking-[0.2em] text-primary-foreground uppercase">
                  {tr("hero.cv")}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Isometric Art */}
        <div style={{ animationDelay: "0.1s" }} className="enter-up relative">
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
        </div>
      </div>
    </section>
  );
}
