import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaVariant = "primary" | "secondary";

const VARIANTS: Record<CtaVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "border border-border bg-card text-card-foreground",
};

type CtaLinkProps = LinkComponentProps & {
  variant?: CtaVariant;
  /** Hide the trailing arrow icon. */
  withArrow?: boolean;
};

/** Shared call-to-action link so button styling lives in one place. */
export function CtaLink({
  variant = "primary",
  withArrow = true,
  className,
  children,
  ...linkProps
}: CtaLinkProps) {
  return (
    <Link
      {...linkProps}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-6 py-3 font-sans text-xs font-black uppercase tracking-widest shadow-md transition-transform hover:scale-105",
        VARIANTS[variant],
        className as string,
      )}
    >
      {children as React.ReactNode}
      {withArrow && <ArrowRight className="size-4 rtl:rotate-180" />}
    </Link>
  );
}

/** Centered row of CTAs shared by the sub pages. */
export function CtaRow({ children }: { children: React.ReactNode }) {
  return <div className="mt-12 flex flex-wrap justify-center gap-4">{children}</div>;
}
