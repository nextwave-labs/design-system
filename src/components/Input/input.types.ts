import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

/** Input tokens that can be overridden per instance through `style`. */
export type InputCssVariable =
  | '--flowi-input-fill'
  | '--flowi-input-stroke'
  | '--flowi-input-stroke-error'
  | '--flowi-input-stroke-disabled'
  | '--flowi-input-text'
  | '--flowi-input-placeholder'
  | '--flowi-input-slot-icon'

/** `style` with typed support for the input tokens. */
export type InputStyle = CSSProperties &
  Partial<Record<InputCssVariable, string>>

export type InputSlotPosition = 'start' | 'end'

export interface InputBaseProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'style'
> {
  /** Shows the error state and sets `aria-invalid`. */
  error?: boolean
  /** Content rendered before the field (for example a slot). */
  start?: ReactNode
  /** Content rendered after the field (for example a slot or button). */
  end?: ReactNode
  /** Applied to the outer wrapper, like `className`. */
  style?: InputStyle
}
