import clsx from 'clsx'

const LOGO_ON_DARK = '/images/brand/logo-wordmark.png'
const LOGO_ON_LIGHT = '/images/brand/logo-wordmark-on-light.png'

type LogoProps = {
  className?: string
  /** `dark` = on dark backgrounds (white wordmark), `light` = on light backgrounds (dark wordmark) */
  variant?: 'light' | 'dark'
  height?: number
}

export default function Logo({ className, variant = 'dark', height = 28 }: LogoProps) {
  return (
    <img
      src={variant === 'light' ? LOGO_ON_LIGHT : LOGO_ON_DARK}
      alt="Salezeus"
      className={clsx('w-auto object-contain', className)}
      style={{ height }}
      draggable={false}
    />
  )
}
