import { motion } from "framer-motion";
import type { CredentialItem } from "@/data";
import { EASE } from "@/lib/motion";
import { iconForCredential } from "./credentialIcon";

interface CredentialSideCardProps {
  item: CredentialItem;
  lang: "en" | "ar";
  reduce: boolean;
  index: number;
}

/** Compact credential card shown beside the featured one. */
export function CredentialSideCard({ item, lang, reduce, index }: CredentialSideCardProps) {
  const Icon = iconForCredential(item.id);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay: reduce ? 0 : 0.08 * index }}
      whileHover={reduce ? {} : { y: -6 }}
      className="flex h-full min-w-0 flex-col items-center justify-center surface-card p-6 text-center transition-colors hover:bg-card/90"
    >
      <div className="mb-3 grid size-12 place-items-center rounded-xl bg-foreground/10 text-foreground">
        <Icon className="size-6 text-primary" />
      </div>
      <h4 className="mb-2 type-h4 text-balance text-card-foreground">{item.title[lang]}</h4>
      <p className="mb-3 type-body break-words text-card-foreground/70">{item.org[lang]}</p>
      <span className="rounded-xl border border-border bg-foreground/10 px-3 py-0.5 type-micro text-primary">
        {item.year}
      </span>
    </motion.div>
  );
}
