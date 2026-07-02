import { motion, useReducedMotion } from 'framer-motion'

type LogoOrbProps = {
  className?: string
  size?: number
  opacity?: number
  animate?: boolean
}

export default function LogoOrb({
  className = '',
  size = 120,
  opacity = 0.35,
  animate = true,
}: LogoOrbProps) {
  const reduce = useReducedMotion()

  return (
    <motion.img
      src="/images/brand/logo-orb.png"
      alt=""
      aria-hidden
      className={`pointer-events-none select-none object-contain ${className}`}
      style={{ width: size, height: size, opacity }}
      animate={
        animate && !reduce
          ? {
              y: [0, -10, 0],
              scale: [1, 1.03, 1],
            }
          : undefined
      }
      transition={
        animate && !reduce
          ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    />
  )
}
