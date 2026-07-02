import { useReducedMotion } from 'framer-motion'
import Aurora from '../ui/Aurora'
import Threads from '../ui/backgrounds/Threads'
import DotGrid from '../ui/backgrounds/DotGrid'

export default function ContactBackground() {
  const reduce = useReducedMotion() ?? false

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 opacity-[0.55]">
        <Aurora
          colorStops={['#3258A4', '#1a2d52', '#040508']}
          amplitude={0.75}
          blend={0.38}
          speed={0.45}
        />
      </div>

      {!reduce && (
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <Threads
            color={[0.2, 0.35, 0.64]}
            amplitude={1.1}
            distance={0.35}
            enableMouseInteraction
          />
        </div>
      )}

      {!reduce && (
        <DotGrid
          className="!h-full !w-full !p-0 opacity-60"
          dotSize={4}
          gap={36}
          baseColor="#1a2438"
          activeColor="#3258A4"
          proximity={120}
          shockRadius={180}
          shockStrength={4}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(50,88,164,0.2) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 90% 85%, rgba(240,184,13,0.08) 0%, transparent 50%), linear-gradient(180deg, rgba(4,5,8,0.2) 0%, rgba(4,5,8,0.92) 100%)',
        }}
      />
    </div>
  )
}
