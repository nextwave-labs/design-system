import type { SVGProps } from 'react'
import { tv } from 'tailwind-variants/lite'
import styles from './Icon.module.css'

const iconVariants = tv({ base: styles.icon })

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Accessible name. Without `title` or `aria-label` the icon is decorative
   * and hidden from assistive technology.
   */
  title?: string
}

/**
 * Base for every Flowi icon: a 24×24 outline SVG that draws with
 * `currentColor` and is sized by the `--flowi-icon-size-*` tokens.
 * Resize it through `className` or `style` (width and height).
 */
export function Icon({
  title,
  className,
  children,
  'aria-label': ariaLabel,
  ...rest
}: IconProps) {
  const labelled = Boolean(title || ariaLabel)

  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      focusable='false'
      className={iconVariants({ class: className })}
      role={labelled ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={labelled ? undefined : true}
      {...rest}
    >
      {title ?
        <title>{title}</title>
      : null}
      {children}
    </svg>
  )
}
