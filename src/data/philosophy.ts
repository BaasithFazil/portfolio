export interface LearningFocus {
  title: string
  text: string
}

export const LEARNING_FOCUS: LearningFocus[] = [
  { title: "Automation Engineering", text: "Designing maintainable, reusable test frameworks" },
  { title: "API Testing", text: "Contracts, data and integration boundaries" },
  { title: "Software Testing", text: "Techniques for finding defects with intent" },
  { title: "Web Development", text: "Understanding the stack under test" },
  { title: "System Understanding", text: "How components and environments interact" },
  { title: "Continuous Improvement", text: "Refactoring suites, pruning flakiness, growing coverage" },
]

export interface Certification {
  name: string
  issuer: string
  id: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "ISTQB Foundation Level (CTFL)",
    issuer: "ISTQB — International Software Testing Qualifications Board",
    id: "SL-CTFL-2401-4555",
  },
]