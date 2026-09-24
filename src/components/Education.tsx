import { motion, useReducedMotion } from "framer-motion"
import { Award, GraduationCap } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { EDUCATION } from "../data/education"
import { CERTIFICATIONS } from "../data/philosophy"

export default function Education() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="education" className="relative py-16 sm:py-20">
      <div className="wrap">
        <SectionHeading
          eyebrow="Education"
          title="Education"
          description="Where I studied."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EDUCATION.map((entry, i) => (
            <motion.div
              key={`${entry.school}-${entry.period}`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-ink-900/60 p-6 transition-colors duration-300 hover:border-accent-400/40 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-ink-800 text-accent-400 transition-all duration-300 group-hover:shadow-glow">
                <GraduationCap className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-lg font-semibold text-mist-100">{entry.school}</p>
              {entry.degree && <p className="mt-1.5 text-sm text-mist-300">{entry.degree}</p>}
              <p className="mt-3 font-mono text-xs text-mist-500">{entry.period}</p>
              {entry.note && (
                <p className="mt-2 inline-block rounded-full border border-line bg-ink-800/70 px-3 py-1 font-mono text-[11px] text-mist-300">
                  {entry.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 space-y-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-gradient-to-r from-ink-900/80 to-ink-900/40 p-5 sm:p-6"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-accent-400/40 bg-accent-400/10 text-accent-400">
                <Award className="size-6" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-semibold text-mist-100">{cert.name}</h3>
                <p className="mt-0.5 text-sm text-mist-400">{cert.issuer}</p>
              </div>
              <p className="rounded-full border border-line bg-ink-800/70 px-3 py-1.5 font-mono text-xs text-mist-300">
                {cert.id}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}