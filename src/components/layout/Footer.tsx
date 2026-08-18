import { Github, Linkedin, Mail, MessageSquare, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const socials = [
  {
    Icon: Github,
    label: "GitHub",
    href: "https://github.com/Mostafa-SAID7",
    bgClass: "bg-[var(--social-github)]",
    featured: true,
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/mostafasamirsaid",
    bgClass: "bg-[var(--social-linkedin)]",
    featured: true,
  },
  {
    Icon: Mail,
    label: "Email",
    href: "mailto:m.ssaid356@gmail.com",
    bgClass: "bg-[var(--social-instagram)]",
  },
  {
    Icon: MessageSquare,
    label: "WhatsApp",
    href: "https://wa.me/+201067358073",
    bgClass: "bg-[#25D366]",
  },
];

const footerNavLinks = [
  { key: "nav.works", to: "/projects" },
  { key: "nav.about", to: "/about" },
  { key: "nav.experience", to: "/experience" },
  { key: "nav.contact", to: "/contact" },
] as const;

export function Footer() {
  const { tr } = useI18n();

  return (
    <footer className="w-full text-foreground font-sans select-none overflow-hidden">
      {/* Main Footer Container */}
      <div className="w-full bg-background pt-1 pb-10 px-4 sm:px-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Inner Card Panel */}
          <div className="relative rounded-2xl bg-card p-8 sm:p-10 md:p-14 border border-border shadow-[var(--shadow-glow)] mb-8 md:mb-12 overflow-hidden">
            {/* Center Divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-6 relative z-10">
              {/* Headline */}
              <h2 className="font-['Oswald',sans-serif] text-4xl sm:text-5xl md:text-[56px] font-bold leading-[0.92] text-card-foreground tracking-normal text-center md:text-start">
                {tr("footer.headline1")}
                <br />
                {tr("footer.headline2")}
              </h2>

              {/* Social Icons Row */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 py-1">
                {socials.map(({ Icon, label, href, bgClass, featured }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`group relative grid place-items-center border-[3.5px] border-[var(--social-foreground)] shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${bgClass} ${
                      featured
                        ? "size-16 sm:size-20 md:size-[5rem] rounded-xl md:rounded-xl scale-105"
                        : "size-13 sm:size-15 md:size-[4.15rem] rounded-xl md:rounded-xl"
                    }`}
                  >
                    <Icon
                      className={`text-[var(--social-foreground)] transition-transform duration-300 group-hover:scale-110 ${
                        featured ? "size-8 sm:size-9" : "size-6 sm:size-7"
                      }`}
                      strokeWidth={2.2}
                    />
                    {featured && (
                      <span className="absolute -bottom-3 grid size-6 sm:size-7 place-items-center rounded-xl bg-card shadow-md border border-border">
                        <Play className="size-3 sm:size-3.5 fill-primary text-primary ms-0.5" />
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-6 px-2 md:flex-row md:px-4">
            {/* Logo & Brand Name */}
            <Link to="/" className="flex items-center gap-3.5 group" aria-label="Home">
              {/* Dot & Colon Prefix */}
              <div className="flex items-end gap-[3px] select-none opacity-90">
                <span className="size-1.5 rounded-full bg-foreground mb-[2px]" />
                <div className="flex flex-col gap-[3px]">
                  <span className="size-1.5 rounded-full bg-foreground" />
                  <span className="size-1.5 rounded-full bg-foreground" />
                </div>
              </div>

              {/* MS Square Badge */}
              <div className="grid place-items-center rounded-[8px] bg-foreground px-2.5 py-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <span className="keep-latin font-['Oswald',sans-serif] text-xl sm:text-2xl font-bold leading-none text-background tracking-tighter">
                  MS
                </span>
              </div>

              {/* Spaced MOSTAFA SAMIR Text */}
              <div className="keep-latin flex flex-col text-start font-sans text-[10px] sm:text-[11px] font-black tracking-[0.22em] text-foreground leading-tight uppercase">
                <span>MOSTAFA</span>
                <span>SAMIR</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
              {footerNavLinks.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className="font-sans text-xs sm:text-sm font-extrabold tracking-[0.25em] text-foreground transition-opacity duration-200 hover:opacity-75 uppercase"
                >
                  {tr(item.key)}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-center md:text-end font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-foreground/80 uppercase leading-tight">
              {tr("footer.copyright").replace("{year}", String(new Date().getFullYear()))}
              <br />
              {tr("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
