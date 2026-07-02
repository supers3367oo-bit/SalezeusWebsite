import { Fragment, useRef } from 'react'
import clsx from 'clsx'
import { motion, useInView, type Easing } from 'framer-motion'

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  splitBy?: 'words' | 'chars'
  repeat?: boolean
  /** Allow words to wrap onto multiple lines (default: single line) */
  wrap?: boolean
}

const easeIn: Easing = [0.16, 1, 0.3, 1]
const easeOut: Easing = [0.4, 0, 0.2, 1]

export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.045,
  duration = 0.65,
  splitBy = 'words',
  repeat = false,
  wrap = false,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, {
    once: !repeat,
    margin: '-40px',
    amount: 0.45,
  })

  const parts = splitBy === 'chars' ? text.split('') : text.split(' ')

  return (
    <span
      ref={ref}
      className={clsx('inline', wrap && 'max-w-full', className)}
      aria-label={text}
    >
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1

        return (
          <Fragment key={`${part}-${i}`}>
            <span
              className={clsx(
                'inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]',
                isLast && 'pe-[0.1em]',
              )}
            >
              <motion.span
                className="inline-block will-change-transform"
                initial={false}
                animate={
                  isInView
                    ? { y: '0%', opacity: 1 }
                    : { y: '110%', opacity: 0 }
                }
                transition={{
                  duration,
                  delay: isInView
                    ? delay + i * stagger
                    : (parts.length - 1 - i) * (stagger * 0.4),
                  ease: isInView ? easeIn : easeOut,
                }}
              >
                {part}
              </motion.span>
            </span>
            {!isLast && splitBy === 'words' && (wrap ? ' ' : '\u00a0')}
          </Fragment>
        )
      })}
    </span>
  )
}
