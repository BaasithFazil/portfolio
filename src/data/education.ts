export interface EducationItem {
  school: string
  degree: string
  period: string
  note?: string
}

export const EDUCATION: EducationItem[] = [
  {
    school: "Kingston University",
    degree: "BSc (Hons) in Computer Science",
    period: "Sep 2022 – Sep 2023",
  },
  {
    school: "Pearson College London",
    degree: "High School Diploma, Computer Software Engineering",
    period: "2019 – 2021",
  },
  {
    school: "Royal College Colombo",
    degree: "",
    period: "Jan 2004 – Aug 2017",
    note: "Grade 12/13 Standard",
  },
]