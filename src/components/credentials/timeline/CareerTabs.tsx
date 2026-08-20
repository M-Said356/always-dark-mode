import { motion } from "framer-motion";
import { credentials, credentialTabs, type CredentialTab } from "@/data";
import { useI18n } from "@/lib/i18n";
import { tabIcons } from "./tabIcons";

interface CareerTabsProps {
  activeTab: CredentialTab;
  reduce: boolean;
  onSelect: (tab: CredentialTab) => void;
}

/** Tab bar switching between work, projects, education and certifications. */
export function CareerTabs({ activeTab, reduce, onSelect }: CareerTabsProps) {
  const { tr } = useI18n();

  return (
    <div
      role="tablist"
      aria-label={tr("events.title")}
      className="mt-10 mb-10 flex flex-wrap items-center justify-center gap-3"
    >
      {credentialTabs.map((id) => {
        const Icon = tabIcons[id];
        const active = activeTab === id;
        const count = credentials.filter((c) => c.tab === id).length;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(id)}
            className={`type-label relative inline-flex items-center gap-2 pill-step rounded-xl whitespace-nowrap transition-colors ${
              active
                ? "text-background"
                : "border border-border bg-foreground/5 text-foreground hover:bg-foreground/15"
            }`}
          >
            {active && (
              <motion.span
                layoutId="career-tab-pill"
                className="absolute inset-0 rounded-xl bg-foreground shadow-md"
                transition={
                  reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                }
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-2">
              <Icon className="size-3.5" />
              {tr(`events.tab.${id}`)}
              <span
                className={`type-micro tag-step rounded-md ${
                  active ? "bg-background/20" : "bg-foreground/10"
                }`}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
