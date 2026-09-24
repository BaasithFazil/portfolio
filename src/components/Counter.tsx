import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

export default function Counter({ value, suffix = "", duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduceMotion) {
      ref.current.textContent = `${value}${suffix}`
      return
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        ref.current!.textContent = `${Math.round(latest)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, duration, reduceMotion])

  return <span ref={ref}>0{suffix}</span>
}