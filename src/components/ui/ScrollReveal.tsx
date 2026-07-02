import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealProps = {
  children: string
  className?: string
  textClassName?: string
  enableBlur?: boolean
  blurStrength?: number
  baseOpacity?: number
  baseRotation?: number
  scrollStart?: string
  scrollEnd?: string
}

export default function ScrollReveal({
  children,
  className = '',
  textClassName = '',
  enableBlur = true,
  blurStrength = 5,
  baseOpacity = 0.12,
  baseRotation = 2,
  scrollStart = 'top bottom-=15%',
  scrollEnd = 'top center',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  const splitText = useMemo(
    () =>
      children.split(/(\s+)/).map((segment, index) => {
        if (segment.match(/^\s+$/)) return segment
        return (
          <span className="inline-block word" key={index}>
            {segment}
          </span>
        )
      }),
    [children]
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller = document.documentElement
    const wordElements = el.querySelectorAll('.word')

    const rotationTween = gsap.fromTo(
      el,
      { rotate: baseRotation, transformOrigin: '0% 50%' },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      }
    )

    const opacityTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      }
    )

    let blurTween: gsap.core.Tween | undefined
    if (enableBlur) {
      blurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      )
    }

    return () => {
      rotationTween.scrollTrigger?.kill()
      rotationTween.kill()
      opacityTween.scrollTrigger?.kill()
      opacityTween.kill()
      blurTween?.scrollTrigger?.kill()
      blurTween?.kill()
    }
  }, [children, enableBlur, blurStrength, baseOpacity, baseRotation, scrollStart, scrollEnd])

  return (
    <p ref={containerRef} className={className}>
      <span className={textClassName}>{splitText}</span>
    </p>
  )
}
