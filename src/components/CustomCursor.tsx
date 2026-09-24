import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    return finePointer && !prefersReduced
  })
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const ringX = useSpring(mx, { stiffness: 320, damping: 32, mass: 0.6 })
  const ringY = useSpring(my, { stiffness: 320, damping: 32, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']") !== null,
      )
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    document.documentElement.addEventListener("pointerleave", onLeave)
    document.documentElement.addEventListener("pointerenter", onEnter)

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.documentElement.removeEventListener("pointerenter", onEnter)
    }
  }, [enabled, mx, my])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400"
        style={{ x: mx, y: my, opacity: visible ? 1 : 0 }}
        animate={{ scale: pressed ? 0.6 : 1 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[89] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-400/40"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{ scale: hovering ? 1.6 : pressed ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </>
  )
}