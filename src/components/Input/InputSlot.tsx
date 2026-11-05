import type { HTMLAttributes } from 'react'
import type { InputSlotPosition } from './input.types'
import { inputVariants } from './input.variants'

interface InputSlotProps extends HTMLAttributes<HTMLSpanElement> {
  position: InputSlotPosition
}

/** Decorative filled slot that holds an icon. */
export function InputSlot({ position, className, ...rest }: InputSlotProps) {
  return (
    <span
      aria-hidden='true'
      className={inputVariants({ position }).slot({ class: className })}
      {...rest}
    />
  )
}

/** Decorative trailing icon without a filled slot. */
export function InputTrailingIcon({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden='true'
      className={inputVariants().trailingIcon({ class: className })}
      {...rest}
    />
  )
}
