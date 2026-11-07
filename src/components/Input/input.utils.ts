import type {
  AriaAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react'

/** A field is invalid when `error` is set or `aria-invalid` is true. */
export function isInvalid(
  error: boolean | undefined,
  ariaInvalid: AriaAttributes['aria-invalid']
): boolean {
  return Boolean(error) || ariaInvalid === true || ariaInvalid === 'true'
}

/** True when a node would render something. */
export function hasContent(node: ReactNode): boolean {
  return node !== undefined && node !== null && node !== false
}

/**
 * Uses the custom icon when given. `undefined` falls back to the default;
 * `null` or `false` mean "no icon".
 */
export function resolveIcon(
  custom: ReactNode | undefined,
  fallback: ReactNode
): ReactNode {
  return custom === undefined ? fallback : custom
}

/** Reads the current value of a field, controlled or not. */
export function readFieldValue(field: HTMLInputElement | null): string {
  return field?.value ?? ''
}

/** Enter that is not cancelled and not part of an IME composition. */
export function isSubmitKey(event: KeyboardEvent<HTMLInputElement>): boolean {
  return (
    event.key === 'Enter' &&
    !event.defaultPrevented &&
    !event.nativeEvent.isComposing
  )
}

/**
 * Pressing the wrapper's padding or a decorative slot focuses the field, so
 * the whole control behaves as one target. Buttons keep their own behavior.
 */
export function focusFieldOnWrapperPress(event: MouseEvent<HTMLElement>) {
  const field = event.currentTarget.querySelector('input')
  const target = event.target as Element
  if (
    !field ||
    field.disabled ||
    target === field ||
    target.closest('button')
  ) {
    return
  }
  event.preventDefault()
  field.focus()
}
