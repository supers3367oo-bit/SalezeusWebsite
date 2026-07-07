import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import type { TeamMember } from '../../../data/team'
import { useLocale } from '../../../providers/LocaleProvider'
import { useTeamMembers } from '../../../i18n/useLocalizedData'
import { refreshLocomotiveScroll } from '../../../lib/locomotive'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'power3.out'

function RolePill({ role, variant }: { role: string; variant: 'dark' | 'light' }) {
  return (
    <span
      className={clsx(
        'inline-block rounded-full px-2.5 py-1 text-[10px] font-medium leading-none sm:text-[11px]',
        variant === 'dark'
          ? 'border border-white/10 bg-white/[0.08] text-white/90'
          : 'border border-sz-interaction/15 bg-sz-interaction-soft text-sz-interaction'
      )}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {role}
    </span>
  )
}

function MemberPhoto({
  src,
  alt,
  fallbackSrc,
  imgRef,
  className,
  style,
}: {
  src: string
  alt: string
  fallbackSrc?: string
  imgRef?: RefObject<HTMLImageElement>
  className?: string
  style?: React.CSSProperties
}) {
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      draggable={false}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc)
      }}
      className={clsx('pointer-events-none h-full w-full select-none', className)}
      style={style}
    />
  )
}

function MemberCard({
  member,
  index,
  isActive,
  isDimmed,
  reduce,
  onActivate,
}: {
  member: TeamMember
  index: number
  isActive: boolean
  isDimmed: boolean
  reduce: boolean
  onActivate: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLImageElement>(null)
  const realRef = useRef<HTMLImageElement>(null)
  const nameCardRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const card = cardRef.current
    const avatar = avatarRef.current
    const real = realRef.current
    const nameCard = nameCardRef.current
    const info = infoRef.current
    if (!card || !avatar || !real || !nameCard || !info) return

    tweenRef.current?.kill()

    const expandInfo = () => {
      gsap.set(info, { visibility: 'visible', overflow: 'hidden', height: 'auto' })
      const h = info.offsetHeight
      gsap.set(info, { height: 0, opacity: 0 })
      return gsap.to(info, {
        height: h,
        opacity: 1,
        duration: reduce ? 0 : 0.45,
        ease: EASE,
        onComplete: () => gsap.set(info, { height: 'auto', overflow: 'visible' }),
      })
    }

    const collapseInfo = () => {
      const h = info.offsetHeight
      gsap.set(info, { height: h, overflow: 'hidden' })
      return gsap.to(info, {
        height: 0,
        opacity: 0,
        duration: reduce ? 0 : 0.38,
        ease: EASE,
        onComplete: () => gsap.set(info, { visibility: 'hidden' }),
      })
    }

    if (reduce) {
      gsap.set(card, {
        scale: isActive ? 1.04 : isDimmed ? 0.98 : 1,
        opacity: isActive || !isDimmed ? 1 : 0.55,
      })
      gsap.set(avatar, { opacity: isActive ? 0 : 1 })
      gsap.set(real, { opacity: isActive ? 1 : 0 })
      gsap.set(nameCard, { opacity: isActive ? 0 : 1, height: isActive ? 0 : 'auto' })
      gsap.set(info, {
        height: isActive ? 'auto' : 0,
        opacity: isActive ? 1 : 0,
        visibility: isActive ? 'visible' : 'hidden',
      })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: EASE } })
    tweenRef.current = tl

    if (isActive) {
      tl.to(card, { scale: 1.04, opacity: 1, duration: 0.35 }, 0)
      tl.to(avatar, { opacity: 0, duration: 0.4 }, 0)
      tl.to(real, { opacity: 1, duration: 0.4 }, 0)
      tl.to(nameCard, { opacity: 0, height: 0, duration: 0.25 }, 0)
      tl.add(expandInfo(), 0.06)
    } else {
      tl.to(card, { scale: isDimmed ? 0.98 : 1, opacity: isDimmed ? 0.55 : 1, duration: 0.35 }, 0)
      tl.to(avatar, { opacity: 1, duration: 0.38 }, 0)
      tl.to(real, { opacity: 0, duration: 0.38 }, 0)
      if (info.style.visibility === 'visible' || info.offsetHeight > 0) {
        tl.add(collapseInfo(), 0)
        tl.to(nameCard, { opacity: 1, height: 'auto', duration: 0.3 }, 0.12)
      } else {
        gsap.set(info, { height: 0, opacity: 0, visibility: 'hidden' })
        gsap.set(nameCard, { opacity: 1, height: 'auto' })
      }
    }

    return () => {
      tweenRef.current?.kill()
    }
  }, [isActive, isDimmed, reduce])

  return (
    <article
      className={clsx('team-card relative', isActive && 'z-20')}
      data-member={member.src}
    >
      <button
        type="button"
        className="w-full cursor-pointer border-0 bg-transparent p-0 text-start"
        onMouseEnter={() => !reduce && onActivate()}
        onFocus={onActivate}
        onClick={onActivate}
        aria-label={`${member.name}, ${member.role}`}
        aria-expanded={isActive}
      >
        <div ref={cardRef} className="flex flex-col will-change-transform" style={{ transformOrigin: 'center bottom' }}>
          <div
            className={clsx(
              'relative overflow-hidden rounded-2xl border bg-white/[0.02] transition-colors duration-300',
              isActive ? 'border-white/20' : 'border-white/[0.08]'
            )}
            style={{ aspectRatio: '3/4' }}
          >
            <span
              className="absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[9px] tracking-widest text-white/50 backdrop-blur-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <MemberPhoto
              imgRef={avatarRef}
              src={member.src}
              alt={member.name}
              className="absolute inset-0 object-contain object-top scale-[2.2] origin-top"
            />
            <MemberPhoto
              imgRef={realRef}
              src={member.realSrc}
              alt=""
              fallbackSrc={member.src}
              aria-hidden
              className="absolute inset-0 object-cover object-top"
              style={{ opacity: 0 }}
            />

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
              style={{
                background: 'linear-gradient(to top, rgba(4,5,8,0.92) 0%, transparent 100%)',
              }}
              aria-hidden
            />
          </div>

          <div className="relative -mt-5 px-1">
            <div
              ref={nameCardRef}
              className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0d12]/90 px-3.5 py-3 backdrop-blur-md"
            >
              <p
                className="truncate text-white"
                style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 600 }}
              >
                {member.name}
              </p>
              <div className="mt-2">
                <RolePill role={member.role} variant="dark" />
              </div>
            </div>

            <div
              ref={infoRef}
              className="overflow-hidden"
              style={{ height: 0, opacity: 0, visibility: 'hidden' }}
              aria-hidden={!isActive}
            >
              <div
                className="rounded-xl border border-white/10 bg-white px-4 py-4 sm:px-5 sm:py-5"
                style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}
              >
                <RolePill role={member.role} variant="light" />
                <h3
                  className="mt-3 text-sz-interaction leading-tight"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="mt-2.5 line-clamp-[7] text-sz-primary/65"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.7 }}
                >
                  {member.aboutBio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </article>
  )
}

