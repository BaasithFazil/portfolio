export type ProjectCategory = "Automation" | "Web" | "Full Stack";

export interface Project {
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  features: string[];
// TODO: Replace placeholder hrefs with real project links.
  github: string
  demo?: string
}

export type ProjectFilter = "All" | ProjectCategory;

export const PROJECT_FILTERS: ProjectFilter[] = [
  "All",
  "Automation",
  "Web",
  "Full Stack",
];

export const PROJECTS: Project[] = [
  {
    title: "Cypress + Cucumber Test Automation",
    description:
      "End-to-end test automation for the OrangeHRM demo website, built with Cypress and Cucumber Gherkin.",
    category: "Automation",
    technologies: ["Cypress", "JavaScript", "Cucumber", "Gherkin", "POM"],
    features: [
      "BDD test scenarios written in Gherkin",
      "Modular Page Object Model structure",
      "Feature files under the cypress integration folder",
      "Step definitions organised for maintainability",
    ],
    github: "https://github.com/BaasithFazil/Cypress_Cucumber",
  },
  {
    title: "Expense Tracker",
    description: "A full-stack expense tracking application.",
    category: "Full Stack",
    technologies: ["React", "Next.js", "Supabase", "TypeScript"],
    features: [
      "Full-stack TypeScript application",
      "Persistent data via Supabase",
      "Responsive UI",
    ],
    github: "https://github.com/BaasithFazil/expense-tracker",
  },
  {
    title: "Frame & Glass",
    description:
      "A modern product showcase website with an admin panel and Supabase integration.",
    category: "Web",
    technologies: ["React", "Vite", "Tailwind", "Supabase"],
    features: [
      "Product showcase section",
      "Admin panel flow",
      "Supabase data integration",
    ],
    github: "https://github.com/BaasithFazil/Frame-Glass",
    demo: "https://frame-glass.vercel.app/",
  },
];
