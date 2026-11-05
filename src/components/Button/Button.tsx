'use client'
import { tv, type VariantProps } from 'tailwind-variants/lite'
import styles from './Button.module.css'

const buttonVariants = tv({
  base: styles.button,
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, class: className })}
      {...rest}
    >
      {children}
    </button>
  )
}
