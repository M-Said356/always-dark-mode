import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCta() {
  return (
    <section id="contact" className="section-shell section-y scroll-mt-24">
      <div className="container-prose">
        <Reveal>
          <div className="surface-card px-6 py-12 text-center sm:px-10 sm:py-14">
            <span className="inline-block eyebrow-wide text-primary">Available for new work</span>
            <h2 className="mt-5 type-h2-lg text-card-foreground">
              Let&apos;s build something
              <br />
              that scales
            </h2>
            <p className="mx-auto mt-6 max-w-xl type-lead text-card-foreground/70">
              Tell me about your marketplace and I&apos;ll come back with a concrete plan.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="group btn-accent type-label"
              >
                Start a conversation
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
              </Link>
              <a
                href="mailto:m.ssaid356@gmail.com"
                className="pill-outline type-label text-foreground"
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
