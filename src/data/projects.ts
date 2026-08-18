export type ProjectCategory =
  | "Clothing"
  | "Beauty"
  | "Jewelry"
  | "Furniture"
  | "Dashboard"
  | "Web3"
  | "Sports"
  | "Tech Accessories"
  | "Backend";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  client?: string;
  type: "Team" | "Freelance" | "Self";
  tech: string[];
  database?: string;
  status?: "In Progress" | "Completed" | "Deployed";
  badges?: string[];
  live: string;
  github?: string;
  image?: string;
  metrics?: { label: string; value: string }[];
  gradient?: string;
}

export const projects: Project[] = [
  {
    id: "town-team",
    title: "Town Team",
    description:
      "Team-based clothing e-commerce platform with inventory management and team collaboration features.",
    category: "Clothing",
    type: "Team",
    tech: ["React"],
    live: "https://town-team-three.vercel.app/",
    image: "/projects/react/TownTeam.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.18 30), oklch(0.45 0.12 320))",
  },
  {
    id: "under-armour",
    title: "Under Armour Store",
    description:
      "Full-featured e-commerce platform for athletic apparel with product catalog and checkout system.",
    category: "Clothing",
    client: "Under Armour",
    type: "Team",
    tech: ["React", "MySQL"],
    database: "MySQL",
    live: "https://under-armour-chi.vercel.app/",
    image: "/projects/react/UNDER-ARMOUR.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.16 230), oklch(0.5 0.15 190))",
  },
  {
    id: "ohanna-landing",
    title: "Ohanna Landing Page",
    description: "Modern landing page for fashion brand with dark aesthetic and product showcase.",
    category: "Clothing",
    client: "Dark Primid",
    type: "Freelance",
    tech: ["React", "PostgreSQL"],
    database: "PostgreSQL",
    live: "https://ohanna-api-73.vercel.app/",
    image: "/projects/react/ohanna.png",
    gradient: "linear-gradient(135deg, oklch(0.65 0.17 145), oklch(0.55 0.14 110))",
  },
  {
    id: "lumina-beauty",
    title: "Lumina Beauty",
    description:
      "Beauty and cosmetics e-commerce platform with product filtering and recommendation system.",
    category: "Beauty",
    type: "Freelance",
    tech: ["React"],
    live: "https://luminabeauty-green.vercel.app/",
    image: "/projects/react/luminabeauty.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.16 60), oklch(0.5 0.14 30))",
  },
  {
    id: "little-boys",
    title: "Little Boys Fashion",
    description:
      "Specialized clothing store for children with size guides and parent-friendly interface.",
    category: "Clothing",
    type: "Freelance",
    tech: ["React"],
    live: "https://little-boys.vercel.app/",
    image: "/projects/react/little-boys.png",
    gradient: "linear-gradient(135deg, oklch(0.58 0.18 300), oklch(0.5 0.15 270))",
  },
  {
    id: "clothing-shop",
    title: "Clothing Shop",
    description:
      "Full-stack clothing e-commerce application with user authentication and order management.",
    category: "Clothing",
    type: "Freelance",
    tech: ["React", "PostgreSQL"],
    database: "PostgreSQL",
    live: "https://clothing-shop-pearl.vercel.app/",
    image: "/projects/react/HAVEN.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.18 30), oklch(0.45 0.12 320))",
  },
  {
    id: "lumina",
    title: "Lumina (Beauty Platform)",
    description:
      "Comprehensive beauty and cosmetics marketplace with vendor management and customer reviews.",
    category: "Beauty",
    type: "Freelance",
    tech: ["React"],
    live: "https://lumina-pi-two.vercel.app/",
    image: "/projects/react/luminabeaut.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.16 230), oklch(0.5 0.15 190))",
  },
  {
    id: "linea-jewelry",
    title: "Linea Jewelry Store",
    description:
      "Premium jewelry e-commerce platform with product customization and wishlist features.",
    category: "Jewelry",
    type: "Freelance",
    tech: ["React"],
    status: "Completed",
    badges: ["Done", "Deployed"],
    live: "https://linea-jewelry-chi.vercel.app/",
    image: "/projects/react/linea-jewelry.png",
    gradient: "linear-gradient(135deg, oklch(0.65 0.17 145), oklch(0.55 0.14 110))",
  },
  {
    id: "vingo-roll",
    title: "Vingo Roll",
    description:
      "Web3-enabled furniture marketplace with blockchain transactions and NFT integration.",
    category: "Furniture",
    type: "Team",
    tech: ["React", "Web3"],
    live: "https://vingo-roll-k3y9.vercel.app/",
    image: "/projects/react/Vingo-Roll.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.16 60), oklch(0.5 0.14 30))",
  },
  {
    id: "e-inventory",
    title: "E-Inventory Dashboard",
    description:
      "Administrative dashboard for inventory management with real-time stock tracking and analytics.",
    category: "Dashboard",
    type: "Self",
    tech: ["React"],
    status: "Completed",
    live: "https://e-inventory-flame.vercel.app/login",
    image: "/projects/react/E-Inventory.png",
    gradient: "linear-gradient(135deg, oklch(0.58 0.18 300), oklch(0.5 0.15 270))",
  },
  {
    id: "velocity",
    title: "Velocity Swimming",
    description:
      "Community platform for swimming teams with event scheduling and member management.",
    category: "Sports",
    type: "Team",
    tech: ["React", "Web3"],
    live: "https://velocity-brown-nine.vercel.app/",
    image: "/projects/react/VELOCITY.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.18 30), oklch(0.45 0.12 320))",
  },
  {
    id: "luxelle",
    title: "Luxelle",
    description:
      "Premium beauty and cosmetics landing page built with Angular and Web3 integration.",
    category: "Beauty",
    type: "Team",
    tech: ["Angular", "Web3"],
    live: "https://luxelle-landing.vercel.app/",
    image: "/projects/angular/luxelle-landing.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.16 230), oklch(0.5 0.15 190))",
  },
  {
    id: "zyro-electric",
    title: "Zyro Electric",
    description: "E-commerce platform for tech accessories with modern UI and Web3 capabilities.",
    category: "Tech Accessories",
    type: "Team",
    tech: ["Angular", "Web3"],
    live: "https://zyro-electric.vercel.app/",
    image: "/projects/angular/zyro-electric.png",
    gradient: "linear-gradient(135deg, oklch(0.58 0.18 300), oklch(0.5 0.15 270))",
  },
  {
    id: "shop-microservices",
    title: "Shop Microservices",
    description:
      "Advanced e-commerce microservices architecture with Web3 integration and scalable backend infrastructure.",
    category: "Web3",
    type: "Team",
    tech: ["Microservices", "Web3"],
    github: "https://github.com/Mostafa-SAID7/Shop-Microservices",
    live: "#",
    image: "/projects/microservices/Shop.jpg",
    gradient: "linear-gradient(135deg, oklch(0.6 0.18 30), oklch(0.45 0.12 320))",
  },
  {
    id: "inventory-microservices",
    title: "Inventory Microservices",
    description:
      "Comprehensive inventory management system using microservices architecture with advanced tracking and analytics.",
    category: "Dashboard",
    type: "Team",
    tech: ["Microservices", "Web3"],
    github: "https://github.com/Mostafa-SAID7/Inventory-Microservices",
    live: "#",
    image: "/projects/microservices/Inventory.jpg",
    gradient: "linear-gradient(135deg, oklch(0.6 0.16 230), oklch(0.5 0.15 190))",
  },
  {
    id: "market-api",
    title: "Market API",
    description:
      "RESTful API for marketplace operations with MongoDB backend, comprehensive Swagger documentation, and real-time data management.",
    category: "Backend",
    client: "Erra Soft",
    type: "Freelance",
    tech: ["ASP.NET Core", "MongoDB", "Swagger", "RESTful API"],
    database: "MongoDB",
    status: "Completed",
    live: "http://market-api.runasp.net/index.html",
    image: "/api/market-api.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.18 30), oklch(0.45 0.12 320))",
  },
  {
    id: "e-commerce-api",
    title: "E-Commerce API",
    description:
      "Full-featured e-commerce backend API with SQL Server database, Swagger documentation, and comprehensive endpoint coverage.",
    category: "Backend",
    client: "We3ds",
    type: "Freelance",
    tech: ["ASP.NET Core", "SQL Server", "Swagger", "RESTful API"],
    database: "SQL Server",
    status: "Completed",
    live: "http://e-commerce-api73.runasp.net/",
    image: "/api/e-commerce-api.png",
    gradient: "linear-gradient(135deg, oklch(0.6 0.16 230), oklch(0.5 0.15 190))",
  },
  {
    id: "marketing-mvc",
    title: "Marketing MVC",
    description:
      "Full-stack marketing application built with ASP.NET MVC and SQL Server, featuring modern UI and comprehensive business logic.",
    category: "Backend",
    client: "Erra Soft",
    type: "Freelance",
    tech: ["ASP.NET MVC", "SQL Server", "C#"],
    database: "SQL Server",
    status: "Completed",
    live: "#",
    image: "/api/Marketing-Mvc.jpg",
    gradient: "linear-gradient(135deg, oklch(0.58 0.18 300), oklch(0.5 0.15 270))",
  },
];

export const projectFilters: (ProjectCategory | "All")[] = [
  "All",
  "Clothing",
  "Beauty",
  "Jewelry",
  "Furniture",
  "Dashboard",
  "Web3",
  "Sports",
  "Tech Accessories",
  "Backend",
];
