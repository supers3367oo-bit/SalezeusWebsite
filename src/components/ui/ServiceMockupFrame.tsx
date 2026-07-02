type MockupVariant = 'browser' | 'phone' | 'showcase'

type Props = {
  image: string
  alt: string
  variant?: MockupVariant
  className?: string
  compact?: boolean
}

export default function ServiceMockupFrame({
  image,
  alt,
  variant = 'showcase',
  className = '',
  compact = false,
}: Props) {
  if (variant === 'browser') {
    return (
      <div
        className={`relative rounded-card overflow-hidden bg-[#1a1d24] shadow-[0_24px_64px_-12px_rgba(4,5,8,0.22)] ${compact ? 'max-h-[min(220px,30vh)]' : ''} ${className}`}
      >
        <div className={`flex items-center gap-2 border-b border-white/[0.06] ${compact ? 'px-3 py-2' : 'px-4 py-3'}`}>
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </span>
          <div className="flex-1 mx-2 h-6 rounded bg-white/[0.06] flex items-center px-3">
            <span className="text-[10px] text-white/35 truncate" style={{ fontFamily: 'var(--font-mono)' }}>
              salezeus.com
            </span>
          </div>
        </div>
        <div className={`overflow-card bg-[#0e1014] ${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover object-top rounded-card"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    )
  }

  if (variant === 'phone') {
    return (
      <div
        className={`relative flex justify-center items-center ${compact ? 'h-[min(200px,28vh)]' : ''} ${className}`}
      >
        <div className={`relative ${compact ? 'h-full' : 'w-[58%] max-w-[220px]'}`}>
          <div
            className={`rounded-card p-[10px] bg-[#1a1d24] shadow-[0_28px_70px_-16px_rgba(4,5,8,0.28)] ${compact ? 'h-full' : ''}`}
          >
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[28%] h-[5px] rounded-full bg-black/50 z-10" />
            <div
              className={`overflow-card bg-[#0e1014] ${compact ? 'h-full aspect-[9/19.5]' : 'aspect-[9/19.5]'}`}
            >
              <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover object-top rounded-card"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
          <div
            className="absolute -inset-x-6 -bottom-4 h-16 rounded-full blur-2xl opacity-40 -z-10"
            style={{ background: 'radial-gradient(ellipse, rgba(50,88,164,0.35) 0%, transparent 70%)' }}
          />
        </div>
        <div className="absolute inset-0 -z-20 rounded-card bg-gradient-to-br from-sz-surface to-white/60" />
      </div>
    )
  }

  return (
    <div
      className={`relative rounded-card overflow-hidden bg-gradient-to-br from-[#EEEDEB] via-sz-surface to-white shadow-[0_20px_56px_-14px_rgba(4,5,8,0.14)] ${
        compact ? 'aspect-[16/10] max-h-[min(220px,30vh)] w-full' : 'aspect-[4/3]'
      } ${className}`}
    >
      <div className={`absolute inset-0 flex items-center justify-center overflow-card ${compact ? 'p-4 lg:p-5' : 'p-6 lg:p-8'}`}>
        <img
          src={image}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-card drop-shadow-[0_12px_32px_rgba(4,5,8,0.12)] transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-black/[0.04]" />
    </div>
  )
}
