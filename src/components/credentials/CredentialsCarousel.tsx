import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import { useCredentialCarousel } from "./useCredentialCarousel";
import { CredentialSlideMeta } from "./CredentialSlideMeta";
import { CredentialFeaturedCard } from "./CredentialFeaturedCard";
import { CredentialSideCard } from "./CredentialSideCard";
import { CredentialVisuals } from "./CredentialVisuals";
import { CredentialControls } from "./CredentialControls";

/** Awards & credentials section: a keyboard/drag driven three-slide carousel. */
export function CredentialsCarousel() {
  const { tr, lang, isRTL } = useI18n();
  const { reduce, slides, total, activeIdx, dir, openId, setOpenId, setPaused, go, prev, next } =
    useCredentialCarousel();

  const slide = slides[activeIdx] ?? [];
  const featured = slide[0];
  const side = slide.slice(1);
  const enterX = reduce ? 0 : (isRTL ? -1 : 1) * dir * 48;

  return (
    <section
      id="awards"
      className="section-shell section-y defer-paint select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") (isRTL ? prev : next)();
        if (e.key === "ArrowLeft") (isRTL ? next : prev)();
      }}
    >
      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-8">
          {/* Row 1: heading meta only — the right rail starts below it. */}
          <div className="min-w-0 lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <CredentialSlideMeta slide={slide} activeIdx={activeIdx} total={total} reduce={reduce} part="title" />
          </div>

          {/* Row 2 (left): artwork + controls, aligned with the cards. */}
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-4 lg:col-start-1 lg:row-start-2">
            <CredentialSlideMeta slide={slide} activeIdx={activeIdx} total={total} reduce={reduce} part="details" />
            <CredentialVisuals activeIdx={activeIdx} dir={dir} reduce={reduce} />
            <CredentialControls
              total={total}
              activeIdx={activeIdx}
              reduce={reduce}
              onPrev={prev}
              onNext={next}
              onSelect={(i) => go(i, i > activeIdx ? 1 : -1)}
            />
          </div>

          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={activeIdx}
              className="grid min-w-0 touch-pan-y grid-cols-1 items-stretch gap-5 self-start sm:gap-6 md:grid-cols-2 lg:col-span-8 lg:col-start-5 lg:row-start-2 lg:h-full lg:self-stretch lg:gap-8"

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
              {featured && (
                <CredentialFeaturedCard
                  item={featured}
                  lang={lang}
                  reduce={reduce}
                  open={openId === featured.id}
                  onToggle={() => setOpenId((o) => (o === featured.id ? null : featured.id))}
                  detailsLabel={tr("awards.learnMore")}
                  index={0}
                />
              )}

              <div className="grid min-w-0 auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:h-full md:grid-cols-1">
                {side.map((item, i) => (
                  <CredentialSideCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    reduce={reduce}
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
