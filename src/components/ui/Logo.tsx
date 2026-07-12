import clsx from 'clsx'
import { useSiteAsset } from '../../providers/SiteAssetsProvider'

type LogoProps = {
  className?: string
  /** `dark` = on dark backgrounds (white wordmark), `light` = on light backgrounds (dark wordmark) */
  variant?: 'light' | 'dark'
  height?: number
}

export default function Logo({ className, variant = 'dark', height = 28 }: LogoProps) {
  const logoOnDark = useSiteAsset('brand.logoOnDark')
  const logoOnLight = useSiteAsset('brand.logoOnLight')

  return (
    <img
      src={variant === 'light' ? logoOnLight : logoOnDark}
      alt="Salezeus"
      className={clsx('w-auto object-contain', className)}
      style={{ height }}
      draggable={false}
    />
  )
}
