import type { ReactNode, Ref } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  /** Wrap the content in a centered container. Disable for full-bleed pages. */
  contained?: boolean;
  /** Apply the standard top/bottom page padding. Disable for hero-first pages. */
  padded?: boolean;
  /** Extra classes for the <main> landmark. */
  className?: string;
  /** Optional ref for pages with pointer-driven main content. */
  mainRef?: Ref<HTMLElement>;
  /** Disable the outer overflow-x-hidden wrapper. Useful when children rely on sticky positioning. */
  disableOverflowX?: boolean;
}

/**
 * The single page chrome: navbar, main landmark and footer.
 * Routes render content only — never their own navbar/footer.
 */
export function PageShell({
  children,
  contained = true,
  padded = true,
  className,
  mainRef,
  disableOverflowX = false,
}: PageShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen select-none flex-col bg-background text-foreground",
        !disableOverflowX && "overflow-x-hidden",
      )}
    >
      <Navbar />
      <main
        ref={mainRef}
        className={cn(
          "flex-1",
          padded && "nav-offset pb-16",
          contained && "container-page page-gutter",
          className,
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
