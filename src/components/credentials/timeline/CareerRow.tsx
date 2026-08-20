import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import type { CredentialItem } from "@/data";
import { EASE } from "@/lib/motion";
import { useI18n } from "@/lib/i18n";
import { timelineRowVariants } from "./timelineVariants";

interface CareerRowProps {
  item: CredentialItem;
  icon: LucideIcon;
  open: boolean;
  reduce: boolean;
  onToggle: () => void;
}

/** One expandable career/credential entry. */
export function CareerRow({ item, icon: Icon, open, reduce, onToggle }: CareerRowProps) {
  const { tr, lang } = useI18n();
  const featured = item.featured;
  const rowVariants = timelineRowVariants(reduce);

  return (
    <motion.article
      variants={rowVariants}
      whileHover={reduce || featured ? {} : { y: -3 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={`overflow-hidden rounded-2xl ${
        featured
          ? "bg-foreground text-background shadow-glow"
          : "border border-border bg-card text-card-foreground shadow-md hover:shadow-lg"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full flex-col gap-4 p-5 text-start sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div className="flex items-center gap-5 sm:gap-7">
          <span dir="ltr" className="min-w-10 type-label opacity-80">
            {item.year}
          </span>

          <div
            className={`grid size-10 shrink-0 place-items-center rounded-xl ${
              featured ? "bg-primary text-primary-foreground" : "bg-foreground/10 text-primary"
            }`}
          >
            <Icon className="size-4" />
          </div>

          <div className="min-w-0">
            <h3 className="type-h4">{item.title[lang]}</h3>
            <p className={`type-body mt-1 ${featured ? "opacity-80" : "text-muted-foreground"}`}>
              {item.org[lang]} · {item.location[lang]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:max-w-[20rem] sm:justify-end">
          <p
            className={`type-body sm:text-end ${featured ? "opacity-90" : "text-muted-foreground"}`}
          >
            {item.summary[lang]}
          </p>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
            className="shrink-0"
          >
            <ChevronDown className="size-4" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div
              className={`border-t pad-card ${
                featured ? "border-background/20" : "border-border"
              }`}
            >
              <div className="type-body flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 opacity-80">
                  <Calendar className="size-3.5" />
                  {item.period[lang]}
                </span>
                <span className="inline-flex items-center gap-1.5 opacity-80">
                  <MapPin className="size-3.5" />
                  {item.location[lang]}
                </span>
                {item.credentialId && (
                  <span className="inline-flex items-center gap-1.5 opacity-80" dir="ltr">
                    <ShieldCheck className="size-3.5" />
                    {tr("events.credentialId")}: {item.credentialId}
                  </span>
                )}
                {item.status && (
                  <span
                    className={`type-micro rounded-md px-2 py-0.5 ${
                      featured ? "bg-background/20" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {item.status[lang]}
                  </span>
                )}
              </div>

              <motion.ul
                className="mt-4 space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: reduce
                      ? { duration: 0 }
                      : { staggerChildren: 0.04, delayChildren: 0.12 },
                  },
                }}
              >
                {item.highlights[lang].map((point) => (
                  <motion.li
                    key={point}
                    variants={rowVariants}
                    className={`type-body flex gap-2.5 ${
                      featured ? "opacity-90" : "text-muted-foreground"
                    }`}
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    dir="ltr"
                    className={`type-micro rounded-lg px-2.5 py-1 ${
                      featured ? "bg-background/15" : "border border-border bg-foreground/5"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
