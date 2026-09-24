import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { Briefcase, CalendarDays } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { EXPERIENCE, type ExperienceItem } from "../data/experience"

interface CardProps {
  item: ExperienceItem
  from: "left" | "right"
}

function ExperienceCard({ item, from }: CardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, x: reduceMotion ? 0 : from === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-line bg-ink-900/60 p-6 transition-colors duration-300 hover:border-accent-400/40 sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="font-display text-xl font-semibold text-mist-100">{item.role}</h3>
        {item.current && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-400/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-300">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent-400" />
            </span>
            Current
          </span>
        )}
      </div>

      <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-accent-400">
        <Briefcase className="size-4" aria-hidden="true" />
        {item.company}
      </p>

      {item.period && (
        <p className="mt-1 flex items-center gap-2 text-xs text-mist-500">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {item.period}
        </p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-mist-400">{item.summary}</p>

      <ul className="mt-4 space-y-2">
        {item.points.map((point) => (
          <li key={point} className="flex gap-2.5 text-[13px] leading-relaxed text-mist-400">
            <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 rounded-full bg-accent-400/70" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-mist-300"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

export default function Experience() {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 65%"],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <section id="experience" className="relative py-16 sm:py-20">
      <div className="wrap">
        <SectionHeading
          eyebrow="Experience"
          title="Experience"
          description="Where I've worked and what I focused on."
        />

        <div ref={trackRef} className="relative mt-10">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px bg-line lg:left-1/2 lg:-translate-x-1/2"
          />
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-4 w-px origin-top bg-accent-400 lg:left-1/2 lg:-translate-x-1/2"
              style={{ scaleY, boxShadow: "0 0 12px rgba(52,211,153,0.6)" }}
            />
          )}

          <ol className="space-y-14 lg:space-y-20">
            {EXPERIENCE.map((item, i) => {
              const from: "left" | "right" = i % 2 === 0 ? "left" : "right"
              return (
                <li key={`${item.company}-${item.role}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-7 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border border-accent-400/60 bg-ink-950 lg:left-1/2"
                  >
                    <span className="size-1.5 rounded-full bg-accent-400" />
                  </span>

                  <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                    <div
                      className={`pl-12 lg:pl-0 ${
                        from === "left" ? "lg:pr-16" : "lg:order-2 lg:pl-16"
                      }`}
                    >
                      <ExperienceCard item={item} from={from} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}