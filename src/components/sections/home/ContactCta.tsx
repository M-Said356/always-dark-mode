import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="rounded-2xl bg-card border border-border shadow-[var(--shadow-glow)] px-8 py-14 text-center md:px-14">
            <span className="inline-block eyebrow-wide text-primary">Available for new work</span>
            <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl text-card-foreground">
              Let&apos;s build something
              <br />
              that scales
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-card-foreground/70">
              Tell me about your marketplace and I&apos;ll come back with a concrete plan.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-sans text-xs font-black tracking-widest text-primary-foreground uppercase shadow-md transition-all hover:scale-105"
              >
                Start a conversation
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
              </Link>
              <a
                href="mailto:m.ssaid356@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3.5 font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Mail className="size-4" />
                Email directly
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