function TeamRow({
  members,
  rowOffset,
  columns,
  activeSrc,
  onActivate,
  onDeactivate,
  reduce,
}: {
  members: TeamMember[]
  rowOffset: number
  columns: 3 | 4
  activeSrc: string | null
  onActivate: (src: string) => void
  onDeactivate: () => void
  reduce: boolean
}) {
  return (
    <div
      onMouseLeave={() => !reduce && onDeactivate()}
      className={clsx(
        'team-row grid gap-4 sm:gap-5 lg:gap-6',
        columns === 4
          ? 'grid-cols-2 sm:grid-cols-4'
          : 'mx-auto w-full max-w-[min(100%,900px)] grid-cols-2 sm:grid-cols-3'
      )}
    >
      {members.map((member, i) => (
        <MemberCard
          key={member.src}
          member={member}
          index={rowOffset + i}
          isActive={activeSrc === member.src}
          isDimmed={activeSrc !== null && activeSrc !== member.src}
          reduce={reduce}
          onActivate={() => onActivate(member.src)}
        />
      ))}
    </div>
  )
}

export default function ExperienceTeam() {
  const { t, dir } = useLocale()
  const team = useTeamMembers()
  const teamRows = useMemo(
    () => [
      { members: team.slice(0, 4), columns: 4 as const, offset: 0 },
      { members: team.slice(4, 8), columns: 4 as const, offset: 4 },
      { members: team.slice(8, 11), columns: 3 as const, offset: 8 },
    ],
    [team]
  )

  const reduceMotion = useReducedMotion()
  const reduce = reduceMotion ?? false
  const [activeSrc, setActiveSrc] = useState<string | null>(null)

  const sectionRef = useRef<HTMLElement>(null)

  const activate = useCallback((src: string) => setActiveSrc(src), [])
  const deactivate = useCallback(() => setActiveSrc(null), [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reduce) return

    const ctx = gsap.context(() => {
      gsap.from('#team-heading', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
      })

      gsap.from('.team-card', {
        y: 28,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: EASE,
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' },
      })

      ScrollTrigger.refresh()
      refreshLocomotiveScroll()
    }, section)

    return () => ctx.revert()
  }, [reduce, team])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden bg-[#040508] py-20 sm:py-24 lg:py-28"
      id="team"
      aria-labelledby="team-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(50,88,164,0.1) 0%, transparent 55%)',
        }}
      />

      <div className="section-container relative z-10">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <p
            className={clsx(
              'mb-3 text-[11px] text-white/35',
              dir === 'rtl' ? 'tracking-[0.04em]' : 'uppercase tracking-[0.22em]'
            )}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('experience.team.specialistsCount').replace('{count}', String(team.length))}
          </p>
          <h2
            id="team-heading"
            className="text-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            {t('experience.team.title')}
          </h2>
        </header>

        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {teamRows.map((row, i) => (
            <TeamRow
              key={i}
              members={row.members}
              rowOffset={row.offset}
              columns={row.columns}
              activeSrc={activeSrc}
              onActivate={activate}
              onDeactivate={deactivate}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
