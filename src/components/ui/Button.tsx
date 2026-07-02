import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md'
  showIcon?: boolean
  icon?: ReactNode
  iconClassName?: string
  as?: 'button' | 'span'
  to?: string
  href?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'>

export default function Button({
  children,
  className,
  size = 'md',
  showIcon = true,
  icon,
  iconClassName,
  as,
  to,
  href,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = clsx('sz-btn group', size === 'sm' && 'sz-btn--sm', className)

  const inner = (
    <>
      <span className="sz-btn__shine" aria-hidden />
      <span className="sz-btn__label">{children}</span>
      {showIcon && (
        <span className={clsx('sz-btn__icon', iconClassName)} aria-hidden>
          {icon ?? <ArrowUpRight className="sz-btn__arrow" strokeWidth={2.25} />}
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    )
  }

  if (as === 'span') {
    return (
      <span className={classes} {...(rest as HTMLAttributes<HTMLSpanElement>)}>
        {inner}
      </span>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {inner}
    </button>
  )
}
