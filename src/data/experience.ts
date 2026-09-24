export interface ExperienceItem {
  role: string
  company: string
  period: string
  current?: boolean
  summary: string
  points: string[]
  tech: string[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "QA Engineer",
    company: "Pearson",
    period: "Mar 2025 – Present",
    current: true,
    summary:
      "Building and maintaining automated test coverage for digital learning platforms.",
    points: [
      "Designing and executing comprehensive test cases across web applications",
      "Building end-to-end automation with Playwright & TypeScript",
      "Maintaining and extending automation frameworks for reliability and speed",
      "Performing API testing to validate contracts, payloads and error handling",
      "Running regression testing to protect existing functionality",
      "Executing cross-browser testing to ensure consistent behaviour",
      "Identifying, documenting and reporting defects with clear reproduction steps",
      "Collaborating with development teams early in the delivery lifecycle",
      "Integrating and running automated tests within CI/CD pipelines",
    ],
    tech: ["Playwright", "TypeScript", "API Testing", "Rest Assured", "Postman", "Jenkins", "Git"],
  },
  {
    role: "Associate Quality Engineer",
    company: "Pearson",
    period: "Mar 2024 – Mar 2025",
    summary:
      "Supporting automated and manual quality across Pearson's digital learning platforms.",
    points: [
      "Executing and maintaining automated test coverage for web applications",
      "Designing and executing test cases to validate new and existing functionality",
      "Performing API and regression testing alongside feature delivery",
      "Reporting, tracking and retesting defects through resolution",
      "Collaborating with developers and product teams in an agile delivery lifecycle",
    ],
    tech: ["Playwright", "TypeScript", "Postman", "API Testing", "Regression Testing", "Agile"],
  },
  {
    role: "Quality Assurance Analyst",
    company: "London Stock Exchange Group (LSEG)",
    period: "",
    summary:
      "Hands-on quality engineering exposure inside a large agile engineering organisation.",
    points: [
      "Performed manual testing and exploratory testing across web applications",
      "Built UI automation with Cypress to cover core user journeys",
      "Validated backend behaviour through API testing",
      "Executed and maintained test cases throughout sprint cycles",
      "Reported defects and tracked them through resolution",
      "Worked within an agile development environment alongside engineers",
    ],
    tech: ["Cypress", "JavaScript", "API Testing", "Postman", "Git", "Agile"],
  },
  {
    role: "Quality Assurance Intern",
    company: "UNIVISER",
    period: "",
    summary:
      "Quality assurance internship building testing fundamentals across web applications.",
    points: [
      "Performed manual and exploratory testing of web applications",
      "Designed and executed structured test cases",
      "Documented and reported defects with clear steps to reproduce",
    ],
    tech: ["Manual Testing", "Test Case Design", "Agile"],
  },
]