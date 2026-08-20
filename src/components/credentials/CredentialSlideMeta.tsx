import { AnimatePresence, motion } from "framer-motion";
import type { CredentialItem } from "@/data";
import { EASE } from "@/lib/motion";
import { useI18n } from "@/lib/i18n";

interface CredentialSlideMetaProps {
  slide: CredentialItem[];
  activeIdx: number;
  total: number;
  reduce: boolean;
  /** "title" renders the counter + heading, "details" the per-slide metadata. */
  part?: "title" | "details" | "all";
}

/** Section title, slide counter and per-slide metadata. */
export function CredentialSlideMeta({ slide, activeIdx, total, reduce, part = "all" }: CredentialSlideMetaProps) {
  const { tr, lang } = useI18n();

  return (
    <motion.div
      className="flex min-w-0 flex-col gap-6 lg:col-span-4 lg:col-start-1 lg:row-start-1"
      initial={reduce ? {} : { opacity: 0, y: 24 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {part !== "details" && (<>
      <div className="flex items-end gap-3">
        <span className="pb-3 type-label text-foreground/60">No</span>
        <span className="type-h2 relative inline-block overflow-hidden leading-none">
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
              className="absolute inset-0 flex items-center justify-center leading-none text-primary"
            >
              {String(activeIdx + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="pb-2 type-h3 text-foreground/40">/{String(total).padStart(2, "0")}</span>
      </div>

      <h2 className="type-h2 text-balance text-foreground">
        {tr("awards.title1")}
        <br />
        {tr("awards.title2")}
      </h2>
      </>)}

      {part !== "title" && (

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeIdx}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="space-y-3"
        >
          <div className="flex flex-wrap gap-2">
            {slide.map((item) => (
              <span
                key={item.id}
                className="rounded-full border border-border bg-foreground/5 px-3 py-1 type-micro text-foreground/70"
              >
                {item.year}
              </span>
            ))}
          </div>
          <p className="type-body text-foreground/60">
            {slide.map((i) => i.org[lang]).join(" · ")}
          </p>
          <p className="type-micro text-foreground/45">
            {slide.length} {tr("awards.itemsLabel")}
          </p>
        </motion.div>
      </AnimatePresence>
      )}
    </motion.div>
  );
}
