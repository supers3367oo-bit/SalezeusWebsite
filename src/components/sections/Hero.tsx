import { useState, useEffect, useCallback, useMemo } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import MouseSpotlight from '../ui/MouseSpotlight'
import { useLocale } from '../../providers/LocaleProvider'
import { useTeamMembers } from '../../i18n/useLocalizedData'

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`

const HERO_DOTS_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='5' cy='7' r='1.15' fill='%23040508' fill-opacity='0.06'/%3E%3Ccircle cx='17' cy='4' r='1' fill='%23040508' fill-opacity='0.12'/%3E%3Ccircle cx='26' cy='11' r='1.1' fill='%23040508' fill-opacity='0.05'/%3E%3Ccircle cx='9' cy='19' r='1' fill='%23040508' fill-opacity='0.14'/%3E%3Ccircle cx='22' cy='21' r='1.2' fill='%23040508' fill-opacity='0.08'/%3E%3Ccircle cx='14' cy='28' r='0.95' fill='%23040508' fill-opacity='0.16'/%3E%3Ccircle cx='28' cy='27' r='1' fill='%23040508' fill-opacity='0.07'/%3E%3Ccircle cx='3' cy='24' r='0.85' fill='%23040508' fill-opacity='0.1'/%3E%3C/svg%3E")`

