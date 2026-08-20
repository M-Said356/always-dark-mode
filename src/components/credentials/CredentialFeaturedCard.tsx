import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import type { CredentialItem } from "@/data";
import { EASE } from "@/lib/motion";
import { iconForCredential } from "./credentialIcon";

interface CredentialFeaturedCardProps {
  item: CredentialItem;
  lang: "en" | "ar";
  reduce: boolean;
  open: boolean;
  onToggle: () => void;
  detailsLabel: string;
  index: number;
}

/** Large credential card with an expandable highlights panel. */
export function CredentialFeaturedCard({
  item,
  lang,
  reduce,
  open,
  onToggle,
  detailsLabel,
  index,
}: CredentialFeaturedCardProps) {
  const Icon = iconForCredential(item.id);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay: reduce ? 0 : 0.08 * index }}
      className="relative flex h-full min-w-0 flex-col items-center surface-card p-6 text-center sm:p-8"
    >
      <span className="mb-6 rounded-xl border border-border bg-foreground/10 px-4 py-1 type-micro text-primary">
        {item.year}
      </span>

      <motion.div
        whileHover={reduce ? {} : { rotate: -6, scale: 1.06 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="mb-6 grid size-16 place-items-center rounded-xl border border-border bg-foreground/15 text-foreground shadow-inner"
      >
        <Icon className="size-8 text-primary" />
      </motion.div>

      <h3 className="mb-3 type-h3 text-card-foreground">{item.title[lang]}</h3>

      <p className="mb-6 max-w-[34ch] type-body text-balance text-card-foreground/85">
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
                  className="flex gap-2 type-body text-card-foreground/80"
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
                  className="rounded-lg border border-border bg-foreground/10 px-2 py-0.5 type-micro text-primary"
                >
                  {s}
                </span>
              ))}
            </div>

            {item.credentialId && (
              <p className="mt-3 mb-1 type-micro text-card-foreground/60">{item.credentialId}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group btn-surface mt-auto w-full"
      >
        <span className="grid size-6 place-items-center rounded-xl bg-primary text-primary-foreground">
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid place-items-center"
          >
            <Play className="ms-0.5 size-3 fill-primary-foreground text-primary-foreground" />
          </motion.span>
        </span>
        <span className="type-label text-foreground">{detailsLabel}</span>
      </button>
    </motion.div>
  );
}
