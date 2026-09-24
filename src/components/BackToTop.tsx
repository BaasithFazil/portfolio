import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          aria-label="Back to top"
          className="fixed right-5 bottom-5 z-[60] flex size-11 items-center justify-center rounded-full border border-line-strong bg-ink-800/70 text-mist-300 backdrop-blur transition-colors hover:border-accent-400/60 hover:text-accent-300 sm:right-8 sm:bottom-8"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}