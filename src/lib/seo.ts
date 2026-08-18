import { SITE, absoluteUrl } from "@/lib/site";

interface PageSeoInput {
  /** Page title, already including the brand suffix when needed. */
  title: string;
  description: string;
  /** Route path, e.g. "/about". */
  path: string;
  type?: "website" | "article";
  /** Optional JSON-LD payloads for this page. */
  jsonLd?: Record<string, unknown>[];
}

type HeadMeta = Record<string, string>;

/**
 * Builds the full head() payload for a page: title, description, Open Graph,
 * Twitter card, canonical link and optional JSON-LD.
 *
 * Every route uses this helper so metadata stays consistent and is defined
 * in exactly one place.
 */
export function pageSeo({ title, description, path, type = "website", jsonLd = [] }: PageSeoInput) {
  const url = absoluteUrl(path);

  const meta: HeadMeta[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

/** `Page Title — Mostafa Samir | Senior Full Stack Engineer` */
export function pageTitle(label: string): string {
  return `${label} — ${SITE.titleSuffix}`;
}
