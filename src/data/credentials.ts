/**
 * Credentials data: experience, platforms, education and certifications.
 *
 * Every record is bilingual (en/ar) so the section renders fully in both
 * languages without extra i18n keys.
 */

export type CredentialTab = "work" | "projects" | "education" | "certifications";

export interface Bilingual {
  en: string;
  ar: string;
}

export interface BilingualList {
  en: string[];
  ar: string[];
}

export interface CredentialItem {
  id: string;
  tab: CredentialTab;
  year: string;
  period: Bilingual;
  title: Bilingual;
  org: Bilingual;
  location: Bilingual;
  summary: Bilingual;
  highlights: BilingualList;
  stack: string[];
  credentialId?: string;
  status?: Bilingual;
  featured?: boolean;
  url?: string;
}

export const credentials: CredentialItem[] = [
  // ---------------------------------------------------------------- work
  {
    id: "we3ds",
    tab: "work",
    year: "2024",
    period: { en: "Jul 2024 — Present", ar: "يوليو 2024 — حتى الآن" },
    title: { en: "Senior Software Developer", ar: "مطوّر برمجيات أول" },
    org: { en: "WE3DS Company", ar: "شركة WE3DS" },
    location: { en: "Tanta, Egypt · On-site", ar: "طنطا، مصر · من المقر" },
    summary: {
      en: "Owning backend architecture for enterprise marketplace and IoT products built on .NET 8.",
      ar: "مسؤول عن معمارية الواجهة الخلفية لمنتجات الأسواق المؤسسية وإنترنت الأشياء على .NET 8.",
    },
    highlights: {
      en: [
        "Designed .NET 8 microservices with Clean Architecture, DDD, CQRS and MediatR.",
        "Delivered multi-tenant data isolation with hierarchical role-based access control.",
        "Streamed real-time telemetry for 1000+ IoT endpoints over SignalR.",
        "Cut query time by ~300% with SQL tuning, indexing and Redis distributed caching.",
        "Automated Azure DevOps CI/CD pipelines and containerized services with Docker.",
      ],
      ar: [
        "تصميم خدمات مصغّرة على .NET 8 باستخدام Clean Architecture وDDD وCQRS وMediatR.",
        "تنفيذ عزل بيانات متعدد المستأجرين مع صلاحيات هرمية قائمة على الأدوار.",
        "بث بيانات لحظية لأكثر من 1000 نقطة إنترنت أشياء عبر SignalR.",
        "خفض زمن الاستعلامات بنحو 300% عبر تحسين SQL والفهرسة وتخزين Redis.",
        "أتمتة خطوط CI/CD على Azure DevOps وحوسبة الخدمات في حاويات Docker.",
      ],
    },
    stack: [".NET 8", "Microservices", "SignalR", "SQL Server", "Redis", "Azure DevOps"],
    featured: true,
  },
  {
    id: "freelance",
    tab: "work",
    year: "2023",
    period: { en: "Nov 2023 — Jul 2024", ar: "نوفمبر 2023 — يوليو 2024" },
    title: { en: "Full Stack Developer (Freelance)", ar: "مطوّر متكامل (عمل حر)" },
    org: { en: "Self-Employed", ar: "عمل حر" },
    location: { en: "Cairo, Egypt · Remote", ar: "القاهرة، مصر · عن بُعد" },
    summary: {
      en: "Shipped end-to-end commerce products for clients across Egypt and the Gulf.",
      ar: "تسليم منتجات تجارة إلكترونية متكاملة لعملاء في مصر والخليج.",
    },
    highlights: {
      en: [
        "Built SEO-friendly storefronts with Next.js, React and Tailwind CSS.",
        "Implemented .NET Core APIs following clean architecture and repository patterns.",
        "Integrated payment, authentication and mapping third-party REST APIs.",
        "Migrated legacy services into Docker containers ready for cloud hosting.",
      ],
      ar: [
        "بناء واجهات متاجر صديقة لمحركات البحث بـ Next.js وReact وTailwind CSS.",
        "تنفيذ واجهات برمجية على .NET Core وفق المعمارية النظيفة ونمط المستودع.",
        "دمج واجهات خارجية للمدفوعات والمصادقة والخرائط.",
        "نقل الخدمات القديمة إلى حاويات Docker جاهزة للاستضافة السحابية.",
      ],
    },
    stack: ["Next.js", "React", ".NET Core", "PostgreSQL", "Docker", "Stripe"],
  },

  // ------------------------------------------------------------ platforms
  {
    id: "platform",
    tab: "projects",
    year: "2025",
    period: { en: "2024 — 2025", ar: "2024 — 2025" },
    title: { en: "Multi-Tenant Marketplace Platform", ar: "منصة أسواق متعددة المستأجرين" },
    org: { en: "WE3DS · Enterprise", ar: "WE3DS · قطاع المؤسسات" },
    location: { en: "Production workload", ar: "بيئة إنتاج" },
    summary: {
      en: "Marketplace core serving isolated tenants with shared services and per-tenant billing.",
      ar: "نواة سوق تخدم مستأجرين معزولين بخدمات مشتركة وفوترة لكل مستأجر.",
    },
    highlights: {
      en: [
        "Tenant-aware persistence layer with row-level isolation and audit trails.",
        "Redis caching layer plus tuned indexes for ~300% faster catalog queries.",
        "Modular service boundaries allowing independent deployment per domain.",
      ],
      ar: [
        "طبقة تخزين مدركة للمستأجر مع عزل على مستوى الصفوف وسجلات تدقيق.",
        "طبقة تخزين مؤقت Redis مع فهارس محسّنة لاستعلامات أسرع بنحو 300%.",
        "حدود خدمات معيارية تسمح بنشر مستقل لكل مجال.",
      ],
    },
    stack: ["ASP.NET Core", "EF Core", "Redis", "RBAC", "SQL Server"],
    featured: true,
  },
  {
    id: "iot",
    tab: "projects",
    year: "2024",
    period: { en: "2024", ar: "2024" },
    title: { en: "Real-Time IoT Telemetry Layer", ar: "طبقة قياس لحظي لإنترنت الأشياء" },
    org: { en: "WE3DS", ar: "WE3DS" },
    location: { en: "Production workload", ar: "بيئة إنتاج" },
    summary: {
      en: "High-throughput ingestion and live dashboards for more than 1000 connected devices.",
      ar: "استقبال عالي الإنتاجية ولوحات حيّة لأكثر من 1000 جهاز متصل.",
    },
    highlights: {
      en: [
        "SignalR hubs with backpressure handling and reconnect strategies.",
        "Device provisioning, health checks and alerting rules.",
        "Time-series storage optimized for rolling aggregate queries.",
      ],
      ar: [
        "مراكز SignalR مع معالجة ضغط البيانات واستراتيجيات إعادة الاتصال.",
        "تهيئة الأجهزة وفحوص الحالة وقواعد التنبيه.",
        "تخزين سلاسل زمنية محسّن لاستعلامات التجميع المتحركة.",
      ],
    },
    stack: ["SignalR", "WebSocket", "Kafka", "Background Workers"],
  },
  {
    id: "devops",
    tab: "projects",
    year: "2024",
    period: { en: "2024", ar: "2024" },
    title: { en: "CI/CD Automation Pipeline", ar: "خط أتمتة CI/CD" },
    org: { en: "Azure DevOps · Docker", ar: "Azure DevOps · Docker" },
    location: { en: "Internal platform", ar: "منصة داخلية" },
    summary: {
      en: "Repeatable build, test and release cycles for every microservice in the estate.",
      ar: "دورات بناء واختبار وإصدار قابلة للتكرار لكل خدمة مصغّرة.",
    },
    highlights: {
      en: [
        "Multi-stage Docker builds with cached layers and image scanning.",
        "Automated unit and integration test gates before promotion.",
        "Environment-based release approvals across dev, staging and production.",
      ],
      ar: [
        "بناء Docker متعدد المراحل مع طبقات مخزّنة وفحص للصور.",
        "بوابات اختبارات وحدة وتكامل آلية قبل الترقية.",
        "موافقات إصدار حسب البيئة عبر التطوير والتجريب والإنتاج.",
      ],
    },
    stack: ["Azure DevOps", "Docker", "Kubernetes", "TFS", "Git"],
  },

  // ------------------------------------------------------------ education
  {
    id: "degree",
    tab: "education",
    year: "2021",
    period: { en: "2017 — 2021", ar: "2017 — 2021" },
    title: { en: "B.Sc. Computer Science", ar: "بكالوريوس علوم الحاسب" },
    org: { en: "Higher Technological Institute (HTI)", ar: "المعهد التكنولوجي العالي (HTI)" },
    location: { en: "Egypt · Full-time", ar: "مصر · دراسة كاملة" },
    summary: {
      en: "Software engineering foundation with a focus on data structures, databases and systems.",
      ar: "أساس في هندسة البرمجيات مع تركيز على هياكل البيانات وقواعد البيانات والأنظمة.",
    },
    highlights: {
      en: [
        "Core coursework: algorithms, operating systems, networks, software engineering.",
        "Graduation project: web-based inventory and ordering system.",
        "Database specialization with SQL Server and normalization practice.",
      ],
      ar: [
        "مقررات أساسية: الخوارزميات وأنظمة التشغيل والشبكات وهندسة البرمجيات.",
        "مشروع التخرج: نظام مخزون وطلبات عبر الويب.",
        "تخصص في قواعد البيانات مع SQL Server وتطبيق التطبيع.",
      ],
    },
    stack: ["Algorithms", "Databases", "OOP", "Networks"],
    featured: true,
  },
  {
    id: "arch",
    tab: "education",
    year: "2022",
    period: { en: "2022 — Present", ar: "2022 — حتى الآن" },
    title: { en: "Clean Architecture & DDD Practice", ar: "تطبيق Clean Architecture وDDD" },
    org: { en: "Self-Study · Applied at work", ar: "تعلّم ذاتي · مطبّق في العمل" },
    location: { en: "Continuous learning", ar: "تعلّم مستمر" },
    summary: {
      en: "Structured self-study track turned into production patterns used daily.",
      ar: "مسار تعلّم ذاتي منظّم تحوّل إلى أنماط إنتاجية مستخدمة يوميًا.",
    },
    highlights: {
      en: [
        "CQRS with MediatR, validation pipelines and domain events.",
        "Test-driven development with xUnit, Moq and integration fixtures.",
        "Refactoring legacy layered code toward bounded contexts.",
      ],
      ar: [
        "CQRS مع MediatR وخطوط التحقق وأحداث المجال.",
        "التطوير الموجّه بالاختبارات باستخدام xUnit وMoq وتجهيزات التكامل.",
        "إعادة هيكلة الكود الطبقي القديم نحو سياقات محدودة.",
      ],
    },
    stack: ["CQRS", "MediatR", "xUnit", "DDD"],
  },

  // ------------------------------------------------------- certifications
  {
    id: "cert-dotnet",
    tab: "certifications",
    year: "2024",
    period: { en: "Issued 2024 · No expiry", ar: "صدرت 2024 · بدون انتهاء" },
    title: { en: "Building Microservices with .NET", ar: "بناء الخدمات المصغّرة باستخدام .NET" },
    org: { en: "Microsoft Learn", ar: "Microsoft Learn" },
    location: { en: "Online · Verified", ar: "عبر الإنترنت · موثّقة" },
    summary: {
      en: "Service decomposition, resiliency patterns and containerized deployment on .NET.",
      ar: "تفكيك الخدمات وأنماط المرونة والنشر في حاويات على .NET.",
    },
    highlights: {
      en: [
        "Service-to-service communication with gRPC and message brokers.",
        "Resilience with retries, circuit breakers and health probes.",
        "Observability: structured logging, metrics and distributed tracing.",
      ],
      ar: [
        "الاتصال بين الخدمات عبر gRPC ووسطاء الرسائل.",
        "المرونة عبر إعادة المحاولة وقواطع الدائرة وفحوص الحالة.",
        "المراقبة: السجلات المنظمة والمقاييس والتتبع الموزّع.",
      ],
    },
    stack: [".NET", "gRPC", "Docker", "Observability"],
    credentialId: "MS-LEARN-MSVC-2024",
    status: { en: "Active", ar: "سارية" },
    featured: true,
  },
  {
    id: "cert-azure",
    tab: "certifications",
    year: "2024",
    period: { en: "Issued 2024 · No expiry", ar: "صدرت 2024 · بدون انتهاء" },
    title: { en: "Azure DevOps Pipelines Fundamentals", ar: "أساسيات خطوط Azure DevOps" },
    org: { en: "Microsoft", ar: "مايكروسوفت" },
    location: { en: "Online · Verified", ar: "عبر الإنترنت · موثّقة" },
    summary: {
      en: "End-to-end delivery pipelines, artifacts and environment approvals.",
      ar: "خطوط تسليم متكاملة وإدارة المخرجات وموافقات البيئات.",
    },
    highlights: {
      en: [
        "YAML pipelines with reusable templates and variable groups.",
        "Artifact feeds, release gates and rollback strategies.",
        "Secure secret handling through service connections.",
      ],
      ar: [
        "خطوط YAML مع قوالب قابلة لإعادة الاستخدام ومجموعات متغيرات.",
        "مستودعات المخرجات وبوابات الإصدار واستراتيجيات التراجع.",
        "إدارة آمنة للأسرار عبر اتصالات الخدمة.",
      ],
    },
    stack: ["Azure DevOps", "YAML", "CI/CD"],
    credentialId: "MS-ADO-PIPE-2024",
    status: { en: "Active", ar: "سارية" },
  },
  {
    id: "cert-sql",
    tab: "certifications",
    year: "2023",
    period: { en: "Issued 2023 · No expiry", ar: "صدرت 2023 · بدون انتهاء" },
    title: { en: "Advanced SQL Server Performance Tuning", ar: "تحسين أداء SQL Server المتقدم" },
    org: { en: "Udemy", ar: "Udemy" },
    location: { en: "Online · Certificate of completion", ar: "عبر الإنترنت · شهادة إتمام" },
    summary: {
      en: "Execution plans, indexing strategy and query rewriting for large datasets.",
      ar: "خطط التنفيذ واستراتيجية الفهرسة وإعادة كتابة الاستعلامات للبيانات الضخمة.",
    },
    highlights: {
      en: [
        "Reading execution plans and eliminating scans and key lookups.",
        "Covering, filtered and columnstore index design.",
        "Deadlock analysis and isolation-level tradeoffs.",
      ],
      ar: [
        "قراءة خطط التنفيذ وإزالة المسح الكامل وعمليات البحث بالمفتاح.",
        "تصميم الفهارس المغطّية والمصفّاة وColumnstore.",
        "تحليل التزاحم والمفاضلة بين مستويات العزل.",
      ],
    },
    stack: ["SQL Server", "Indexing", "Query Tuning"],
    credentialId: "UC-SQLPERF-2023",
    status: { en: "Active", ar: "سارية" },
  },
  {
    id: "cert-react",
    tab: "certifications",
    year: "2023",
    period: { en: "Issued 2023 · No expiry", ar: "صدرت 2023 · بدون انتهاء" },
    title: { en: "Advanced React & Next.js", ar: "React وNext.js المتقدم" },
    org: { en: "Meta / Coursera", ar: "ميتا / Coursera" },
    location: { en: "Online · Verified", ar: "عبر الإنترنت · موثّقة" },
    summary: {
      en: "Component architecture, rendering strategies and performance profiling.",
      ar: "معمارية المكونات واستراتيجيات العرض وقياس الأداء.",
    },
    highlights: {
      en: [
        "SSR, SSG and streaming rendering tradeoffs.",
        "State management patterns and data-fetching caches.",
        "Accessibility and Core Web Vitals optimization.",
      ],
      ar: [
        "المفاضلة بين العرض من الخادم والتوليد المسبق والبث.",
        "أنماط إدارة الحالة وذاكرات جلب البيانات.",
        "إتاحة الوصول وتحسين مؤشرات الأداء الأساسية.",
      ],
    },
    stack: ["React", "Next.js", "TypeScript", "Web Vitals"],
    credentialId: "META-REACT-2023",
    status: { en: "Active", ar: "سارية" },
  },
  {
    id: "cert-docker",
    tab: "certifications",
    year: "2023",
    period: { en: "Issued 2023 · No expiry", ar: "صدرت 2023 · بدون انتهاء" },
    title: { en: "Docker & Kubernetes for Developers", ar: "Docker وKubernetes للمطورين" },
    org: { en: "Udemy", ar: "Udemy" },
    location: { en: "Online · Certificate of completion", ar: "عبر الإنترنت · شهادة إتمام" },
    summary: {
      en: "Containerizing services and orchestrating them with Kubernetes workloads.",
      ar: "تشغيل الخدمات في حاويات وتنسيقها عبر أحمال Kubernetes.",
    },
    highlights: {
      en: [
        "Multi-stage images, volumes and compose-based local stacks.",
        "Deployments, services, config maps and secrets.",
        "Horizontal scaling and rolling updates.",
      ],
      ar: [
        "صور متعددة المراحل ووحدات تخزين وبيئات محلية عبر Compose.",
        "عمليات النشر والخدمات وخرائط الإعداد والأسرار.",
        "التوسع الأفقي والتحديثات التدريجية.",
      ],
    },
    stack: ["Docker", "Kubernetes", "Helm"],
    credentialId: "UC-DOCKK8S-2023",
    status: { en: "Active", ar: "سارية" },
  },
  {
    id: "cert-english",
    tab: "certifications",
    year: "2022",
    period: { en: "Issued 2022", ar: "صدرت 2022" },
    title: { en: "Professional English for Tech Teams", ar: "الإنجليزية المهنية لفرق التقنية" },
    org: { en: "British Council", ar: "المجلس الثقافي البريطاني" },
    location: { en: "Egypt · B2 Upper-Intermediate", ar: "مصر · مستوى B2" },
    summary: {
      en: "Technical writing and client communication for distributed engineering teams.",
      ar: "الكتابة التقنية والتواصل مع العملاء لفرق هندسية موزّعة.",
    },
    highlights: {
      en: [
        "Documentation, specs and code-review communication.",
        "Client-facing presentations and requirement gathering.",
      ],
      ar: ["التوثيق والمواصفات والتواصل في مراجعات الكود.", "العروض للعملاء وجمع المتطلبات."],
    },
    stack: ["Technical Writing", "Communication"],
    credentialId: "BC-ENG-B2-2022",
    status: { en: "Active", ar: "سارية" },
  },
];

export const credentialTabs: CredentialTab[] = ["work", "projects", "education", "certifications"];
