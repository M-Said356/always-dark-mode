/** UI-agnostic icon key; the presentation layer maps it to an icon component. */
export type SkillIcon =
  "frontend" | "backend" | "database" | "architecture" | "realtime" | "devops" | "security";

interface SkillGroup {
  title: string;
  /** Icon key resolved by the UI, keeping the data layer free of components. */
  icon: SkillIcon;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "frontend",
    skills: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Responsive Web Design",
      "React Native",
      "RxJS",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    icon: "backend",
    skills: [
      ".NET 8",
      "ASP.NET Core",
      "C#",
      "ASP.NET Web API",
      "Microservices",
      "Node.js",
      "GraphQL",
      "LINQ",
      "Entity Framework",
    ],
  },
  {
    title: "Databases",
    icon: "database",
    skills: ["SQL Server (Advanced Tuning)", "PostgreSQL", "MongoDB", "Redis", "SSRS"],
  },
  {
    title: "Architecture & Patterns",
    icon: "architecture",
    skills: [
      "Clean Architecture",
      "Domain-Driven Design (DDD)",
      "Repository Pattern",
      "Unit of Work",
      "Event-Driven Architecture",
      "Multi-Tenant Architecture",
      "RBAC",
    ],
  },
  {
    title: "Real-Time & Communication",
    icon: "realtime",
    skills: ["SignalR", "gRPC", "WebSocket", "Kafka"],
  },
  {
    title: "DevOps & CI/CD",
    icon: "devops",
    skills: ["Azure DevOps", "Docker", "Kubernetes", "TFS", "Git", "CI/CD Pipelines", "Terraform"],
  },
  {
    title: "Security & Testing",
    icon: "security",
    skills: ["OAuth 2.0", "JWT", "TDD", "Playwright", "Cypress"],
  },
];
