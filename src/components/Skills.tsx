import { motion, useReducedMotion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import { SKILL_GROUPS } from "../data/skills"

export default function Skills() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="relative py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(40rem 26rem at 0% 60%, rgba(16,185,129,0.06), transparent 60%)",
        }}
      />
      <div className="wrap relative">
        <SectionHeading
          eyebrow="Skills"
          title="Skills"
          description="The tools and technologies I work with."
        />

        <div className="mt-10 space-y-12">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <div key={group.id}>
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 flex items-baseline gap-4"
              >
                <h3 className="font-display text-xl font-semibold text-mist-100">
                  <span className="mr-2 font-mono text-sm text-accent-400">
                    0{groupIndex + 1}
                  </span>
                  {group.title}
                </h3>
                <p className="hidden text-xs text-mist-500 sm:block">{group.description}</p>
              </motion.div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.4,
                        delay: 0.04 * skillIndex,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={reduceMotion ? undefined : { y: -4 }}
                      className="group flex flex-col items-center gap-2 rounded-xl border border-line bg-ink-900/50 p-4 text-center transition-colors duration-300 hover:border-accent-400/40 lg:flex-row lg:items-center lg:gap-3 lg:rounded-lg lg:p-3 lg:text-left"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-800 text-accent-400 transition-all duration-300 group-hover:border-accent-400/50 group-hover:shadow-glow lg:size-9 lg:rounded-md">
                        <Icon className="size-5 lg:size-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-medium text-mist-100">{skill.name}</h4>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-mist-500 lg:line-clamp-none lg:truncate">
                          {skill.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}