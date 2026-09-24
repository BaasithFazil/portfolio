import Hero from "../components/Hero"
import About from "../components/About"
import Experience from "../components/Experience"
import Education from "../components/Education"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Learning from "../components/Learning"
import Contact from "../components/Contact"

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Learning />
        <Contact />
      </main>
    </>
  )
}