export default function Hero() {
  const { t, dir } = useLocale()
  const isRtl = dir === 'rtl'
  const team = useTeamMembers()
  const N = team.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  )

  useEffect(() => {
    team.forEach((member) => {
      const img = new window.Image()
      img.src = member.src
    })
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [team])

  useEffect(() => {
    const id = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        setActiveIndex((p) => (isRtl ? (p - 1 + N) % N : (p + 1) % N))
        setTimeout(() => setIsAnimating(false), 650)
      }
    }, 1500)
    return () => clearInterval(id)
  }, [isAnimating, isRtl, N])

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return
      const step = direction === 'next' ? 1 : -1
      const signedStep = isRtl ? -step : step
      setIsAnimating(true)
      setActiveIndex((p) => (p + signedStep + N) % N)
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating, isRtl, N]
  )

  const centerIdx = activeIndex
  const leftIdx   = (activeIndex - 1 + N) % N
  const rightIdx  = (activeIndex + 1) % N
  const backIdx   = (activeIndex + 2) % N

  const TRANSITION = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)'

  const getRoleStyle = (idx: number): React.CSSProperties => {
    const parallaxX = idx === centerIdx && !isMobile ? mouse.x * 12 * (isRtl ? -1 : 1) : 0
    const parallaxY = idx === centerIdx && !isMobile ? mouse.y * 8 : 0
    const isLeftSlot = isRtl ? idx === rightIdx : idx === leftIdx
    const isRightSlot = isRtl ? idx === leftIdx : idx === rightIdx

    if (isMobile) {
      if (idx === centerIdx) return {
        transform: 'translateX(-50%)',
        filter: 'none',
        opacity: 1,
        zIndex: 30,
        left: '50%',
        width: '82%',
        height: '86%',
        bottom: '0%',
        overflow: 'hidden',
        transition: TRANSITION,
        willChange: 'transform, filter, opacity',
      }
      if (isLeftSlot) return {
        transform: 'translateX(-50%)',
        filter: 'blur(2px)',
        opacity: 0.55,
        zIndex: 10,
        left: '8%',
        width: '24%',
        height: '40%',
        bottom: '6%',
        transition: TRANSITION,
        willChange: 'transform, filter, opacity',
      }
      if (isRightSlot) return {
        transform: 'translateX(-50%)',
        filter: 'blur(2px)',
        opacity: 0.55,
        zIndex: 10,
        left: '92%',
        width: '24%',
        height: '40%',
        bottom: '6%',
        transition: TRANSITION,
        willChange: 'transform, filter, opacity',
      }
      return {
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 1,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '10%',
        bottom: 0,
        transition: TRANSITION,
      }
    }

    if (idx === centerIdx) return {
      transform: `translateX(calc(-50% + ${parallaxX}px)) translateY(${parallaxY}px) scale(1.9)`,
      filter: 'none',
      opacity: 1,
      zIndex: 20,
      left: '50%',
      height: '56%',
      bottom: '0',
      overflow: 'hidden',
      transition: TRANSITION,
      willChange: 'transform, filter, opacity',
    }
    if (isLeftSlot) return {
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(1.5px)',
      opacity: 0.7,
      zIndex: 10,
      left: '27%',
      height: '30%',
      bottom: '10%',
      transition: TRANSITION,
      willChange: 'transform, filter, opacity',
    }
    if (isRightSlot) return {
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(1.5px)',
      opacity: 0.7,
      zIndex: 10,
      left: '73%',
      height: '30%',
      bottom: '10%',
      transition: TRANSITION,
      willChange: 'transform, filter, opacity',
    }
    if (idx === backIdx) return {
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(3px)',
      opacity: 0.45,
      zIndex: 5,
      left: '50%',
      height: '20%',
      bottom: '10%',
      transition: TRANSITION,
      willChange: 'transform, filter, opacity',
    }
    return {
      opacity: 0,
      pointerEvents: 'none',
      zIndex: 1,
      left: '50%',
      transform: 'translateX(-50%) scale(0.4)',
      height: '10%',
      bottom: 0,
      transition: TRANSITION,
    }
  }

  const circleBtnStyle: React.CSSProperties = {
    width:  isMobile ? 42 : 56,
    height: isMobile ? 42 : 56,
    background: 'transparent',
    border: '1.5px solid rgba(4,5,8,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#040508',
    transition: 'transform 150ms ease, background-color 150ms ease, border-color 150ms ease',
    flexShrink: 0,
  }

  const activeMember = team[activeIndex]

  const teamPanel = (
    <>
      <div
        className="min-w-0"
        style={{ maxWidth: isMobile ? (isRtl ? 'calc(100% - 132px)' : 'calc(100% - 96px)') : 360 }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: isRtl ? 'none' : 'uppercase',
            letterSpacing: isRtl ? '0.04em' : '0.2em',
            color: 'rgba(4,5,8,0.35)',
            marginBottom: isMobile ? 4 : 6,
            fontFamily: 'var(--font-body)',
          }}
        >
          {t('hero.ourTeam')}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: isMobile ? 8 : 16 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: isMobile ? 16 : 24,
                fontWeight: 700,
                color: '#040508',
                letterSpacing: isRtl ? 0 : '-0.01em',
                lineHeight: 1.2,
                marginBottom: 4,
              }}
            >
              {activeMember.name}
            </p>
            <span
              style={{
                display: 'inline-block',
                fontSize: isMobile ? 11 : 12,
                fontWeight: 500,
                fontFamily: 'var(--font-body)',
                color: '#3258A4',
                background: 'rgba(50,88,164,0.1)',
                border: '1px solid rgba(50,88,164,0.18)',
                borderRadius: 99,
                padding: '3px 10px',
                letterSpacing: '0.02em',
              }}
            >
              {activeMember.role}
            </span>
            {!isMobile && (
              <p
                style={{
                  marginTop: 10,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(4,5,8,0.55)',
                  lineHeight: 1.5,
                  letterSpacing: '0.01em',
                }}
              >
                {activeMember.bio}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('prev')}
            style={circleBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)'
              e.currentTarget.style.backgroundColor = 'rgba(4,5,8,0.06)'
              e.currentTarget.style.borderColor = 'rgba(4,5,8,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(4,5,8,0.2)'
            }}
          >
            <ArrowLeft size={isMobile ? 16 : 20} strokeWidth={2} />
          </button>
          <button
            onClick={() => navigate('next')}
            style={circleBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)'
              e.currentTarget.style.backgroundColor = 'rgba(4,5,8,0.06)'
              e.currentTarget.style.borderColor = 'rgba(4,5,8,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(4,5,8,0.2)'
            }}
          >
            <ArrowRight size={isMobile ? 16 : 20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <a
        href="#solutions"
        data-scroll-to
        dir={dir}
        className="flex shrink-0 items-center gap-1.5 sm:gap-2 overflow-visible"
        style={{
          fontFamily: isRtl ? 'var(--font-heading)' : 'var(--font-display)',
          fontSize: isMobile
            ? isRtl
              ? 'clamp(14px, 3.8vw, 18px)'
              : 'clamp(15px, 4.5vw, 22px)'
            : 'clamp(18px, 3vw, 44px)',
          fontWeight: isRtl ? 700 : 400,
          color: '#040508',
          letterSpacing: isRtl ? 0 : '-0.02em',
          lineHeight: isRtl ? 1.4 : 1.1,
          textTransform: isRtl ? 'none' : 'uppercase',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          alignSelf: 'flex-end',
          paddingBottom: isMobile ? 2 : 0,
        }}
      >
        {t('hero.explore')}
        <ArrowRight
          strokeWidth={2.25}
          style={{
            width: isMobile ? 'clamp(14px, 4vw, 20px)' : 'clamp(16px, 2.5vw, 36px)',
            height: isMobile ? 'clamp(14px, 4vw, 20px)' : 'clamp(16px, 2.5vw, 36px)',
            transform: isRtl
              ? `translateY(${isMobile ? 5 : 7}px) scaleX(-1)`
              : `translateY(${isMobile ? 4 : 6}px)`,
          }}
        />
      </a>
    </>
  )

  return (
    <MouseSpotlight
      className="relative w-full"
      color="4, 5, 8"
      size={700}
      opacity={0.06}
    >
    <section
      className="relative w-full overflow-hidden section-surface"
      onMouseMove={(e) => {
        if (isMobile) return
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        setMouse({ x, y })
      }}
    >
      <div
        className={isMobile ? 'flex flex-col' : 'relative'}
        style={{ height: '100dvh', minHeight: 560, overflow: 'hidden' }}
      >
        <div
          className={isMobile ? 'relative min-h-0 flex-1 overflow-visible' : 'absolute inset-0'}
        >

        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden
          style={{
            zIndex: 1,
            backgroundColor: 'var(--color-surface)',
            backgroundImage: HERO_DOTS_PATTERN,
            backgroundSize: '32px 32px',
            backgroundRepeat: 'repeat',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            zIndex: 50,
            backgroundImage: GRAIN,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.5,
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMember.name}
            className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none px-3 sm:px-6"
            style={{ zIndex: 2, top: isMobile ? '33%' : '12%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: isMobile
                  ? activeMember.heroNameSize === 'compact'
                    ? 'clamp(58px, 16vw, 102px)'
                    : 'clamp(72px, 20vw, 138px)'
                  : activeMember.heroNameSize === 'compact'
                    ? 'clamp(60px, 17vw, 240px)'
                    : 'clamp(72px, 22vw, 300px)',
                fontWeight: 900,
                color: '#3258A4',
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: isMobile ? '-0.04em' : '-0.02em',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                width: isMobile ? '100%' : 'auto',
                maxWidth: '100%',
                userSelect: 'none',
              }}
            >
              {activeMember.heroName}
            </span>
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute top-[76px] sm:top-[88px] right-4 sm:right-8 flex gap-1.5"
          style={{ zIndex: 60 }}
        >
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isAnimating && i !== activeIndex) {
                  setIsAnimating(true)
                  setActiveIndex(i)
                  setTimeout(() => setIsAnimating(false), 650)
                }
              }}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activeIndex ? '#040508' : 'rgba(4,5,8,0.18)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{ zIndex: 3, overflow: isMobile ? 'visible' : 'hidden' }}
        >
          {team.map((member, idx) => {
            const isCenter = idx === centerIdx
            const isVisibleOnMobile =
              !isMobile || idx === centerIdx || idx === leftIdx || idx === rightIdx
            if (!isVisibleOnMobile) return null
            return (
            <div
              key={idx}
              className="absolute"
              style={{
                ...getRoleStyle(idx),
                aspectRatio: isCenter || isMobile ? undefined : '0.7 / 1',
              }}
            >
              {isCenter && isMobile ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={member.src}
                    alt={member.name}
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition:
                        member.firstName.toLowerCase().includes('ibrahim') ||
                        member.name.toLowerCase().includes('ibrahim')
                          ? 'top center'
                          : 'top center',
                      transform:
                        member.firstName.toLowerCase().includes('ibrahim') ||
                        member.name.toLowerCase().includes('ibrahim')
                          ? 'scale(2.75)'
                          : 'scale(3.25)',
                      transformOrigin: 'top center',
                      userSelect: 'none',
                    }}
                  />
                </div>
              ) : (
                <img
                  src={member.src}
                  alt={member.name}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: isCenter ? '160%' : '100%',
                    objectFit: 'contain',
                    objectPosition: isCenter ? 'bottom center' : 'bottom center',
                    userSelect: 'none',
                  }}
                />
              )}
            </div>
            )
          })}
        </div>

        </div>

        {isMobile ? (
          <div
            className="shrink-0 border-t border-sz-border/70"
            style={{
              backgroundColor: 'var(--color-surface)',
              paddingTop: 12,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 'max(12px, env(safe-area-inset-bottom, 0px))',
            }}
          >
            <div className="flex items-end justify-between gap-3">
              {teamPanel}
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-x-0 flex items-end justify-between gap-3"
            style={{
              zIndex: 60,
              bottom: 48,
              paddingLeft: 52,
              paddingRight: 52,
            }}
          >
            {teamPanel}
          </div>
        )}

      </div>
    </section>
    </MouseSpotlight>
  )
}
