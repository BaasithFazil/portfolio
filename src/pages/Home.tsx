import { lazy, Suspense } from "react"
import Hero from "../components/Hero"
import About from "../components/About"

const Experience = lazy(() => import("../components/Experience"))
const Education = lazy(() => import("../components/Education"))
const Skills = lazy(() => import("../components/Skills"))
const Projects = lazy(() => import("../components/Projects"))
const Learning = lazy(() => import("../components/Learning"))
const Contact = lazy(() => import("../components/Contact"))

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Suspense fallback={null}>
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Learning />
        <Contact />
      </Suspense>
    </main>
  )
}