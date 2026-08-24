import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

interface ButtonBaseProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  /** Renderiza como <Link> do react-router quando informado. */
  to?: string
  /** Renderiza como âncora externa quando informado. */
  href?: string
}

export type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>

const VARIANTES: Record<ButtonVariant, string> = {
  primary: 'bg-soul text-white border border-soul hover:bg-soul-deep hover:border-soul-deep',
  secondary: 'bg-transparent text-soul border border-soul hover:bg-soul-wash',
  ghost: 'bg-transparent text-soul border border-transparent hover:bg-soul-wash',
}

const TAMANHOS: Record<ButtonSize, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-pill font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soul focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTES[variant]} ${TAMANHOS[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
