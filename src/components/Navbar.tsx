import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { NAV_LINKS, SITE } from "../data/config"

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>("home")
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let frame = 0

    const update = () => {
      const probe = window.scrollY + window.innerHeight * 0.45
      let current = SECTION_IDS[0]
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= probe) current = id
      }
      setActive(current)
      setScrolled(window.scrollY > 24)
      frame = 0
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <motion.header
      initial={{ y: reduceMotion ? 0 : -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-ink-950/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Main navigation">
        <a
          href="#home"
          className="font-display text-lg font-semibold tracking-tight text-mist-100"
          aria-label="Back to top — Baasith"
        >
          Baasith<span className="text-accent-400">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.replace("#", "")
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(link.href.replace("#", ""))}
                  className={`link-underline relative rounded px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-accent-300"
                      : "text-mist-400 hover:text-mist-100"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-x-3 -bottom-px h-px bg-accent-400"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-mist-200 transition-colors hover:border-accent-400/60 hover:text-accent-300 md:inline-flex"
        >
          Hire Me
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="flex size-10 items-center justify-center rounded-lg border border-line bg-ink-800/60 text-mist-200 transition-colors hover:text-accent-300 md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink-950 md:hidden"
          >
            <ul className="wrap my-auto flex w-full flex-col gap-1 py-8">
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.href.replace("#", "")
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line/60"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between py-4 font-display text-2xl font-medium transition-colors ${
                        isActive ? "text-accent-300" : "text-mist-200 hover:text-mist-100"
                      }`}
                    >
                      {link.label}
                      <span className="font-mono text-xs text-mist-500">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="wrap pb-10"
            >
              <p className="font-mono text-xs text-mist-500">{SITE.role}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}