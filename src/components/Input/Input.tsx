'use client'
import { forwardRef, useMemo, type ReactNode } from 'react'
import { AlertIcon } from '../../icons'
import { InputBase } from './InputBase'
import { InputSlot, InputTrailingIcon } from './InputSlot'
import type { InputBaseProps } from './input.types'
import { hasContent, isInvalid, resolveIcon } from './input.utils'

const DEFAULT_ERROR_ICON = <AlertIcon />

export interface InputProps extends Omit<InputBaseProps, 'start' | 'end'> {
  /** Leading icon, shown in a filled slot. */
  icon?: ReactNode
  /**
   * Icon shown in the error state. Defaults to an alert icon; pass `null` to
   * show none.
   */
  errorIcon?: ReactNode
}

/**
 * Builds the error adornment. Without a leading icon it is a filled trailing
 * slot; with one (which already turns red) it is a plain trailing icon.
 */
function renderErrorAdornment(
  invalid: boolean,
  hasLeadingIcon: boolean,
  errorIcon: ReactNode
): ReactNode {
  if (!invalid || !hasContent(errorIcon)) return null
  return hasLeadingIcon ?
      <InputTrailingIcon>{errorIcon}</InputTrailingIcon>
    : <InputSlot position='end'>{errorIcon}</InputSlot>
}

/**
 * Text field with an optional leading icon.
 *
 * Native input attributes (value, defaultValue, onChange, name, placeholder,
 * ref, aria-*, ...) go to the inner `<input>`, so it works controlled and
 * uncontrolled. `className` and `style` go to the wrapper; the field fills
 * its container.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, errorIcon, error, type = 'text', ...rest },
  ref
) {
  const invalid = isInvalid(error, rest['aria-invalid'])
  const hasLeadingIcon = hasContent(icon)

  const start = useMemo(
    () =>
      hasLeadingIcon ? <InputSlot position='start'>{icon}</InputSlot> : null,
    [hasLeadingIcon, icon]
  )

  const end = useMemo(
    () =>
      renderErrorAdornment(
        invalid,
        hasLeadingIcon,
        resolveIcon(errorIcon, DEFAULT_ERROR_ICON)
      ),
    [invalid, hasLeadingIcon, errorIcon]
  )

  return (
    <InputBase
      ref={ref}
      type={type}
      error={invalid}
      start={start}
      end={end}
      {...rest}
    />
  )
})
