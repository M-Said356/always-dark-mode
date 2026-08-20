import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, Compass, Home, Search } from "lucide-react";
import { useEffect, useRef } from "react";

import { PageShell } from "@/components/layout/PageShell";

const NAV = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * Animated 404. Layered composition:
 *  1. drifting accent blobs + grid  (ambient depth)
 *  2. parallax "404" that tracks the pointer with spring physics
 *  3. glitch/scan sweep across the numerals
 *  4. staggered entrance for copy, CTAs and the suggested-route chips
 * Every motion is disabled under prefers-reduced-motion.
 */
export function NotFound() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [14, -14]);
  const rotateX = useTransform(sy, [-1, 1], [-12, 12]);
  const glowX = useTransform(sx, [-1, 1], [-40, 40]);
  const glowY = useTransform(sy, [-1, 1], [-30, 30]);
  const backX = useTransform(sx, [-1, 1], [26, -26]);
  const backY = useTransform(sy, [-1, 1], [18, -18]);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width) * 2 - 1);
      py.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [px, py, reduce]);

  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 26, filter: reduce ? "none" : "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <PageShell
      contained={false}
      padded={false}
      mainRef={ref}
      className="section-shell nav-offset relative flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ambient layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 100%)",
          }}
        />
        <motion.div
          style={{ x: backX, y: backY }}
          className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute inset-0 animate-blob rounded-2xl bg-[color-mix(in_oklab,var(--accent)_22%,transparent)] blur-[110px]" />
          <div className="absolute inset-8 animate-float rounded-2xl bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] blur-[90px]" />
        </motion.div>
      </div>

      <motion.section
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 }}
        className="relative z-10 w-full max-w-2xl text-center"
        style={{ perspective: 1000 }}
      >
        <motion.div variants={rise} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}>
          <span className="chip mx-auto">
            <Compass className="size-3.5" aria-hidden />
            Lost signal — error 404
          </span>
        </motion.div>

        {/* parallax numerals */}
        <motion.div
          variants={rise}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
          className="relative mt-6"
        >
          <motion.div
            {...(reduce
              ? {}
              : { style: { rotateX, rotateY, transformStyle: "preserve-3d" as const } })}
            className="relative inline-block"
          >
            <motion.span
              aria-hidden
              style={{ x: glowX, y: glowY }}
              className="absolute inset-0 select-none type-display text-accent opacity-30 blur-2xl"
            >
              404
            </motion.span>

            <h1 className="relative select-none type-display text-foreground">
              <span className="sr-only">404 — page not found</span>
              <span aria-hidden className="relative inline-block">
                404
                {!reduce && (
                  <>
                    <motion.span
                      className="absolute inset-0 text-accent mix-blend-screen"
                      animate={{ x: [0, -3, 2, 0], opacity: [0, 0.85, 0.4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4.2 }}
                    >
                      404
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 text-[color-mix(in_oklab,var(--accent)_60%,var(--foreground))]"
                      animate={{ x: [0, 4, -2, 0], opacity: [0, 0.5, 0.25, 0] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 4.2,
                        delay: 0.08,
                      }}
                    >
                      404
                    </motion.span>
                    {/* scan sweep */}
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 h-1/5 bg-[color-mix(in_oklab,var(--accent)_35%,transparent)] mix-blend-overlay"
                      animate={{ top: ["-20%", "120%"] }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1.4,
                      }}
                    />
                  </>
                )}
              </span>
            </h1>
          </motion.div>
        </motion.div>

        <motion.h2
          variants={rise}
          transition={{ duration: 0.5 }}
          className="mt-2 type-h3 text-foreground"
        >
          This route drifted off the map
        </motion.h2>

        <motion.p
          variants={rise}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-3 max-w-md type-body text-muted-foreground"
        >
          The page you're after doesn't exist, moved, or never shipped. Here are the paths that
          definitely do.
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/" className="btn-accent">
            <Home className="size-4" aria-hidden />
            Go home
          </Link>
          <Link to="/projects" className="btn-accent-outline">
            <Search className="size-4" aria-hidden />
            Browse projects
          </Link>
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.history.back()}
            className="pill-outline"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Go back
          </button>
        </motion.div>

        <motion.nav
          variants={rise}
          transition={{ duration: 0.5 }}
          aria-label="Suggested pages"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {NAV.map((item, i) => (
            <motion.div
              key={item.to}
              {...(reduce ? {} : { whileHover: { y: -3, scale: 1.04 } })}
              transition={{ type: "spring", stiffness: 320, damping: 18, delay: i * 0.01 }}
            >
              <Link
                to={item.to}
                className="nav-label inline-flex rounded-xl border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:text-accent"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </motion.section>
    </PageShell>
  );
}
