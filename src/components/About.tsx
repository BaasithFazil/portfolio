import { motion, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import SectionHeading from "./SectionHeading"
import Counter from "./Counter"
import { HERO_BIO } from "../data/config"

const FOCUS_AREAS = [
  "Web application testing",
  "Test automation",
  "API testing",
  "Regression testing",
  "Integration testing",
  "Cross-browser testing",
  "CI/CD",
  "Agile development",
]

const STATS: {
  id: string
  value?: number
  suffix?: string
  label: string
  note: string
}[] = [
  { id: "years", value: 2, suffix: "+", label: "Years Experience", note: "Shipping quality as a QA Engineer" },
  { id: "internship", value: 10, suffix: "+", label: "Months Internship", note: "Hands-on testing at enterprise scale" },
]

export default function About() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="relative py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(40rem 24rem at 90% 10%, rgba(16,185,129,0.06), transparent 60%)",
        }}
      />
      <div className="wrap relative">
        <SectionHeading
          eyebrow="About"
          title="About"
          description="I'm a QA Engineer focused on reliable, maintainable and automated testing solutions."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 text-[15px] leading-relaxed text-mist-400"
          >
            {HERO_BIO.paragraphs.slice(1).map((para) => (
              <p key={para}>{para}</p>
            ))}

            <ul className="space-y-2.5 pt-1">
            {HERO_BIO.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-2.5 text-sm text-mist-300">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                {skill}
              </li>
            ))}
            </ul>

            <p className="text-mist-300">{HERO_BIO.focus}</p>
            <p className="pt-1 font-mono text-sm text-accent-300">{HERO_BIO.closing}</p>
          </motion.div>

          <div className="rounded-2xl border border-line bg-ink-900/60 p-6 sm:p-8">
            <p className="mb-5 font-mono text-xs tracking-[0.2em] text-mist-500 uppercase">
              What I work on
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {FOCUS_AREAS.map((area, i) => (
                <motion.li
                  key={area}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-2.5 text-sm text-mist-300"
                >
                  <Check className="size-4 shrink-0 text-accent-400" aria-hidden="true" />
                  {area}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-900/40 sm:grid-cols-2 sm:divide-y-0 sm:divide-x"
        >
          {STATS.map((stat) => (
            <div key={stat.id} className="px-7 py-7">
              <dd className="font-display text-3xl font-semibold text-mist-100 sm:text-4xl">
                {stat.value !== undefined ? (
                  <Counter value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.label
                )}
              </dd>
              <dt className="mt-1.5 text-sm font-medium text-accent-300">{stat.label}</dt>
              <p className="mt-1 text-xs leading-relaxed text-mist-500">{stat.note}</p>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}