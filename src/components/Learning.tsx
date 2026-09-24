import { motion, useReducedMotion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import { LEARNING_FOCUS } from "../data/philosophy"

export default function Learning() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="learning" className="relative py-16 sm:py-20">
      <div className="wrap">
        <SectionHeading
          eyebrow="Continuous Learning"
          title="Learning"
          description="What I keep working on to grow."
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_FOCUS.map((focus, i) => (
            <motion.div
              key={focus.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-ink-900 p-6 transition-colors duration-300 hover:bg-ink-800 sm:p-8"
            >
              <p className="font-mono text-xs text-accent-400/80">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold text-mist-100">
                {focus.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">{focus.text}</p>
              <div className="mt-5 h-px w-full overflow-hidden bg-line">
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full origin-left bg-accent-400/70"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}