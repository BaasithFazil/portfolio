import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDownRight, ArrowRight, Download } from "lucide-react"
import { SITE, HERO_BIO } from "../data/config"
import MagneticButton from "./MagneticButton"

// ---------------------------------------------------------------------------
// Terminal
// ---------------------------------------------------------------------------

interface TerminalLine {
  text: string
  kind: "cmd" | "ok" | "info" | "success"
}

const TERMINAL_SCRIPT: { lines: TerminalLine[]; delay: number }[] = [
  { lines: [{ text: "$ npm run test", kind: "cmd" }], delay: 500 },
  { lines: [
      { text: "Chromium  ✓ 42 passed", kind: "ok" },
      { text: "Firefox   ✓ 42 passed", kind: "ok" },
      { text: "WebKit    ✓ 42 passed", kind: "ok" },
      { text: "API       ✓ 18 passed", kind: "ok" },
    ], delay: 900 },
  { lines: [{ text: "102 passed · 0 failed · 14.2s", kind: "info" }], delay: 800 },
  { lines: [{ text: "All tests passed ✔", kind: "success" }], delay: 700 },
]

function Terminal() {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    const advance = (i: number) => {
      if (cancelled) return
      setCount(i + 1)

      if (i < TERMINAL_SCRIPT.length - 1) {
        timer = setTimeout(() => advance(i + 1), TERMINAL_SCRIPT[i + 1].delay)
        return
      }

      timer = setTimeout(() => {
        if (cancelled) return
        setCount(0)
        timer = setTimeout(() => advance(0), 500)
      }, 3400)
    }

    timer = setTimeout(() => advance(0), 600)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [reduceMotion])

  const visibleLines = reduceMotion
    ? TERMINAL_SCRIPT.flatMap((step) => step.lines)
    : TERMINAL_SCRIPT.slice(0, count).flatMap((step) => step.lines)

  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-ink-900/90 shadow-[0_0_0_1px_rgba(52,211,153,0.06),0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur"
      role="img"
      aria-label="Animated terminal showing automated test results all passing"
    >
      <div className="flex items-center gap-2 border-b border-line bg-ink-800/80 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-mist-500">
          qa@baasith — zsh
        </span>
      </div>

      <div className="min-h-[300px] p-5 font-mono text-[13px] leading-7 sm:text-sm">
        <div aria-hidden="true" className="mb-3 flex gap-3 text-mist-500">
          <span>~/projects</span>
          <span className="text-line-strong">|</span>
          <span>qa-automation</span>
        </div>
        {visibleLines.map((line, i) => (
          <motion.p
            key={`${line.text}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={
              line.kind === "cmd"
                ? "mt-2 text-mist-100"
                : line.kind === "ok"
                  ? "text-accent-300"
                  : line.kind === "success"
                    ? "mt-3 font-semibold text-accent-400"
                    : "text-mist-400"
            }
          >
            {line.text}
          </motion.p>
        ))}
        <span aria-hidden="true" className="inline-block h-4 w-2 translate-y-0.5 bg-accent-400/80 animate-pulse" />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Floating badges
// ---------------------------------------------------------------------------

const FLOATING_BADGES = [
  { label: "Playwright", top: "8%", left: "-6%", delay: 0, duration: 7 },
  { label: "TypeScript", top: "58%", left: "-10%", delay: 1.2, duration: 8 },
  { label: "API Testing", top: "16%", right: "-8%", delay: 0.6, duration: 7.5 },
  { label: "CI/CD", bottom: "6%", right: "-6%", delay: 1.8, duration: 8.5 },
]

function FloatingBadges() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {FLOATING_BADGES.map((badge) => (
        <motion.span
          key={badge.label}
          className="absolute rounded-full border border-line bg-ink-800/70 px-3 py-1.5 font-mono text-xs text-mist-300 backdrop-blur"
          style={{
            top: badge.top,
            left: badge.left as string | undefined,
            right: badge.right as string | undefined,
            bottom: badge.bottom as string | undefined,
          }}
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -10, 0], x: [0, 4, 0] }
          }
          transition={{
            duration: badge.duration,
            delay: badge.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {badge.label}
        </motion.span>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

const headingWords = ["Hi,", "I'm", "Baasith."]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const headline = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
}

const word = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 30rem at 20% 20%, rgba(16,185,129,0.12), transparent 60%), radial-gradient(50rem 28rem at 85% 75%, rgba(16,185,129,0.07), transparent 60%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 -right-24 hidden size-[28rem] rounded-full bg-accent-500/10 blur-[120px] sm:block"
        animate={reduceMotion ? undefined : { y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingBadges />

      <div className="wrap relative grid items-center gap-14 py-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-800/60 px-3.5 py-1.5 font-mono text-xs tracking-wide text-mist-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-400" />
            </span>
            {SITE.role}
          </motion.p>

          <motion.h1
            variants={headline}
            className="font-display text-5xl font-semibold tracking-tight text-mist-100 sm:text-6xl lg:text-7xl"
          >
            <span className="sr-only">Hi, I'm Baasith.</span>
            <span aria-hidden="true" className="block overflow-hidden pb-1">
              <motion.span variants={word} className="block">
                {headingWords[0]} {headingWords[1]}
              </motion.span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-2">
              <motion.span variants={word} className="block text-accent-400">
                {headingWords[2]}
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-100 sm:text-xl"
          >
            {HERO_BIO.headline}
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mist-400">
            {HERO_BIO.paragraphs[0]}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-400 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-glow transition-colors hover:bg-accent-300"
              >
                View My Work
                <ArrowDownRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold text-mist-200 transition-colors hover:border-accent-400/60 hover:text-accent-300"
              >
                Contact Me
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </MagneticButton>

            <a
              href={SITE.resume}
              className="group link-underline inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-mist-400 transition-colors hover:text-accent-300"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 40, scale: reduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div aria-hidden="true" className="absolute -inset-6 rounded-3xl bg-accent-500/5 blur-2xl" />
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}