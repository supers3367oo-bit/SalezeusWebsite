import { useRef, type ReactNode, type CSSProperties } from 'react'

type Props = {
  children: ReactNode
  className?: string
  color?: string
  size?: number
  opacity?: number
}

export default function MouseSpotlight({
  children,
  className = '',
  color = '50, 88, 164',
  size = 520,
  opacity = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mouse-x', '50%')
    el.style.setProperty('--mouse-y', '50%')
  }

  const style = {
    '--mouse-x': '50%',
    '--mouse-y': '50%',
  } as CSSProperties

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at var(--mouse-x) var(--mouse-y), rgba(${color}, ${opacity}), transparent 42%)`,
        }}
      />
      <div className="relative z-[2]">{children}</div>
    </div>
  )
}
