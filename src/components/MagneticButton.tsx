import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export default function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.2 })

  function onMove(e: React.MouseEvent) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}