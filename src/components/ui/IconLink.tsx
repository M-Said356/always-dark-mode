interface IconLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

/** External link rendered as an accessible square icon button. */
export function IconLink({ href, label, children }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-xl bg-foreground/10 border border-border text-card-foreground transition-all hover:bg-foreground/20"
    >
      {children}
    </a>
  );
}
