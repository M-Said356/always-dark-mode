import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Layers,
  GraduationCap,
  BadgeCheck,
  ArrowRight,
  Calendar,
  MapPin,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";
import { credentials, credentialTabs, type CredentialTab } from "@/data";

const tabIcons: Record<CredentialTab, typeof Building2> = {
  work: Building2,
  projects: Layers,
  education: GraduationCap,
  certifications: BadgeCheck,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function ExperiencePreview() {
  const [activeTab, setActiveTab] = useState<CredentialTab>("work");
  const [openId, setOpenId] = useState<string | null>(null);
  const { tr, lang } = useI18n();
  const reduce = useReducedMotion();

  const items = useMemo(() => credentials.filter((c) => c.tab === activeTab), [activeTab]);
  const ActiveIcon = tabIcons[activeTab];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduce ? { duration: 0 } : { staggerChildren: 0.04, delayChildren: 0.05 },
    },
    exit: reduce
      ? { opacity: 0, transition: { duration: 0 } }
      : { opacity: 0, x: -16, transition: { duration: 0.2, ease: EASE } },
  };

  const rowVariants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
      };

  return (
    <section
      id="events"
      className="section-shell section-y"
    >
      <div className="container-narrow">
        <SectionHeading title={tr("events.title")} description={tr("events.desc")} />

        {/* Tabs */}
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
                onClick={() => {
                  setActiveTab(id);
                  setOpenId(null);
                }}
                className={`relative inline-flex items-center gap-2 whitespace-nowrap pill-step rounded-xl type-label transition-colors ${
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
                    className={`tag-step rounded-md type-tag ${
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

        {/* Rows */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-4"
          >
            {items.length === 0 && (
              <p className="text-center type-body text-muted-foreground">{tr("events.empty")}</p>
            )}

            {items.map((item) => {
              const open = openId === item.id;
              const featured = item.featured;
              return (
                <motion.article
                  key={item.id}
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
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    className="flex w-full flex-col gap-4 pad-card text-start sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-5 sm:gap-7">
                      <span
                        dir="ltr"
                        className="min-w-10 type-wordmark [--wordmark-size:0.875rem] opacity-80"
                      >
                        {item.year}
                      </span>

                      <div
                        className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                          featured
                            ? "bg-primary text-primary-foreground"
                            : "bg-foreground/10 text-primary"
                        }`}
                      >
                        <ActiveIcon className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="type-h4">{item.title[lang]}</h3>
                        <p
                          className={`mt-1 type-meta ${
                            featured ? "opacity-80" : "text-muted-foreground"
                          }`}
                        >
                          {item.org[lang]} · {item.location[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:max-w-[20rem] sm:justify-end">
                      <p
                        className={`type-meta sm:text-end ${
                          featured ? "opacity-90" : "text-muted-foreground"
                        }`}
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
                        initial={
                          reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`border-t pad-card ${
                            featured ? "border-background/20" : "border-border"
                          }`}
                        >
                          <div className="flex flex-wrap items-center gap-4 type-meta">
                            <span className="inline-flex items-center gap-1.5 opacity-80">
                              <Calendar className="size-3.5" />
                              {item.period[lang]}
                            </span>
                            <span className="inline-flex items-center gap-1.5 opacity-80">
                              <MapPin className="size-3.5" />
                              {item.location[lang]}
                            </span>
                            {item.credentialId && (
                              <span
                                className="inline-flex items-center gap-1.5 opacity-80"
                                dir="ltr"
                              >
                                <ShieldCheck className="size-3.5" />
                                {tr("events.credentialId")}: {item.credentialId}
                              </span>
                            )}
                            {item.status && (
                              <span
                                className={`tag-step rounded-md type-micro ${
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
                                className={`flex gap-2.5 type-body-sm ${
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
                                className={`rounded-lg px-2.5 py-1 type-tag ${
                                  featured
                                    ? "bg-background/15"
                                    : "bg-foreground/5 border border-border"
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
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 pill-step rounded-xl border border-border bg-foreground/5 type-label transition-colors hover:bg-foreground/15"
          >
            {tr("events.cta")}
            <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
