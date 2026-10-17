'use client'
import { tv } from 'tailwind-variants/lite'
import styles from './Button.module.css'

const buttonVariants = tv({
  slots: {
    base: styles.button,
    icon: styles.icon,
  },
  variants: {
    variant: {
      primary: { base: styles.primary },
      secondary: { base: styles.secondary },
      tertiary: { base: styles.tertiary },
      text: { base: styles.text },
    },
    size: {
      sm: { base: styles.sm },
      md: { base: styles.md },
      lg: { base: styles.lg },
      xl: { base: styles.xl },
    },
    iconOnly: {
      true: { base: styles.iconOnly },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    iconOnly: false,
  },
})

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Optional leading icon. Inherits the text color of each state. */
  icon?: React.ReactNode
}

type ButtonLabelProps = ButtonBaseProps & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text'
  iconOnly?: false
}

/** Circular, label-less button. Always primary and needs an accessible name. */
type ButtonIconOnlyProps = ButtonBaseProps & {
  'variant'?: 'primary'
  'iconOnly': true
  'icon': React.ReactNode
  'aria-label': string
}

export type ButtonProps = ButtonLabelProps | ButtonIconOnlyProps

export function Button({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonVariants({
    variant: iconOnly ? 'primary' : variant,
    size,
    iconOnly,
  })

  return (
    <button className={classes.base({ class: className })} {...rest}>
      {icon && (
        <span className={classes.icon()} aria-hidden='true'>
          {icon}
        </span>
      )}
      {!iconOnly && children}
    </button>
  )
}
