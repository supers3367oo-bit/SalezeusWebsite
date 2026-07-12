import { useEffect, useMemo, useRef } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { useReducedMotion } from 'framer-motion'
import type { RegionMarker } from './globe/locations'
import { useLocale } from '../../../providers/LocaleProvider'
import { useSiteAsset } from '../../../providers/SiteAssetsProvider'
import { getGlobeLocations } from '../../../data/localized'

const MAP_ASPECT_RATIO = 14078 / 3541

/** Calibrated to pin positions in `locations.ts` (Turkey + Syria cluster). */
const MOBILE_MAP_ZOOM = 3.1
const MOBILE_FOCUS_X = 0.545
const MOBILE_FOCUS_Y = 0.625

const PIN_GOLD = '#F0B80D'
const PIN_GOLD_SOFT = 'rgba(240, 184, 13, 0.45)'

function RegionCard({ region }: { region: RegionMarker }) {
  return (
    <div
      className="rounded-lg px-3 py-2.5 w-max max-w-[148px] sm:max-w-[168px] border border-white/10 bg-[rgba(4,5,8,0.78)] backdrop-blur-sm"
      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}
    >
      <p
        className="text-white leading-tight"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 600 }}
      >
        {region.country}
      </p>
      <p
        className="text-white/45 mt-0.5 leading-snug"
        style={{ fontFamily: 'var(--font-body)', fontSize: 11 }}
      >
        {region.cities}
      </p>
    </div>
  )
}

function GlowingPin({ reduce }: { reduce: boolean }) {
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || !pulseRef.current) return

    const rings = pulseRef.current.querySelectorAll('.presence-pulse-ring')
    const ctx = gsap.context(() => {
      rings.forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { scale: 0.35, opacity: 0.7 },
          {
            scale: 3.2,
            opacity: 0,
            duration: 2.8,
            repeat: -1,
            ease: 'power1.out',
            delay: i * 0.85,
          }
        )
      })
    }, pulseRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <div className="relative shrink-0" aria-hidden>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 56,
          height: 56,
          background: `radial-gradient(circle, ${PIN_GOLD_SOFT} 0%, rgba(240,184,13,0.12) 42%, transparent 72%)`,
          filter: 'blur(2px)',
        }}
      />

      <div
        ref={pulseRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
      >
        {!reduce &&
          [0, 1, 2].map((i) => (
            <span
              key={i}
              className="presence-pulse-ring absolute inset-0 rounded-full"
              style={{ border: `1px solid ${PIN_GOLD}`, opacity: 0 }}
            />
          ))}
      </div>

      <span
        className="relative block w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full"
        style={{
          background: PIN_GOLD,
          boxShadow: `0 0 18px ${PIN_GOLD}, 0 0 36px rgba(240,184,13,0.55), 0 0 64px rgba(240,184,13,0.25)`,
        }}
      />
    </div>
  )
}

function LocationMarker({ region, reduce }: { region: RegionMarker; reduce: boolean }) {
  const isTopLeft = region.cardPlacement === 'top-left'
  const position = region.mapPosition

  return (
    <div
      className="absolute z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <GlowingPin reduce={reduce} />

        <div
          className={clsx(
            'absolute w-max',
            'max-lg:left-1/2 max-lg:top-[calc(100%+10px)] max-lg:-translate-x-1/2 max-lg:right-auto max-lg:bottom-auto',
            isTopLeft
              ? 'lg:right-[calc(100%+14px)] lg:bottom-[calc(100%+8px)]'
              : 'lg:left-[calc(100%+14px)] lg:top-[calc(100%+8px)]'
          )}
        >
          <RegionCard region={region} />
        </div>

        <span className="sr-only">
          {region.country} — {region.cities}
        </span>
      </div>
    </div>
  )
}

type PresenceMapProps = {
  className?: string
}

export default function PresenceMap({ className = '' }: PresenceMapProps) {
  const { locale, t } = useLocale()
  const regions = useMemo(() => getGlobeLocations(locale), [locale])
  const reduceMotion = useReducedMotion()
  const reduce = reduceMotion ?? false
  const mapImage = useSiteAsset('about.map')

  return (
    <div
      dir="ltr"
      className={`relative w-full overflow-hidden lg:overflow-visible ${className}`}
    >
      <div
        className="presence-map__viewport relative w-full"
        style={{
          ['--map-zoom' as string]: MOBILE_MAP_ZOOM,
          ['--focus-x' as string]: MOBILE_FOCUS_X,
          ['--focus-y' as string]: MOBILE_FOCUS_Y,
        }}
      >
        <div className="presence-map__frame relative">
          <img
            src={mapImage}
            alt={t('experience.map.alt')}
            className="presence-map__image block h-auto w-full pointer-events-none select-none"
            draggable={false}
          />

          <div className="absolute inset-0">
            <div className="presence-map__fade presence-map__fade--top" aria-hidden />
            <div className="presence-map__fade presence-map__fade--bottom" aria-hidden />

            {regions.map((region) => (
              <LocationMarker key={region.id} region={region} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .presence-map__viewport {
          min-height: clamp(250px, 62vw, 340px);
        }

        @media (min-width: 1024px) {
          .presence-map__viewport {
            min-height: 0;
            aspect-ratio: ${MAP_ASPECT_RATIO};
          }

          .presence-map__frame {
            position: absolute !important;
            inset: 0;
            width: 100% !important;
          }

          .presence-map__image {
            position: absolute;
            inset: 0;
            height: 100%;
            object-fit: contain;
            object-position: 50% 58%;
          }
        }

        .presence-map__image {
          opacity: 0.92;
        }

        .presence-map__fade {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }

        .presence-map__fade--top {
          inset: 0 0 58% 0;
          background: linear-gradient(180deg, #040508 0%, rgba(4,5,8,0.7) 40%, transparent 100%);
        }

        .presence-map__fade--bottom {
          inset: 88% 0 0 0;
          background: linear-gradient(0deg, #040508 0%, transparent 100%);
        }

        @media (max-width: 1023px) {
          .presence-map__frame {
            width: calc(var(--map-zoom) * 100%);
            left: calc(50% - var(--focus-x) * var(--map-zoom) * 100%);
            top: calc(44% - var(--focus-y) * var(--map-zoom) * 34%);
          }

          .presence-map__image {
            opacity: 0.98;
          }

          .presence-map__fade--top {
            inset: 0 0 62% 0;
            background: linear-gradient(180deg, #040508 0%, rgba(4,5,8,0.35) 28%, transparent 100%);
          }

          .presence-map__fade--bottom {
            inset: 86% 0 0 0;
          }
        }
      `}</style>
    </div>
  )
}

export { RegionCard }
