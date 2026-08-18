import type { Project, ProjectCategory } from "./projects";

/**
 * Rich case-study layer for the project detail page.
 *
 * The base `projects` array stays a short summary (used by cards, search and
 * SEO). This module expands every project into a full case study: overview,
 * problem/solution, feature set, engineering notes, delivery timeline and
 * measurable outcomes. Anything not explicitly authored in `detailOverrides`
 * is derived from the project's category, tech stack and engagement type so
 * every project renders a complete page — never a bare summary.
 */

export interface ProjectHighlight {
  label: string;
  value: string;
  hint?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProcessStep {
  phase: string;
  title: string;
  description: string;
}

export interface ProjectDetailContent {
  tagline: string;
  overview: string[];
  challenge: string;
  solution: string;
  features: ProjectFeature[];
  highlights: ProjectHighlight[];
  responsibilities: string[];
  architecture: string[];
  process: ProcessStep[];
  outcomes: string[];
  role: string;
  timeline: string;
  teamSize: string;
  platforms: string[];
}

type Override = Partial<ProjectDetailContent>;

/* ------------------------------------------------------------------ */
/* Category-driven defaults                                            */
/* ------------------------------------------------------------------ */

const categoryFeatures: Record<ProjectCategory, ProjectFeature[]> = {
  Clothing: [
    {
      title: "Catalog & variant engine",
      description:
        "Products modelled with size, colour and fit variants, each with its own stock counter, pricing rule and media set.",
    },
    {
      title: "Faceted search & filtering",
      description:
        "Instant client-side filtering across category, size, price band and availability, with URL-synced state so any view is shareable.",
    },
    {
      title: "Cart & checkout flow",
      description:
        "Persistent cart, address capture, shipping options and an order summary that recalculates totals and tax on every change.",
    },
    {
      title: "Order lifecycle",
      description:
        "Order creation, status transitions and history views for both the customer account area and the admin side.",
    },
    {
      title: "Merchandising surfaces",
      description:
        "Editorial hero blocks, collection rails and related-product logic used to push seasonal drops without a code change.",
    },
  ],
  Beauty: [
    {
      title: "Ingredient-aware product model",
      description:
        "Each product carries shade, skin-type and ingredient metadata, which powers both filtering and recommendation logic.",
    },
    {
      title: "Recommendation engine",
      description:
        "Rule-based matching that suggests complementary products from the current item's category, concern and shade family.",
    },
    {
      title: "Reviews & ratings",
      description:
        "Verified review capture with aggregate scoring surfaced on cards, listings and the product detail page.",
    },
    {
      title: "Routine builder",
      description:
        "Multi-step routine bundling so customers add a full regimen to the cart in one action instead of item by item.",
    },
    {
      title: "Rich media gallery",
      description:
        "Zoomable imagery, swatch previews and lazy-loaded assets tuned to keep the largest contentful paint low.",
    },
  ],
  Jewelry: [
    {
      title: "Product customisation",
      description:
        "Metal, stone and engraving options recomputed into live price and lead-time estimates before checkout.",
    },
    {
      title: "Wishlist & save-for-later",
      description:
        "Persisted wishlist with quick add-to-cart, built for high-consideration purchases that span several sessions.",
    },
    {
      title: "High-fidelity presentation",
      description:
        "Large-format photography pipeline with responsive sources so detail stays crisp without blocking first paint.",
    },
    {
      title: "Collection storytelling",
      description:
        "Editorial collection pages that mix narrative content with shoppable product grids.",
    },
    {
      title: "Secure checkout",
      description:
        "Validated multi-step checkout with order confirmation and post-purchase status tracking.",
    },
  ],
  Furniture: [
    {
      title: "Configurable products",
      description:
        "Material, dimension and finish selectors that resolve into a concrete SKU with its own price and availability.",
    },
    {
      title: "Wallet-based transactions",
      description:
        "Web3 wallet connection with on-chain transaction signing and a clear fallback for traditional payment paths.",
    },
    {
      title: "Marketplace listings",
      description:
        "Seller-side listing creation and buyer-side discovery sharing one normalised product schema.",
    },
    {
      title: "Delivery & logistics data",
      description:
        "Lead times, shipping zones and assembly options surfaced before the customer commits to an order.",
    },
    {
      title: "Showroom-grade visuals",
      description: "Full-bleed imagery and room-context galleries built on a responsive media layer.",
    },
  ],
  Dashboard: [
    {
      title: "Real-time stock tracking",
      description:
        "Live quantity, reorder-point and movement views that refresh as transactions land instead of on manual reload.",
    },
    {
      title: "Analytics & reporting",
      description:
        "Aggregated charts for turnover, low-stock exposure and movement history, exportable for offline review.",
    },
    {
      title: "Role-based access",
      description:
        "Authenticated sessions with permission-scoped screens so operators, managers and admins see different surfaces.",
    },
    {
      title: "Bulk operations",
      description:
        "Multi-select editing, batch status changes and import/export paths for high-volume catalog maintenance.",
    },
    {
      title: "Audit trail",
      description: "Every mutation recorded with actor, timestamp and previous value for traceability.",
    },
  ],
  Web3: [
    {
      title: "Service decomposition",
      description:
        "Independent services for catalog, orders, identity and payments, each owning its data and deployable on its own.",
    },
    {
      title: "API gateway",
      description:
        "Single ingress that handles routing, authentication and request aggregation for the client applications.",
    },
    {
      title: "Async messaging",
      description:
        "Event-driven communication between services so long-running work never blocks the request path.",
    },
    {
      title: "On-chain integration",
      description:
        "Wallet auth and contract calls isolated behind a dedicated service boundary with graceful degradation.",
    },
    {
      title: "Containerised delivery",
      description: "Per-service containers with environment-driven configuration for repeatable deployments.",
    },
  ],
  Sports: [
    {
      title: "Event scheduling",
      description:
        "Calendar of meets, training blocks and sessions with signup states and capacity handling.",
    },
    {
      title: "Member management",
      description: "Squad rosters, profiles and role assignment for coaches, athletes and parents.",
    },
    {
      title: "Results & progress",
      description: "Performance entries tracked over time and rendered as personal-best and trend views.",
    },
    {
      title: "Announcements",
      description: "Club-wide communication surface for schedule changes and competition news.",
    },
    {
      title: "Responsive-first UI",
      description: "Designed for poolside phone use before desktop — large targets, minimal chrome.",
    },
  ],
  "Tech Accessories": [
    {
      title: "Spec-driven catalog",
      description:
        "Products carry structured technical specs that drive comparison tables and filtering rather than free text.",
    },
    {
      title: "Comparison view",
      description: "Side-by-side spec comparison so buyers resolve compatibility questions in-page.",
    },
    {
      title: "Cart & checkout",
      description: "Full purchase path with stock validation and order confirmation.",
    },
    {
      title: "Web3 payment path",
      description: "Optional wallet-based settlement alongside the conventional checkout flow.",
    },
    {
      title: "Component-driven UI",
      description: "Strongly typed, reusable component library keeping the interface consistent at scale.",
    },
  ],
  Backend: [
    {
      title: "RESTful endpoint surface",
      description:
        "Resource-oriented endpoints with consistent verbs, status codes and payload shapes across the API.",
    },
    {
      title: "Interactive documentation",
      description:
        "Swagger/OpenAPI definitions kept in sync with the code so consumers can explore and test live.",
    },
    {
      title: "Authentication & authorization",
      description: "Token-based auth with role checks applied at the endpoint level.",
    },
    {
      title: "Validation & error contract",
      description:
        "Request validation with a single predictable error envelope instead of ad-hoc failure shapes.",
    },
    {
      title: "Data access layer",
      description: "Repository abstraction over the database with paging, filtering and projection support.",
    },
  ],
};

const categoryChallenge: Record<ProjectCategory, string> = {
  Clothing:
    "Apparel catalogs explode combinatorially — every product multiplies into sizes and colours, each with its own stock and imagery. The interface had to stay fast and understandable while that data grew.",
  Beauty:
    "Beauty shoppers buy by concern, shade and routine rather than by SKU, so a conventional grid-and-filter store leaves them stranded between products that look identical in a thumbnail.",
  Jewelry:
    "High-ticket jewelry is a considered purchase: buyers return over several sessions, expect configuration before commitment, and judge the brand almost entirely on presentation quality.",
  Furniture:
    "Configurable, high-value goods combined with wallet-based settlement meant two normally separate flows — product configuration and on-chain transaction — had to feel like one checkout.",
  Dashboard:
    "Operators needed truth about stock right now, not a report from this morning, while still being able to act on it in bulk without losing an audit trail.",
  Web3:
    "A single deployable could not absorb catalog traffic, order processing and chain interaction at the same time without one slow path degrading the others.",
  Sports:
    "Club coordination lived in messaging apps and spreadsheets, so schedules, rosters and results drifted out of sync and nobody trusted a single source.",
  "Tech Accessories":
    "Accessory buying is a compatibility problem. Without structured specifications the customer leaves the site to verify a fit, and often does not come back.",
  Backend:
    "The API had to serve multiple front-end clients with different needs while remaining stable, discoverable and documented enough for another team to integrate without hand-holding.",
};

const categorySolution: Record<ProjectCategory, string> = {
  Clothing:
    "The catalog was normalised into products and variants, filtering moved to memoised client-side state with URL sync, and imagery was served through responsive sources so a large grid still renders quickly on mobile.",
  Beauty:
    "Products were enriched with concern, shade and ingredient metadata, and that metadata drives filtering, recommendations and routine bundling from a single source of truth.",
  Jewelry:
    "Configuration state, wishlist and cart were persisted across sessions, and a dedicated media pipeline delivers large-format photography without blocking interaction.",
  Furniture:
    "Configuration resolves into a concrete SKU before the wallet ever opens, and the on-chain step is isolated behind its own boundary with a conventional payment fallback.",
  Dashboard:
    "A live data layer keeps stock views current, mutations are batched through a single command path, and every change writes an audit record with actor and previous value.",
  Web3:
    "The platform was decomposed into independently deployable services behind an API gateway, with asynchronous messaging for long-running work and containerised delivery per service.",
  Sports:
    "Scheduling, rosters and results were unified behind one model with role-scoped views, so a coach's edit is immediately what every athlete sees.",
  "Tech Accessories":
    "Specifications became structured data instead of description text, which unlocked comparison tables, compatibility filters and cleaner product pages from the same fields.",
  Backend:
    "Clean separation between controllers, services and data access, an OpenAPI contract generated from the code, and a consistent validation and error envelope across every endpoint.",
};

const categoryPlatforms: Record<ProjectCategory, string[]> = {
  Clothing: ["Responsive web", "Mobile web", "Admin console"],
  Beauty: ["Responsive web", "Mobile web"],
  Jewelry: ["Responsive web", "Mobile web"],
  Furniture: ["Responsive web", "Web3 wallet"],
  Dashboard: ["Web app", "Tablet"],
  Web3: ["Web app", "Service APIs", "Web3 wallet"],
  Sports: ["Responsive web", "Mobile web"],
  "Tech Accessories": ["Responsive web", "Web3 wallet"],
  Backend: ["HTTP API", "Swagger UI"],
};

const techNotes: Record<string, string> = {
  React:
    "React with a component-driven structure, memoised derived state and route-level code splitting to keep interaction snappy.",
  Angular:
    "Angular with typed services, dependency injection and lazily loaded feature modules for a predictable large-app structure.",
  "ASP.NET Core":
    "ASP.NET Core hosting the API surface, with layered services, dependency injection and configuration-driven environments.",
  "ASP.NET MVC":
    "ASP.NET MVC rendering server-side views with controllers kept thin and business rules pushed into services.",
  "C#": "C# domain and service layer holding the business rules, validation and mapping logic.",
  MySQL: "MySQL as the relational store, with indexed lookups on the hot query paths.",
  PostgreSQL: "PostgreSQL as the relational store, using constraints and indexes to keep data integrity at the database level.",
  MongoDB: "MongoDB for document-shaped data, letting product and catalog records evolve without rigid migrations.",
  "SQL Server": "SQL Server as the relational backbone, with parameterised access and tuned indexes.",
  Web3: "Web3 wallet connection and contract interaction isolated behind a dedicated module with graceful fallback.",
  Microservices:
    "Microservice topology: independently deployable services, own data per service, gateway-fronted and message-driven.",
  Swagger: "Swagger/OpenAPI generated from the code so documentation cannot drift from the implementation.",
  "RESTful API": "REST conventions for resources, verbs and status codes, with predictable pagination and error shapes.",
};

const typeRole: Record<Project["type"], string> = {
  Team: "Full Stack Engineer (team delivery)",
  Freelance: "Lead Developer (end-to-end)",
  Self: "Solo Engineer & Designer",
};

const typeTeam: Record<Project["type"], string> = {
  Team: "Cross-functional team",
  Freelance: "Solo, direct with client",
  Self: "Solo project",
};

function defaultProcess(project: Project): ProcessStep[] {
  const isApi = project.category === "Backend";
  return [
    {
      phase: "01",
      title: "Discovery & scoping",
      description: project.client
        ? `Requirements gathered directly with ${project.client}, translated into a prioritised scope and a data model sketch before any code.`
        : "Requirements distilled into a prioritised scope, user flows and a data model sketch before any code.",
    },
    {
      phase: "02",
      title: isApi ? "Contract & schema design" : "Architecture & design system",
      description: isApi
        ? "Endpoint contract, request/response shapes and database schema designed first, so clients could integrate against a stable surface early."
        : "Component hierarchy, state boundaries and a token-based visual system defined so screens could be assembled consistently.",
    },
    {
      phase: "03",
      title: "Implementation",
      description: `Built iteratively with ${project.tech.join(", ")}, shipping vertical slices — data, logic and UI together — instead of layer by layer.`,
    },
    {
      phase: "04",
      title: "Hardening & launch",
      description:
        "Edge cases, validation, responsive behaviour and performance passes, followed by deployment and post-launch monitoring.",
    },
  ];
}

function defaultResponsibilities(project: Project): string[] {
  const base = [
    project.category === "Backend"
      ? "Designed the API surface, data model and validation rules end to end."
      : "Owned the front-end architecture, component library and state management.",
    `Implemented the full ${project.tech.join(" + ")} stack for this project.`,
    "Translated design intent into a responsive, accessible interface across breakpoints.",
  ];
  if (project.database) base.push(`Modelled and tuned the ${project.database} schema behind the feature set.`);
  if (project.type === "Team") base.push("Collaborated on shared conventions, code review and integration with parallel workstreams.");
  if (project.type === "Freelance") base.push("Handled client communication, scope decisions, delivery and handover directly.");
  if (project.github) base.push("Maintained the public repository, documentation and commit history.");
  base.push(project.live !== "#" ? "Deployed and verified the production build." : "Packaged the project for local and staged deployment.");
  return base;
}

function defaultHighlights(project: Project): ProjectHighlight[] {
  return [
    { label: "Engagement", value: project.type, hint: typeTeam[project.type] },
    { label: "Category", value: project.category, hint: "Domain focus" },
    {
      label: "Stack depth",
      value: `${project.tech.length} core ${project.tech.length === 1 ? "technology" : "technologies"}`,
      hint: project.tech.join(" · "),
    },
    {
      label: "Data layer",
      value: project.database ?? "Client-side state",
      hint: project.database ? "Persistent store" : "No external database",
    },
  ];
}

function defaultOutcomes(project: Project): string[] {
  const out: string[] = [];
  out.push(
    project.live !== "#"
      ? "Shipped to production and publicly reachable at the live URL."
      : "Delivered as a complete, runnable codebase ready for deployment."
  );
  out.push("Responsive from small mobile screens through large desktop layouts.");
  out.push(
    project.category === "Backend"
      ? "Documented endpoints that other teams could integrate against without direct support."
      : "Interface patterns reusable across the rest of the product surface."
  );
  if (project.status) out.push(`Current project status: ${project.status}.`);
  return out;
}

/* ------------------------------------------------------------------ */
/* Per-project authored content                                        */
/* ------------------------------------------------------------------ */

const detailOverrides: Record<string, Override> = {
  "town-team": {
    tagline: "A clothing storefront built around teams, not just carts.",
    overview: [
      "Town Team is a clothing e-commerce platform where the buying unit is a group rather than an individual. Squads, clubs and small organisations assemble a shared order, agree on sizing and check out together.",
      "That shifted the whole data model: carts belong to a team, stock has to be reserved across several contributors, and the admin side needs visibility into an order that several people touched.",
    ],
    challenge:
      "A conventional cart assumes one shopper. Here several people add items to the same order at different times, which breaks naive stock handling and makes order state ambiguous.",
    solution:
      "The cart was modelled as a shared, persistent entity with per-member line attribution, and inventory checks were moved to the moment of checkout so concurrent editing never oversells a size.",
  },
  "under-armour": {
    tagline: "A full athletic-apparel storefront backed by a relational catalog.",
    overview: [
      "A complete e-commerce build for athletic apparel: catalog browsing, product detail, cart, checkout and order handling, sitting on a MySQL-backed product and inventory model.",
      "The emphasis was on making a large, variant-heavy catalog feel light — fast filtering, predictable navigation and imagery that does not stall the first render.",
    ],
    challenge:
      "Sportswear catalogs carry deep size and colour matrices per product; rendering and filtering that naively makes listing pages sluggish exactly where browsing happens most.",
    solution:
      "Normalised product/variant tables in MySQL, indexed the filter columns, and kept the browsing experience on memoised client state so filter changes never round-trip unnecessarily.",
  },
  "ohanna-landing": {
    tagline: "A dark-aesthetic fashion landing experience with a real backend behind it.",
    overview: [
      "A conversion-focused landing page for a fashion brand, built around a dark editorial aesthetic, large typography and a curated product showcase.",
      "Although presented as a landing page, it is backed by PostgreSQL so featured products, collections and lead capture are real data rather than hard-coded markup.",
    ],
    challenge:
      "Marketing pages usually get built as static markup and then rot the moment the brand wants to change a drop or a hero product.",
    solution:
      "Content surfaces were driven from PostgreSQL records, so the brand can change featured products and copy without a redeploy of hand-edited HTML.",
  },
  "lumina-beauty": {
    tagline: "Cosmetics commerce driven by concern, shade and routine.",
    overview: [
      "Lumina Beauty is a cosmetics storefront where discovery is organised around what the customer is trying to solve rather than around SKUs.",
      "Filtering, recommendations and routine bundling all read from the same enriched product metadata, which keeps suggestions consistent everywhere they appear.",
    ],
  },
  "little-boys": {
    tagline: "A children's clothing store designed for the parent doing the buying.",
    overview: [
      "A specialised kidswear store with age and size guidance built into the browsing flow, because the person shopping is rarely the person wearing the clothes.",
      "The interface trades density for clarity: fewer options per screen, explicit size guidance and a checkout that can be completed one-handed on a phone.",
    ],
    challenge:
      "Children's sizing is the primary source of returns and hesitation, and generic size charts buried in a tab do not fix it.",
    solution:
      "Size guidance was surfaced inline at the point of selection, with age-to-measurement mapping shown next to the variant picker rather than hidden behind a modal.",
  },
  "clothing-shop": {
    tagline: "A full-stack clothing store with accounts and order management.",
    overview: [
      "An end-to-end clothing e-commerce application covering authentication, catalog, cart, checkout and order history, backed by PostgreSQL.",
      "Where most storefront builds stop at checkout, this one continues into the account area and the operational side of orders.",
    ],
  },
  lumina: {
    tagline: "A multi-vendor beauty marketplace with reviews at its centre.",
    overview: [
      "Lumina extends a beauty storefront into a marketplace: multiple vendors list products, and customer reviews feed back into ranking and discovery.",
      "The vendor dimension touches everything — product ownership, order routing and the trust signals shown on every card.",
    ],
    challenge:
      "Marketplaces live or die on trust. Without review aggregation and clear vendor attribution, buyers cannot tell a good listing from a bad one.",
    solution:
      "Vendor identity and verified review scores were promoted into the core product model, so trust signals render consistently on cards, listings and detail pages.",
  },
  "linea-jewelry": {
    tagline: "Premium jewelry retail with configuration and saved intent.",
    overview: [
      "Linea is a premium jewelry storefront built for a considered purchase: configure the piece, save it, come back, and complete the order later.",
      "Presentation quality is functional here — the media and layout work exist because the product's perceived value depends on them.",
    ],
    outcomes: [
      "Completed and deployed to production.",
      "Configuration and wishlist state survive across sessions and devices.",
      "Large-format imagery delivered responsively without blocking first paint.",
    ],
  },
  "vingo-roll": {
    tagline: "A furniture marketplace where settlement happens on-chain.",
    overview: [
      "Vingo Roll pairs a conventional furniture marketplace with Web3 settlement and NFT-backed ownership records for listed pieces.",
      "The design goal was that the blockchain layer stays invisible until it is needed: browse, configure and cart behave normally, and the wallet only appears at settlement.",
    ],
  },
  "e-inventory": {
    tagline: "An operations dashboard for stock that changes while you watch it.",
    overview: [
      "E-Inventory is an administrative dashboard for inventory operations: live stock levels, movement history, reorder signals and analytics in one authenticated workspace.",
      "It was built for daily operator use rather than occasional reporting, so the interaction cost of the common actions was the main design constraint.",
    ],
    outcomes: [
      "Completed and deployed with an authenticated operator login.",
      "Stock views reflect current state rather than a cached report.",
      "Bulk actions cut repetitive catalog maintenance to a fraction of the clicks.",
    ],
  },
  velocity: {
    tagline: "A club platform that keeps swimmers, coaches and parents in sync.",
    overview: [
      "Velocity Swimming is a community platform for swim teams: event scheduling, member management, results and announcements in one place.",
      "It replaces the usual spread of group chats and spreadsheets with a single roster and calendar that everyone reads from.",
    ],
  },
  luxelle: {
    tagline: "An Angular-built luxury beauty landing experience.",
    overview: [
      "Luxelle is a premium beauty landing page built on Angular, with Web3 capability layered in for wallet-based interactions.",
      "Angular's module and service structure kept the animation-heavy presentation layer cleanly separated from the data and integration code.",
    ],
  },
  "zyro-electric": {
    tagline: "Tech accessory commerce built on structured specifications.",
    overview: [
      "Zyro Electric is an Angular storefront for tech accessories, where every product carries structured specs that drive filtering and comparison.",
      "Web3 payment support sits alongside the standard checkout rather than replacing it.",
    ],
  },
  "shop-microservices": {
    tagline: "An e-commerce platform decomposed into independent services.",
    overview: [
      "Shop Microservices is an e-commerce backend split into independently deployable services — catalog, orders, identity and payments — fronted by an API gateway.",
      "Web3 integration lives in its own service boundary so chain latency and failures cannot degrade catalog or order traffic.",
    ],
    outcomes: [
      "Services deploy and scale independently of one another.",
      "Chain interaction is isolated, so a slow RPC never blocks browsing or checkout.",
      "Source is public, documented and readable as a reference architecture.",
    ],
  },
  "inventory-microservices": {
    tagline: "Inventory management rebuilt as a distributed system.",
    overview: [
      "Inventory Microservices applies a service-per-capability topology to stock management: tracking, movements, analytics and integration each own their data and deployment.",
      "Asynchronous messaging carries stock events between services, so reporting never contends with the write path.",
    ],
  },
  "market-api": {
    tagline: "A documented REST API for marketplace operations.",
    overview: [
      "Market API is the backend for marketplace operations, built on ASP.NET Core with MongoDB and a full Swagger surface.",
      "Document storage suited a catalog whose shape differs per vendor category, and the OpenAPI contract meant client teams could integrate without a meeting.",
    ],
    highlights: [
      { label: "Client", value: "Erra Soft", hint: "Freelance engagement" },
      { label: "Runtime", value: "ASP.NET Core", hint: "Layered service architecture" },
      { label: "Store", value: "MongoDB", hint: "Document-oriented catalog" },
      { label: "Contract", value: "Swagger / OpenAPI", hint: "Generated from code" },
    ],
  },
  "e-commerce-api": {
    tagline: "A full e-commerce backend with a stable, documented contract.",
    overview: [
      "E-Commerce API covers the complete commerce backend — catalog, cart, orders, customers and auth — on ASP.NET Core with SQL Server.",
      "Relational storage was the right call here: orders, line items and inventory are highly relational and benefit from transactional guarantees.",
    ],
    highlights: [
      { label: "Client", value: "We3ds", hint: "Freelance engagement" },
      { label: "Runtime", value: "ASP.NET Core", hint: "Layered service architecture" },
      { label: "Store", value: "SQL Server", hint: "Transactional relational data" },
      { label: "Contract", value: "Swagger / OpenAPI", hint: "Full endpoint coverage" },
    ],
  },
  "marketing-mvc": {
    tagline: "A server-rendered marketing platform with real business logic.",
    overview: [
      "Marketing MVC is a full-stack ASP.NET MVC application backed by SQL Server, combining a modern interface with substantial business rules behind it.",
      "Server-side rendering kept the pages fast and indexable, while the service layer carried campaign and reporting logic.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */

export function getProjectDetail(project: Project): ProjectDetailContent {
  const override = detailOverrides[project.id] ?? {};

  const architecture = project.tech
    .map((tech) => techNotes[tech])
    .filter((note): note is string => Boolean(note));

  if (project.database && !project.tech.includes(project.database)) {
    const dbNote = techNotes[project.database];
    if (dbNote) architecture.push(dbNote);
  }

  return {
    tagline: override.tagline ?? project.description,
    overview: override.overview ?? [
      project.description,
      `Built as a ${project.type.toLowerCase()} engagement in the ${project.category.toLowerCase()} space, using ${project.tech.join(", ")}${
        project.database ? ` on top of ${project.database}` : ""
      }.`,
    ],
    challenge: override.challenge ?? categoryChallenge[project.category],
    solution: override.solution ?? categorySolution[project.category],
    features: override.features ?? categoryFeatures[project.category],
    highlights: override.highlights ?? defaultHighlights(project),
    responsibilities: override.responsibilities ?? defaultResponsibilities(project),
    architecture: override.architecture ?? architecture,
    process: override.process ?? defaultProcess(project),
    outcomes: override.outcomes ?? defaultOutcomes(project),
    role: override.role ?? typeRole[project.type],
    timeline: override.timeline ?? (project.status === "In Progress" ? "Ongoing" : "Delivered"),
    teamSize: override.teamSize ?? typeTeam[project.type],
    platforms: override.platforms ?? categoryPlatforms[project.category],
  };
}

/** Projects in the same category, excluding the current one. */
export function getRelatedProjects(project: Project, all: Project[], limit = 3): Project[] {
  const sameCategory = all.filter((p) => p.id !== project.id && p.category === project.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const sharesTech = all.filter(
    (p) =>
      p.id !== project.id &&
      p.category !== project.category &&
      p.tech.some((t) => project.tech.includes(t))
  );
  return [...sameCategory, ...sharesTech].slice(0, limit);
}
