import { useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowUpRight, GitBranch } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { PROJECT_FILTERS, PROJECTS, type Project, type ProjectFilter } from "../data/projects"

function TiltCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springX = useSpring(px, { stiffness: 160, damping: 22 })
  const springY = useSpring(py, { stiffness: 160, damping: 22 })
  const rotateX = useTransform(springY, [0, 1], [5, -5])
  const rotateY = useTransform(springX, [0, 1], [-5, 5])

  function onMove(e: React.MouseEvent) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function onLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-900/60 transition-colors duration-300 hover:border-accent-400/50"
      >
        <div
          className="relative flex h-36 items-center justify-between gap-4 overflow-hidden border-b border-line bg-ink-800/60 px-6"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-grid opacity-60" />
          <span className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-mist-300">
            Project {index + 1}
          </span>
          <span className="rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-1 text-[11px] font-semibold text-accent-300">
            {project.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="font-display text-xl font-semibold text-mist-100 transition-colors group-hover:text-accent-300">
            {project.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-mist-400">
            {project.description}
          </p>

          <ul className="mt-4 space-y-1.5">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2 text-[13px] text-mist-500">
                <span aria-hidden="true" className="mt-[7px] size-1 shrink-0 rounded-full bg-accent-400/70" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium tracking-wide text-mist-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm font-medium text-mist-200 transition-colors hover:border-accent-400/60 hover:text-accent-300"
            >
              <GitBranch className="size-4" aria-hidden="true" />
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent-400 px-4 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-300"
              >
                Live Demo
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All")

  const projects = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="projects" className="relative py-16 sm:py-20">
      <div className="wrap">
        <SectionHeading
          eyebrow="Projects"
          title="Projects"
          description="A few things I've built and automated."
        />

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {PROJECT_FILTERS.map((f) => {
            const isActive = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "font-medium text-ink-950"
                    : "border border-line text-mist-400 hover:border-accent-400/50 hover:text-mist-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-accent-400"
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            )
          })}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <TiltCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}