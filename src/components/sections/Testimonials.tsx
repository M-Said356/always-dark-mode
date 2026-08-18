import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { credentials, type CredentialItem } from "@/data";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  Compass,
  ShieldCheck,
  Rocket,
  Database,
  Container,
  Languages,
} from "lucide-react";

import cred1 from "@/assets/cred-1.jpg";
import cred2 from "@/assets/cred-2.jpg";
import cred3 from "@/assets/cred-3.jpg";

const SLIDE_IMAGES = [cred1, cred2, cred3];
const ICONS = [Award, Compass, ShieldCheck, Rocket, Database, Container, Languages];
const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 7000;

/** Always 3 slides × exactly 3 credentials (wraps around when data runs out). */
function useSlides() {
  return useMemo(() => {
    const items = credentials.filter((c) => c.tab === "certifications" || c.tab === "education");
    if (!items.length) return [] as CredentialItem[][];
    const slides: CredentialItem[][] = [];
    for (let s = 0; s < 3; s++) {
      slides.push([0, 1, 2].map((j) => items[(s * 3 + j) % items.length]!));
    }
    return slides;
  }, []);
}


export function Testimonials() {
  const { tr, lang, isRTL } = useI18n();
  const reduce = useReducedMotion();
  const slides = useSlides();
  const total = slides.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number, direction: number) => {
      setDir(direction);
      setOpenId(null);
      setActiveIdx(((next % total) + total) % total);
    },
    [total],
  );

  const prev = useCallback(() => go(activeIdx - 1, -1), [activeIdx, go]);
  const next = useCallback(() => go(activeIdx + 1, 1), [activeIdx, go]);

  // Autoplay, paused on hover/focus or when a detail panel is open.
  useEffect(() => {
    if (paused || openId || reduce || total < 2) return;
    const id = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [paused, openId, reduce, total, next, activeIdx]);

  const slide = slides[activeIdx] ?? [];
  const featured = slide[0];
  const side = slide.slice(1);

  const enterX = reduce ? 0 : (isRTL ? -1 : 1) * dir * 48;

  return (
    <section
      id="awards"
      className="w-full bg-background py-14 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 text-foreground select-none [content-visibility:auto] [contain-intrinsic-size:900px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") (isRTL ? prev : next)();
        if (e.key === "ArrowLeft") (isRTL ? next : prev)();
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-center">
          {/* Left Column: Title & Controls */}
          <div className="lg:col-span-4 flex min-w-0 flex-col justify-between gap-8 h-full">

            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 24 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="flex items-end gap-3 mb-4">
                <span className="font-sans text-xs font-black tracking-[0.2em] text-foreground/60 uppercase pb-3">
                  No
                </span>
                <span className="relative inline-block h-[4.5rem] overflow-hidden leading-none font-['Oswald',sans-serif] text-[4.5rem] font-bold">
                  {/* Invisible sizer keeps the animated digits from being clipped */}
                  <span className="invisible block leading-none" aria-hidden="true">
                    {String(total).padStart(2, "0")}
                  </span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={activeIdx}
                      initial={reduce ? {} : { y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduce ? {} : { y: -40, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="absolute inset-0 flex items-center justify-center text-primary leading-none"
                    >
                      {String(activeIdx + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="font-['Oswald',sans-serif] text-2xl font-bold text-foreground/40 pb-2">
                  /{String(total).padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-['Oswald',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.05] text-balance mb-6">
                {tr("awards.title1")}
                <br />
                {tr("awards.title2")}
              </h2>

              {/* Slide meta */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIdx}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mb-8 space-y-3"
                >
                  <div className="flex flex-wrap gap-2">
                    {slide.map((item) => (
                      <span
                        key={item.id}
                        className="rounded-full border border-border bg-foreground/5 px-3 py-1 font-sans text-[10px] font-black uppercase tracking-widest text-foreground/70"
                      >
                        {item.year}
                      </span>
                    ))}
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-foreground/60">
                    {slide.map((i) => i.org[lang]).join(" · ")}
                  </p>
                  <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-foreground/45">
                    {slide.length} {tr("awards.itemsLabel")}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slide visual: all frames stay mounted (decoded once) and cross-fade
                  with transform+opacity only — no unmount, no blur filter, no jank. */}
              <div className="mb-8 relative w-full max-w-[11rem] sm:max-w-[13rem] lg:max-w-[15rem] overflow-hidden rounded-2xl border border-border bg-foreground/5 [contain:paint]">
                <div className="relative aspect-[4/5] w-full">
                  {SLIDE_IMAGES.map((src, i) => {
                    const isActive = i === activeIdx % SLIDE_IMAGES.length;
                    const offset = reduce ? 0 : dir * 56;
                    return (
                      <motion.img
                        key={src}
                        src={src}
                        alt={isActive ? (slide[0]?.title[lang] ?? "") : ""}
                        aria-hidden={!isActive}
                        width={640}
                        height={800}
                        draggable={false}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={i === 0 ? "high" : "low"}
                        initial={false}
                        animate={
                          isActive
                            ? { opacity: 1, x: 0, scale: 1 }
                            : { opacity: 0, x: -offset, scale: 0.985 }
                        }
                        transition={
                          reduce
                            ? { duration: 0.2 }
                            : {
                                x: { type: "spring", stiffness: 480, damping: 44, mass: 0.55 },
                                opacity: { duration: 0.28, ease: EASE },
                                scale: { duration: 0.32, ease: EASE },
                              }
                        }
                        style={{ zIndex: isActive ? 1 : 0, willChange: "transform, opacity" }}
                        className="absolute inset-0 size-full object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
                      />
                    );
                  })}
                </div>
              </div>


            </motion.div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={prev}
                whileTap={reduce ? {} : { scale: 0.9 }}
                whileHover={reduce ? {} : { y: -2 }}
                className="grid size-11 place-items-center rounded-xl bg-foreground/10 border border-border text-foreground hover:bg-foreground/20 transition-colors"
                aria-label={tr("awards.prev")}
              >
                <ChevronLeft className="size-5 rtl:rotate-180" />
              </motion.button>
              <motion.button
                onClick={next}
                whileTap={reduce ? {} : { scale: 0.9 }}
                whileHover={reduce ? {} : { y: -2 }}
                className="grid size-11 place-items-center rounded-xl bg-foreground/10 border border-border text-foreground hover:bg-foreground/20 transition-colors"
                aria-label={tr("awards.next")}
              >
                <ChevronRight className="size-5 rtl:rotate-180" />
              </motion.button>

              {/* Progress dots */}
              <div className="flex items-center gap-2 ms-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, i > activeIdx ? 1 : -1)}
                    aria-label={`${i + 1}/${total}`}
                    aria-current={i === activeIdx}
                    className="relative h-1.5 rounded-full bg-foreground/20 overflow-hidden transition-all"
                    style={{ width: i === activeIdx ? 32 : 12 }}
                  >
                    {i === activeIdx && (
                      <motion.span
                        layoutId="award-dot"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Slide content */}
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={activeIdx}
              className="lg:col-span-8 grid min-w-0 grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch touch-pan-y"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: enterX }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -enterX }}
              transition={{ duration: 0.38, ease: EASE }}
              style={{ willChange: "transform, opacity" }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) (isRTL ? prev : next)();
                else if (info.offset.x > 70) (isRTL ? next : prev)();
              }}
            >
              {/* Featured card */}
              {featured && (
                <FeaturedCard
                  item={featured}
                  lang={lang}
                  reduce={!!reduce}
                  open={openId === featured.id}
                  onToggle={() => setOpenId((o) => (o === featured.id ? null : featured.id))}
                  detailsLabel={tr("awards.learnMore")}
                  index={0}
                />
              )}

              {/* Side cards */}
              <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5 sm:gap-6 auto-rows-fr">
                {side.map((item, i) => (
                  <SideCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    reduce={!!reduce}
                    index={i + 1}
                  />
                ))}
              </div>
            </motion.div>

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function iconFor(id: string) {
  let sum = 0;
  for (const ch of id) sum += ch.charCodeAt(0);
  return ICONS[sum % ICONS.length] ?? Award;
}

function FeaturedCard({
  item,
  lang,
  reduce,
  open,
  onToggle,
  detailsLabel,
  index,
}: {
  item: CredentialItem;
  lang: "en" | "ar";
  reduce: boolean;
  open: boolean;
  onToggle: () => void;
  detailsLabel: string;
  index: number;
}) {
  const Icon = iconFor(item.id);
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay: reduce ? 0 : 0.08 * index }}
      className="relative h-full min-w-0 rounded-2xl bg-card p-6 sm:p-7 lg:p-8 border border-border shadow-[var(--shadow-glow)] flex flex-col items-center text-center"
    >
      <span className="rounded-xl bg-foreground/10 px-4 py-1 font-sans text-[10px] font-black tracking-widest text-primary uppercase mb-6 border border-border">
        {item.year}
      </span>

      <motion.div
        whileHover={reduce ? {} : { rotate: -6, scale: 1.06 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="grid size-16 place-items-center rounded-xl bg-foreground/15 text-foreground mb-6 border border-border shadow-inner"
      >
        <Icon className="size-8 text-primary" />
      </motion.div>

      <h3 className="font-['Oswald',sans-serif] text-2xl font-bold text-card-foreground mb-3 leading-tight">
        {item.title[lang]}
      </h3>

      <p className="font-sans text-xs text-card-foreground/85 leading-relaxed mb-6 max-w-[34ch] text-balance">
        {item.summary[lang]}
      </p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="w-full overflow-hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.1 } },
              }}
              className="space-y-2 text-start"
            >
              {item.highlights[lang].map((h) => (
                <motion.li
                  key={h}
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex gap-2 font-sans text-[11px] leading-relaxed text-card-foreground/80"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {item.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-border bg-foreground/10 px-2 py-0.5 font-sans text-[9px] font-black uppercase tracking-widest text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
            {item.credentialId && (
              <p className="mt-3 mb-1 font-sans text-[10px] tracking-widest text-card-foreground/60 uppercase">
                {item.credentialId}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group mt-auto w-full inline-flex items-center justify-center gap-3 rounded-xl bg-background px-6 py-3 shadow-md border border-border transition-transform hover:scale-[1.03]"
      >
        <span className="grid size-6 place-items-center rounded-xl bg-primary text-primary-foreground">
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid place-items-center"
          >
            <Play className="size-3 fill-primary-foreground text-primary-foreground ms-0.5" />
          </motion.span>
        </span>
        <span className="font-sans text-xs font-black tracking-[0.2em] text-foreground uppercase">
          {detailsLabel}
        </span>
      </button>
    </motion.div>
  );
}


function SideCard({
  item,
  lang,
  reduce,
  index,
}: {
  item: CredentialItem;
  lang: "en" | "ar";
  reduce: boolean;
  index: number;
}) {
  const Icon = iconFor(item.id);
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay: reduce ? 0 : 0.08 * index }}
      whileHover={reduce ? {} : { y: -6 }}
      className="h-full min-w-0 rounded-2xl bg-card p-5 sm:p-6 border border-border shadow-md flex flex-col items-center justify-center text-center transition-colors hover:bg-card/90"
    >
      <div className="grid size-12 place-items-center rounded-xl bg-foreground/10 text-foreground mb-3">
        <Icon className="size-6 text-primary" />
      </div>
      <h4 className="font-['Oswald',sans-serif] text-lg font-bold text-card-foreground mb-2 leading-tight text-balance">
        {item.title[lang]}
      </h4>
      <p className="font-sans text-[11px] text-card-foreground/70 mb-3 leading-relaxed break-words">
        {item.org[lang]}
      </p>
      <span className="rounded-xl bg-foreground/10 px-3 py-0.5 font-sans text-[9px] font-black tracking-widest text-primary uppercase border border-border">
        {item.year}
      </span>
    </motion.div>
  );
}

