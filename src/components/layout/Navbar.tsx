import { useEffect, useRef, useState } from "react";
import { Menu, X, Github, Linkedin, Sun, Moon, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, tr } = useI18n();

  const navLinks = [
    { key: "nav.works", to: "/projects" },
    { key: "nav.about", to: "/about" },
    { key: "nav.experience", to: "/experience" },
    { key: "nav.contact", to: "/contact" },
  ] as const;

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Publish the live header height as `--nav-h` so sticky page toolbars can
   * park right under the bar — it shrinks on scroll, so a fixed offset would
   * leave a big gap at the top and a tight one after scrolling.
   */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const write = () => {
      document.documentElement.style.setProperty(
        "--nav-h",
        `${Math.round(el.getBoundingClientRect().height)}px`,
      );
    };
    write();
    const ro = new ResizeObserver(write);
    ro.observe(el);
    const id = window.setInterval(write, 100);
    const stop = window.setTimeout(() => window.clearInterval(id), 700);
    return () => {
      ro.disconnect();
      window.clearInterval(id);
      window.clearTimeout(stop);
    };
  }, [scrolled, open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none transition-[padding] duration-500 ease-out",
        scrolled ? "py-1" : "py-2.5",
      )}
    >
      <nav
        className={cn(
          "pointer-events-auto flex items-center justify-between rounded-2xl border transition-all duration-500 ease-out",
          "w-[calc(100%-1.5rem)] max-w-5xl",
          scrolled
            ? "bg-background/75 backdrop-blur-xl shadow-[0_6px_24px_-6px_rgba(0,0,0,0.25)] border-border/70 py-1.5 px-3"
            : "bg-background/40 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)] border-border/40 py-2 px-4",
        )}
      >
        {/* Left: Logo Badge Pill */}
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-2xl bg-card text-card-foreground px-2.5 py-1 shadow-sm border border-border transition-all duration-500 hover:scale-105 select-none"
          aria-label={tr("common.home")}
        >
          {/* Prefix dots */}
          <div className="flex items-end gap-[2px] opacity-90">
            <span className="size-1 rounded-full bg-[#FF4B35] mb-[1px]" />
            <div className="flex flex-col gap-[2px]">
              <span className="size-1 rounded-full bg-[#FF4B35]" />
              <span className="size-1 rounded-full bg-[#FF4B35]" />
            </div>
          </div>

          {/* MS Red Square */}
          <div className="grid place-items-center rounded-[4px] bg-[#FF4B35] px-1.5 py-0.5 shadow-sm">
            <span className="keep-latin font-['Oswald',sans-serif] text-xs font-bold leading-none text-white tracking-tighter">
              MS
            </span>
          </div>

          {/* MOSTAFA SAMIR Text */}
          <div className="keep-latin flex flex-col text-start font-sans text-[8px] font-black tracking-[0.2em] text-foreground leading-tight uppercase">
            <span>MOSTAFA</span>
            <span>SAMIR</span>
          </div>
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              to={l.to}
              className="font-sans text-[11px] font-extrabold tracking-[0.25em] text-foreground transition-opacity hover:opacity-75 uppercase"
            >
              {tr(l.key)}
            </Link>
          ))}
        </div>

        {/* Right: Controls & Social Icons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            aria-label={tr("common.theme")}
            className="group relative grid size-8 place-items-center overflow-hidden rounded-2xl bg-foreground/10 border border-border text-foreground transition-all duration-200 hover:bg-foreground/20 hover:scale-105 active:scale-95"
            title={tr("common.theme")}
          >
            <Sun
              className={`absolute size-3.5 text-[#FFD000] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                theme === "dark"
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            />
            <Moon
              className={`absolute size-3.5 text-[#FF4B35] transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                theme === "dark"
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
          </button>


          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            aria-label={tr("common.language")}
            className="flex h-8 items-center gap-1.5 rounded-2xl bg-foreground/10 border border-border px-2.5 text-[11px] font-extrabold text-foreground transition-all hover:bg-foreground/20 hover:scale-105"
            title={tr("common.language")}
          >
            <Globe className="size-3.5 text-[#FF4B35]" />
            <span className="keep-latin uppercase">{lang === "en" ? "AR" : "EN"}</span>
          </button>

          {/* Social Icons: GitHub & LinkedIn */}
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="https://github.com/Mostafa-SAID7"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-8 place-items-center rounded-2xl bg-foreground/10 border border-border text-foreground transition-all hover:bg-foreground/20 hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="size-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/mostafasamirsaid"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-8 place-items-center rounded-2xl bg-foreground/10 border border-border text-foreground transition-all hover:bg-foreground/20 hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="size-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={tr("common.menu")}
            className="grid size-9 place-items-center rounded-2xl bg-foreground/10 border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="pointer-events-auto absolute top-full inset-x-0 mx-auto mt-2 flex w-[calc(100%-1.5rem)] max-w-md flex-col gap-1 rounded-2xl bg-card text-card-foreground p-4 md:hidden border border-border shadow-2xl">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-2.5 text-start font-sans text-xs font-black tracking-[0.2em] uppercase text-foreground hover:bg-foreground/10"
            >
              {tr(l.key)}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-3 border-t border-border mt-1 px-4">
            <a
              href="https://github.com/Mostafa-SAID7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold text-foreground hover:opacity-75"
            >
              <Github className="size-4" /> GitHub
            </a>
            <span className="opacity-30">|</span>
            <a
              href="https://linkedin.com/in/mostafasamirsaid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold text-foreground hover:opacity-75"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
