import { motion, useReducedMotion } from "framer-motion"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <p className="mb-3 flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-accent-400 uppercase">
        <span aria-hidden="true" className="h-px w-6 bg-accent-400/60" />
        {eyebrow}
        {align === "center" && (
          <span aria-hidden="true" className="h-px w-6 bg-accent-400/60" />
        )}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-mist-100 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-mist-400">{description}</p>
      )}
    </motion.div>
  )
}