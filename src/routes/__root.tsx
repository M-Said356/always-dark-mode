import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { describeError } from "@/lib/error-capture";
import { ThemeProvider, themeBootstrapScript } from "@/lib/theme";
import { I18nProvider, langBootstrapScript, useI18n } from "@/lib/i18n";
import { useSmoothScroll } from "@/lib/smooth-scroll";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { AppPreloader, preloaderBootstrapScript } from "@/components/ui/AppPreloader";

// Client-only chrome and the rarely-hit 404 screen are pulled out of the
// initial bundle so the first route paints with the smallest possible JS.
const WelcomeModal = lazy(() =>
  import("@/components/ui/WelcomeModal").then((m) => ({ default: m.WelcomeModal })),
);
const Toaster = lazy(() => import("sonner").then((m) => ({ default: m.Toaster })));
const NotFoundScreen = lazy(() =>
  import("@/components/sections/NotFound").then((m) => ({ default: m.NotFound })),
);

function NotFoundComponent() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NotFoundScreen />
    </Suspense>
  );
}

/** Arabic webfonts are only fetched once the UI actually switches to Arabic. */
function ArabicFonts() {
  const { lang } = useI18n();

  useEffect(() => {
    if (lang !== "ar") return;
    const href =
      "https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Tajawal:wght@400;700&display=swap";
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [lang]);

  return null;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  // Use error-capture's describeError to properly format error details
  const errorMessage = describeError(error);
  console.error(errorMessage);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="type-h3 text-foreground">This page didn't load</h1>
        <p className="mt-2 type-body-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
              if (typeof window !== "undefined") window.location.reload();
            }}
            className="btn-accent"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center pill-step rounded-xl border border-border type-body-sm text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mostafa Samir | Senior Full Stack Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Mostafa Samir — .NET 8 microservices, React and Angular platforms, multi-vendor marketplaces and high-scale commerce systems.",
      },
      { name: "author", content: "Mostafa Samir" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mostafa Samir" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FF4B35" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        // Latin faces only, trimmed to the weights the design actually uses.
        // Arabic families load on demand (see <ArabicFonts />).
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@900&family=Caveat:wght@700&family=DM+Sans:wght@400;500;700&family=Oswald:wght@400;600;700&display=swap",
      },

      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Mostafa Samir — Senior Full Stack Engineer",
          url: "/",
          author: { "@type": "Person", name: "Mostafa Samir" },
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <script dangerouslySetInnerHTML={{ __html: langBootstrapScript }} />
        <script dangerouslySetInnerHTML={{ __html: preloaderBootstrapScript }} />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useSmoothScroll();
  // Overlay chrome is mounted after hydration so it never blocks first paint.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <ArabicFonts />
          <AppPreloader />
          {hydrated && (
            <Suspense fallback={null}>
              <Toaster position="bottom-right" richColors />
              <WelcomeModal />
            </Suspense>
          )}
          {/* Required: nested routes render here. */}
          <Outlet />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
