import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

const t: Dict = {
  "nav.works": { en: "WORKS", ar: "الأعمال" },
  "works.title": { en: "Selected Work", ar: "أعمال مختارة" },
  "projects.index.results": { en: "Project results", ar: "نتائج المشاريع" },
  "nav.about": { en: "ABOUT", ar: "نبذة" },
  "nav.experience": { en: "AWARDS", ar: "الجوائز" },
  "nav.contact": { en: "CONTACTS", ar: "تواصل" },

  "hero.eyebrow": {
    en: "SENIOR FULL STACK ENGINEER",
    ar: "مهندس متكامل أول",
  },
  "hero.name.first": { en: "MOSTAFA", ar: "مصطفى" },
  "hero.name.last": { en: "SAMIR", ar: "سمير" },
  "hero.subtitle": {
    en: "Senior Full Stack Engineer with 4+ years specializing in high-performance .NET 8 Microservices & React.js / Angular platforms.",
    ar: "مهندس متكامل أول بخبرة تزيد عن 4 سنوات، متخصص في الخدمات المصغرة عالية الأداء باستخدام .NET 8 وواجهات React.js و Angular.",
  },
  "hero.cta": { en: "VIEW MY WORK", ar: "شاهد أعمالي" },
  "hero.cv": { en: "DOWNLOAD CV", ar: "تحميل السيرة" },

  "about.preview.title1": { en: "4+ Years of", ar: "4+ سنوات من" },
  "about.preview.title2": { en: "Full Stack Excellence", ar: "التميز التقني" },
  "about.preview.desc": {
    en: "Senior Full Stack Engineer specializing in scaling marketplace throughput by 300% using .NET 8, Clean Architecture & Next.js.",
    ar: "مهندس متكامل أول متخصص في زيادة سعة المنصات بنسبة 300% باستخدام .NET 8 و Clean Architecture و Next.js.",
  },
  "about.preview.cta": { en: "VIEW CASE", ar: "عرض الحالة" },

  "projects.preview.view": { en: "VIEW PROJECT", ar: "عرض المشروع" },

  "experience.preview.title": { en: "Awards & Recognition", ar: "الجوائز والتكريمات" },
  "experience.preview.cta": { en: "VIEW ALL AWARDS", ar: "عرض جميع الجوائز" },
  "experience.preview.selected": { en: "SELECTED WORKS", ar: "أعمال مختارة" },

  "projects.index.eyebrow": { en: "PORTFOLIO & CASE STUDIES", ar: "أعمال ودراسات حالة" },
  "projects.index.showing": { en: "Showing", ar: "عرض" },
  "projects.index.projectsWord": { en: "projects", ar: "مشروع" },
  "projects.index.page": { en: "page", ar: "صفحة" },
  "projects.card.details": { en: "View details", ar: "عرض التفاصيل" },
  "projects.index.title": { en: "All Projects", ar: "جميع المشاريع" },
  "projects.index.desc": {
    en: "Marketplaces, .NET 8 microservices, real-time dashboards, and multi-tenant architectures.",
    ar: "أسواق رقمية، خدمات مصغرة بـ .NET 8، لوحات تحكم لحظية، وهياكل متعددة المستأجرين.",
  },
  "projects.index.search": { en: "Search projects", ar: "البحث في المشاريع" },
  "projects.index.searchPlaceholder": {
    en: "Search by name, tech, client...",
    ar: "ابحث بالاسم، التقنية، العميل...",
  },
  "projects.index.clear": { en: "Clear search", ar: "مسح البحث" },
  "projects.index.sort": { en: "Sort projects", ar: "فرز المشاريع" },
  "projects.index.featured": { en: "Featured", ar: "مميز" },
  "projects.index.newest": { en: "Newest", ar: "الأحدث" },
  "projects.index.oldest": { en: "Oldest", ar: "الأقدم" },
  "projects.index.grid": { en: "Grid view", ar: "عرض شبكي" },
  "projects.index.list": { en: "List view", ar: "عرض قائمة" },

  "project.detail.back": { en: "Back to all projects", ar: "العودة لجميع المشاريع" },
  "project.detail.arch": { en: "Architecture & Tech", ar: "المعمارية والتقنيات" },
  "project.detail.brief": { en: "Project Brief", ar: "ملخص المشروع" },
  "project.detail.client": { en: "Client", ar: "العميل" },
  "project.detail.db": { en: "Database Engine", ar: "قاعدة البيانات" },
  "project.detail.status": { en: "Launch Status", ar: "حالة الإطلاق" },
  "project.detail.status.live": { en: "Live in Production", ar: "يعمل في الإنتاج" },
  "project.detail.status.local": { en: "Archived / Local", ar: "مؤرشف / محلي" },
  "project.detail.visit": { en: "Visit Live Site", ar: "زيارة الموقع الحي" },
  "project.detail.source": { en: "View Source Code", ar: "عرض الشفرة المصدرية" },
  "project.detail.continue": { en: "Continue Exploring", ar: "واصل الاستكشاف" },
  "project.detail.prev": { en: "PREVIOUS PROJECT", ar: "المشروع السابق" },
  "project.detail.next": { en: "NEXT PROJECT", ar: "المشروع التالي" },
  "project.detail.overview": { en: "Project Overview", ar: "نظرة عامة على المشروع" },
  "project.detail.challenge": { en: "The Challenge", ar: "التحدي" },
  "project.detail.solution": { en: "The Approach", ar: "المنهجية" },
  "project.detail.features": { en: "Core Features", ar: "أهم المزايا" },
  "project.detail.responsibilities": { en: "My Role & Contributions", ar: "دوري ومساهماتي" },
  "project.detail.process": { en: "Delivery Process", ar: "مراحل التنفيذ" },
  "project.detail.outcomes": { en: "Results & Outcomes", ar: "النتائج" },
  "project.detail.related": { en: "Related Projects", ar: "مشاريع مشابهة" },
  "project.detail.role": { en: "Role", ar: "الدور" },
  "project.detail.team": { en: "Team", ar: "الفريق" },
  "project.detail.timeline": { en: "Delivery", ar: "التسليم" },
  "project.detail.platforms": { en: "Platforms", ar: "المنصات" },
  "project.detail.stackNotes": { en: "Engineering Notes", ar: "ملاحظات هندسية" },
  "project.detail.atAGlance": { en: "At a Glance", ar: "لمحة سريعة" },

  "project.notFound.title": { en: "Project Not Found", ar: "المشروع غير موجود" },
  "project.notFound.back": { en: "Back to Projects", ar: "العودة للمشاريع" },

  "contact.title": { en: "Let's Build Something", ar: "لنبنِ شيئاً معاً" },
  "contact.subtitle": {
    en: "Have a marketplace idea or a system that needs to scale? Drop a line.",
    ar: "لديك فكرة سوق رقمي أو نظام يحتاج للتوسّع؟ راسلني.",
  },
  "contact.name": { en: "Name", ar: "الاسم" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.message": { en: "Message", ar: "الرسالة" },
  "contact.send": { en: "Send Message", ar: "إرسال الرسالة" },
  "contact.success": {
    en: "Email draft opened — send it from your email app.",
    ar: "تم فتح مسودة البريد — أرسلها من تطبيق البريد.",
  },

  "welcome.eyebrow": { en: "Welcome aboard", ar: "أهلاً بك" },
  "welcome.title": {
    en: "Great systems start with one conversation.",
    ar: "الأنظمة العظيمة تبدأ بمحادثة واحدة.",
  },
  "welcome.body": {
    en: "You've spent a minute here — so let me be direct. I design marketplace platforms that stay fast under real traffic, real vendors and real money: .NET 8 microservices, tuned databases and architecture that survives growth instead of collapsing under it.",
    ar: "قضيت دقيقة هنا — فدعني أكون مباشراً. أصمم منصات تجارة إلكترونية تبقى سريعة تحت ضغط حقيقي من الزوار والبائعين والمعاملات: خدمات مصغّرة على .NET 8، قواعد بيانات محسّنة، ومعمارية تنمو بدل أن تنهار.",
  },
  "welcome.highlight": {
    en: "If your platform has to scale, it should be built right the first time.",
    ar: "إذا كانت منصتك مطالبة بالتوسّع، فيجب بناؤها بشكل صحيح من المرة الأولى.",
  },
  "welcome.primary": { en: "Start a conversation", ar: "ابدأ محادثة" },
  "welcome.secondary": { en: "See the work first", ar: "شاهد الأعمال أولاً" },
  "welcome.footnote": {
    en: "No forms, no pressure — just a reply within 24 hours.",
    ar: "بلا ضغط — رد خلال 24 ساعة.",
  },
  "welcome.close": { en: "Close welcome message", ar: "إغلاق رسالة الترحيب" },
  "welcome.autoclose": { en: "Closing in {s}s", ar: "الإغلاق بعد {s} ثانية" },
  "welcome.paused": { en: "Paused", ar: "متوقف مؤقتاً" },
  "welcome.autocloseLabel": { en: "Auto close", ar: "إغلاق تلقائي" },
  "welcome.description": {
    en: "This dialog closes automatically in a few seconds. Hover, focus, or touch inside to pause.",
    ar: "يُغلق هذا الحوار تلقائياً خلال ثوانٍ. مرّر المؤشر أو ركّز أو المس داخله للإيقاف المؤقت.",
  },



  "footer.headline1": { en: "You can find", ar: "يمكنك أن تجدني" },
  "footer.headline2": { en: "me here:", ar: "هنا:" },
  "footer.rights": { en: "ALL RIGHTS RESERVED", ar: "جميع الحقوق محفوظة" },
  "footer.copyright": { en: "{year} | COPYRIGHT", ar: "{year} | حقوق النشر" },

  "project.detail.backAll": { en: "Back to all projects", ar: "العودة إلى كل المشاريع" },

  "events.title": { en: "Career Highlights", ar: "أبرز المحطات المهنية" },
  "events.desc": {
    en: "A timeline of the roles I've held, the platforms I've shipped, and the credentials behind them.",
    ar: "خط زمني للأدوار التي توليتها، والمنصات التي أطلقتها، والمؤهلات التي تدعمها.",
  },
  "events.tab.work": { en: "EXPERIENCE", ar: "الخبرة" },
  "events.tab.projects": { en: "PLATFORMS", ar: "المنصات" },
  "events.tab.education": { en: "EDUCATION", ar: "التعليم" },
  "events.tab.certifications": { en: "CERTIFICATIONS", ar: "الشهادات" },
  "events.credentialId": { en: "Credential ID", ar: "رقم الشهادة" },
  "events.empty": { en: "Nothing here yet.", ar: "لا يوجد شيء هنا بعد." },
  "events.cta": { en: "VIEW FULL EXPERIENCE", ar: "عرض الخبرة الكاملة" },

  "about.page.eyebrow": { en: "SENIOR FULL STACK ENGINEER", ar: "مهندس برمجيات متكامل أول" },
  "about.page.title": { en: "About Mostafa Samir", ar: "نبذة عن مصطفى سمير" },
  "about.page.desc": {
    en: "Senior Full Stack Engineer specializing in building scalable multi-tenant platforms, .NET 8 Microservices, and high-performance modern web apps.",
    ar: "مهندس برمجيات متكامل أول متخصص في بناء منصات متعددة المستأجرين قابلة للتوسّع، وخدمات مصغّرة بـ .NET 8، وتطبيقات ويب حديثة عالية الأداء.",
  },
  "about.page.approach": { en: "Engineering Approach", ar: "منهجية الهندسة" },
  "about.page.skillsCta": { en: "Skills & Tooling", ar: "المهارات والأدوات" },
  "about.page.contactCta": { en: "Get in Touch", ar: "تواصل معي" },
  "about.stat.years": { en: "Years Experience", ar: "سنوات خبرة" },
  "about.stat.throughput": { en: "Throughput Boost", ar: "زيادة في الأداء" },
  "about.stat.iot": { en: "IoT Endpoints", ar: "نقطة إنترنت أشياء" },
  "about.stat.microservices": { en: "Clean Microservices", ar: "خدمات مصغّرة نظيفة" },
  "about.principle.1.title": {
    en: "Clean Architecture & DDD",
    ar: "المعمارية النظيفة والتصميم المدفوع بالمجال",
  },
  "about.principle.1.body": {
    en: "Architecting .NET 8 Microservices using Clean Architecture and Domain-Driven Design (DDD) boundaries so platforms scale multi-tenancy seamlessly.",
    ar: "تصميم خدمات مصغّرة بـ .NET 8 وفق المعمارية النظيفة وحدود التصميم المدفوع بالمجال (DDD) لتتوسّع المنصات متعددة المستأجرين بسلاسة.",
  },
  "about.principle.2.title": {
    en: "Real-Time Telemetry & SignalR",
    ar: "البيانات اللحظية و SignalR",
  },
  "about.principle.2.body": {
    en: "High-throughput SignalR and gRPC backend integration layers managing real-time data streams and over 1,000 IoT endpoints.",
    ar: "طبقات تكامل خلفية عالية الإنتاجية بـ SignalR و gRPC تدير تدفّق البيانات اللحظي وأكثر من 1000 نقطة إنترنت أشياء.",
  },
  "about.principle.3.title": { en: "Measured Database Tuning", ar: "تحسين قواعد البيانات بالقياس" },
  "about.principle.3.body": {
    en: "300% system performance optimization through SQL Server query tuning, indexing, and Redis distributed caching.",
    ar: "تحسين أداء الأنظمة بنسبة 300% عبر ضبط استعلامات SQL Server والفهرسة والتخزين المؤقت الموزّع بـ Redis.",
  },
  "about.principle.4.title": { en: "Full Stack Ownership", ar: "ملكية كاملة للمنتج" },
  "about.principle.4.body": {
    en: "End-to-end execution from database schemas and REST APIs down to Next.js, React, and Angular responsive frontends.",
    ar: "تنفيذ متكامل من مخططات قواعد البيانات وواجهات REST وصولاً إلى واجهات Next.js و React و Angular المتجاوبة.",
  },

  "contact.page.eyebrow": { en: "AVAILABLE FOR NEW PROJECTS", ar: "متاح لمشاريع جديدة" },
  "contact.page.title": { en: "Get In Touch", ar: "تواصل معي" },
  "contact.page.desc": {
    en: "Share your project requirements, tech stack, or timeline — I respond within 24 hours.",
    ar: "شارك متطلبات مشروعك أو التقنيات أو الجدول الزمني — أرد خلال 24 ساعة.",
  },
  "contact.channel.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.channel.phone": { en: "WhatsApp / Phone", ar: "واتساب / هاتف" },
  "contact.channel.location": { en: "Location", ar: "الموقع" },
  "contact.channel.locationValue": {
    en: "Tanta / Cairo, Egypt · Remote Worldwide",
    ar: "طنطا / القاهرة، مصر · عمل عن بُعد حول العالم",
  },

  "experience.page.eyebrow": { en: "CAREER & MILESTONES", ar: "المسيرة والإنجازات" },
  "experience.page.title": { en: "Professional Experience", ar: "الخبرة المهنية" },
  "experience.page.desc": {
    en: "Roles, responsibilities, and measurable engineering outcomes across enterprise marketplace systems.",
    ar: "الأدوار والمسؤوليات والنتائج الهندسية القابلة للقياس عبر أنظمة الأسواق الرقمية للمؤسسات.",
  },

  "skills.title": { en: "Skills & Stack", ar: "المهارات والتقنيات" },
  "skills.page.eyebrow": { en: "TECHNICAL COMPETENCIES", ar: "الكفاءات التقنية" },
  "skills.page.desc": {
    en: "The complete toolkit — from .NET 8 microservices down to Redis distributed caching and Next.js frontends.",
    ar: "مجموعة الأدوات الكاملة — من الخدمات المصغّرة بـ .NET 8 إلى التخزين المؤقت الموزّع بـ Redis وواجهات Next.js.",
  },
  "cta.band.eyebrow": { en: "NEXT STEP", ar: "الخطوة التالية" },
  "experience.cta.title": { en: "Like the track record?", ar: "أعجبك السجل المهني؟" },
  "experience.cta.desc": {
    en: "See the systems behind these roles, or tell me what you are building next.",
    ar: "شاهد الأنظمة خلف هذه الأدوار، أو أخبرني بما تبنيه بعد ذلك.",
  },
  "skills.cta.title": { en: "Put this stack to work", ar: "لنضع هذه التقنيات في العمل" },
  "skills.cta.desc": {
    en: "Browse the projects where this toolkit shipped, or start a conversation.",
    ar: "تصفح المشاريع التي استُخدمت فيها هذه الأدوات، أو ابدأ محادثة.",
  },
  "skills.page.projectsCta": { en: "See Projects", ar: "شاهد المشاريع" },
  "skills.page.contactCta": { en: "Work With Me", ar: "لنعمل معاً" },

  "awards.title1": { en: "Credentials &", ar: "الشهادات" },
  "awards.title2": { en: "Certifications", ar: "والاعتمادات" },
  "awards.prev": { en: "Previous Award", ar: "السابق" },
  "awards.next": { en: "Next Award", ar: "التالي" },
  "awards.azure.title": { en: "Azure Fundamentals (AZ-900)", ar: "أساسيات Azure (AZ-900)" },
  "awards.azure.body": {
    en: "Microsoft Certified proficiency in Azure cloud architecture, DevOps, microservices & enterprise security.",
    ar: "اعتماد من مايكروسوفت في معمارية سحابة Azure و DevOps والخدمات المصغّرة وأمن المؤسسات.",
  },
  "awards.itemsLabel": { en: "credentials in this set", ar: "شهادات في هذه المجموعة" },
  "awards.viewCredential": { en: "View Credential", ar: "عرض الشهادة" },
  "awards.learnMore": { en: "VIEW AWARD DETAILS", ar: "تفاصيل الجائزة" },
  "awards.bsc": { en: "B.Sc. in Computer Science (HTI)", ar: "بكالوريوس علوم الحاسب (HTI)" },
  "awards.ddd": { en: "Clean Architecture & DDD Expert", ar: "خبير المعمارية النظيفة و DDD" },

  "common.theme": { en: "Toggle theme", ar: "تبديل المظهر" },
  "common.language": { en: "Toggle language", ar: "تبديل اللغة" },
  "common.menu": { en: "Menu", ar: "القائمة" },
  "common.home": { en: "Home", ar: "الرئيسية" },

  "projects.index.reset": { en: "Reset Filters", ar: "إعادة تعيين الفلاتر" },
  "projects.index.empty": {
    en: "No projects found matching your search",
    ar: "لا توجد مشاريع مطابقة لبحثك",
  },
  "projects.index.prev": { en: "Previous", ar: "السابق" },
  "projects.index.next": { en: "Next", ar: "التالي" },
  "projects.index.viewMode": { en: "View mode", ar: "طريقة العرض" },
  "projects.index.pagination": { en: "Pagination", ar: "ترقيم الصفحات" },
  "projects.index.all": { en: "All", ar: "الكل" },
  "projects.sort.default": { en: "Featured", ar: "المميزة" },
  "projects.sort.az": { en: "Title A–Z", ar: "العنوان: أ – ي" },
  "projects.sort.za": { en: "Title Z–A", ar: "العنوان: ي – أ" },
  "projects.sort.category": { en: "Category", ar: "التصنيف" },
  "projects.sort.tech": { en: "Most tech", ar: "الأكثر تقنيات" },

  "events.item.we3ds.name": { en: "Senior Software Developer", ar: "مطوّر برمجيات أول" },
  "events.item.we3ds.location": { en: "WE3DS Company · Tanta, EG", ar: "شركة WE3DS · طنطا، مصر" },
  "events.item.we3ds.topic": {
    en: ".NET 8 Microservices, DDD, SignalR",
    ar: "خدمات .NET 8 المصغّرة وDDD وSignalR",
  },

  "events.item.freelance.name": {
    en: "Full Stack Developer (Freelance)",
    ar: "مطوّر متكامل (عمل حر)",
  },
  "events.item.freelance.location": {
    en: "Self-Employed · Cairo, EG",
    ar: "عمل حر · القاهرة، مصر",
  },
  "events.item.freelance.topic": {
    en: "React & .NET Core delivery for clients",
    ar: "تسليم مشاريع React و.NET Core للعملاء",
  },

  "events.item.platform.name": {
    en: "Multi-Tenant Marketplace Platform",
    ar: "منصة أسواق متعددة المستأجرين",
  },
  "events.item.platform.location": {
    en: "Enterprise · Production",
    ar: "قطاع المؤسسات · بيئة إنتاج",
  },
  "events.item.platform.topic": {
    en: "300% faster queries with Redis caching",
    ar: "استعلامات أسرع بنسبة 300% مع تخزين Redis",
  },

  "events.item.iot.name": {
    en: "Real-Time IoT Telemetry Layer",
    ar: "طبقة قياس عن بُعد لإنترنت الأشياء",
  },
  "events.item.iot.location": { en: "WE3DS · Production", ar: "WE3DS · بيئة إنتاج" },
  "events.item.iot.topic": {
    en: "1000+ live endpoints over SignalR",
    ar: "أكثر من 1000 نقطة اتصال حيّة عبر SignalR",
  },

  "events.item.devops.name": { en: "CI/CD Automation Pipeline", ar: "خط أتمتة CI/CD" },
  "events.item.devops.location": { en: "Azure DevOps · Docker", ar: "Azure DevOps · Docker" },
  "events.item.devops.topic": {
    en: "Shorter, repeatable release cycles",
    ar: "دورات إصدار أقصر وقابلة للتكرار",
  },

  "events.item.degree.name": { en: "B.Sc. Computer Science", ar: "بكالوريوس علوم الحاسب" },
  "events.item.degree.location": { en: "HTI University · Egypt", ar: "معهد HTI · مصر" },
  "events.item.degree.topic": {
    en: "Software engineering & databases",
    ar: "هندسة البرمجيات وقواعد البيانات",
  },

  "events.item.arch.name": {
    en: "Clean Architecture & DDD Practice",
    ar: "تطبيق Clean Architecture وDDD",
  },
  "events.item.arch.location": {
    en: "Self-Study · Applied at work",
    ar: "تعلّم ذاتي · مطبّق في العمل",
  },
  "events.item.arch.topic": {
    en: "CQRS, MediatR, unit testing",
    ar: "CQRS وMediatR واختبارات الوحدة",
  },
};

interface I18nContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  tr: (key: keyof typeof t | string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "lang";

/** Runs before hydration so the first paint already has the right lang/dir. */
export const langBootstrapScript = `(function(){try{var l=localStorage.getItem("${STORAGE_KEY}");if(l!=="ar"&&l!=="en"){l=(navigator.language||"en").toLowerCase().indexOf("ar")===0?"ar":"en";}var r=document.documentElement;r.lang=l;r.dir=l==="ar"?"rtl":"ltr";}catch(e){}})();`;

function readInitialLang(): Lang {
  if (typeof document === "undefined") return "en";
  return document.documentElement.lang === "ar" ? "ar" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // SSR renders "en"; the bootstrap script already set <html lang/dir>, and this
  // effect syncs React state right after hydration (no mismatch warnings).
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    setLang(stored === "ar" || stored === "en" ? stored : readInitialLang());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));
  const tr = (key: string) => t[key]?.[lang] ?? key;
  const dir = lang === "ar" ? ("rtl" as const) : ("ltr" as const);

  return (
    <I18nContext.Provider value={{ lang, dir, isRTL: dir === "rtl", setLang, toggleLang, tr }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
