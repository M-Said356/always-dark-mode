import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/ui/PageIntro";
import { Contact } from "@/components/sections/Contact";
import { pageSeo, pageTitle } from "@/lib/seo";
import { useI18n } from "@/lib/i18n";

interface ContactChannel {
  Icon: LucideIcon;
  labelKey: string;
  value?: string;
  valueKey?: string;
  href?: string;
}

const CHANNELS: ContactChannel[] = [
  {
    Icon: Mail,
    labelKey: "contact.channel.email",
    value: "m.ssaid356@gmail.com",
    href: "mailto:m.ssaid356@gmail.com",
  },
  {
    Icon: Phone,
    labelKey: "contact.channel.phone",
    value: "+20 106 735 8073",
    href: "https://wa.me/+201067358073",
  },
  {
    Icon: MapPin,
    labelKey: "contact.channel.location",
    valueKey: "contact.channel.locationValue",
  },
];

const DESCRIPTION =
  "Get in touch with Mostafa Samir for marketplace engineering, .NET 8 Microservices, or full-stack web applications.";

export const Route = createFileRoute("/contact")({
  head: () => pageSeo({ title: pageTitle("Contact"), description: DESCRIPTION, path: "/contact" }),
  pendingComponent: PageSkeleton,
  component: ContactPage,
});

function ContactPage() {
  const { tr } = useI18n();

  return (
    <PageShell>
      <PageIntro
        eyebrow={tr("contact.page.eyebrow")}
        title={tr("contact.page.title")}
        description={tr("contact.page.desc")}
      />

      <section className="mb-8 py-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {CHANNELS.map(({ Icon, labelKey, value, valueKey, href }) => (
            <div
              key={labelKey}
              className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-7 text-center shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-xl border border-border bg-foreground/10 text-card-foreground">
                <Icon className="size-5 text-primary" />
              </div>
              <span className="mb-1 font-sans text-[10px] font-black uppercase tracking-[0.2em] text-card-foreground/80">
                {tr(labelKey)}
              </span>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="break-all font-sans text-sm font-bold text-card-foreground transition-colors hover:text-primary"
                >
                  {value}
                </a>
              ) : (
                <span className="font-sans text-sm font-bold text-card-foreground">
                  {valueKey ? tr(valueKey) : value}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <Contact showHeading={false} />
    </PageShell>
  );
}
