import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import { useI18n } from "@/lib/i18n";

interface CredentialControlsProps {
  total: number;
  activeIdx: number;
  reduce: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

/** Prev/next buttons and progress dots for the credentials carousel. */
export function CredentialControls({
  total,
  activeIdx,
  reduce,
  onPrev,
  onNext,
  onSelect,
}: CredentialControlsProps) {
  const { tr } = useI18n();
  const buttonClass =
    "grid size-11 place-items-center rounded-xl border border-border bg-foreground/10 text-foreground transition-colors hover:bg-foreground/20";

  return (
    <div className="flex items-center gap-3 lg:col-span-4 lg:col-start-1 lg:row-start-3">
      <motion.button
        onClick={onPrev}
        whileTap={reduce ? {} : { scale: 0.9 }}
        whileHover={reduce ? {} : { y: -2 }}
        className={buttonClass}
        aria-label={tr("awards.prev")}
      >
        <ChevronLeft className="size-5 rtl:rotate-180" />
      </motion.button>
      <motion.button
        onClick={onNext}
        whileTap={reduce ? {} : { scale: 0.9 }}
        whileHover={reduce ? {} : { y: -2 }}
        className={buttonClass}
        aria-label={tr("awards.next")}
      >
        <ChevronRight className="size-5 rtl:rotate-180" />
      </motion.button>

      <div className="ms-3 flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`${i + 1}/${total}`}
            aria-current={i === activeIdx}
            className="relative h-1.5 overflow-hidden rounded-full bg-foreground/20 transition-all"
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
  );
}
