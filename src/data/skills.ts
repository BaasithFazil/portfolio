import type { LucideIcon } from "lucide-react"
import {
  AppWindow,
  BookOpen,
  Braces,
  CheckCircle2,
  ClipboardCheck,
  Coffee,
  Cog,
  Database,
  GitCommitHorizontal,
  GitMerge,
  GitPullRequest,
  Globe,
  Layers,
  ListChecks,
  MonitorSmartphone,
  Network,
  Plug,
  RefreshCw,
  Rocket,
  Send,
  Wrench,
} from "lucide-react"

export interface Skill {
  name: string
  description: string
  icon: LucideIcon
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  skills: Skill[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "automation",
    title: "Automation",
    description: "Framework design and end-to-end browser automation.",
    skills: [
      { name: "Playwright", description: "Reliable end-to-end browser automation", icon: MonitorSmartphone },
      { name: "Cypress", description: "Fast, developer-friendly UI testing", icon: Layers },
      { name: "Selenium", description: "Cross-browser web automation", icon: Globe },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    description: "The languages behind the test suites.",
    skills: [
      { name: "TypeScript", description: "Type-safe test code and tooling", icon: Braces },
      { name: "JavaScript", description: "Scripting and automation logic", icon: CheckCircle2 },
      { name: "Java", description: "Selenium and Rest Assured test code", icon: Coffee },
      { name: "SQL", description: "Data validation and querying", icon: Database },
    ],
  },
  {
    id: "api",
    title: "API Testing",
    description: "Validating contracts, status codes and payloads.",
    skills: [
      { name: "Postman / Testfully", description: "API exploration and collection testing", icon: Send },
      { name: "REST Assured", description: "REST API automation in Java", icon: Plug },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    description: "The craft of finding and preventing defects.",
    skills: [
      { name: "Functional Testing", description: "Verifying features behave as intended", icon: ListChecks },
      { name: "Regression Testing", description: "Protecting existing functionality", icon: RefreshCw },
      { name: "Integration Testing", description: "Checking systems work together", icon: GitMerge },
      { name: "Cross-browser Testing", description: "Consistent experience across browsers", icon: AppWindow },
      { name: "API Testing", description: "Backend contracts and boundaries", icon: Network },
      { name: "Test Case Design", description: "Clear, traceable and maintainable cases", icon: ClipboardCheck },
      { name: "Manual Testing", description: "Exploratory and scripted manual coverage", icon: Wrench },
      { name: "BDD", description: "Behaviour-driven collaboration on scenarios", icon: BookOpen },
    ],
  },
  {
    id: "devops",
    title: "DevOps / Tools",
    description: "The toolchain that ships quality continuously.",
    skills: [
      { name: "Git", description: "Version control and collaboration", icon: GitCommitHorizontal },
      { name: "GitLab", description: "Source control and MR-based workflows", icon: GitPullRequest },
      { name: "Bitbucket", description: "Code hosting and pipelines", icon: GitMerge },
      { name: "Jenkins", description: "Automated build and test pipelines", icon: Cog },
      { name: "CI/CD", description: "Testing in the delivery pipeline", icon: Rocket },
    ],
  },
]

export const MISC_TOOLS = ["BDD / Cucumber", "Page Object Model", "Test Case Design"]