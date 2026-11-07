'use client'
import { forwardRef, useMemo } from 'react'
import type { InputBaseProps } from './input.types'
import { focusFieldOnWrapperPress, isInvalid } from './input.utils'
import { inputVariants } from './input.variants'

/**
 * Internal shell shared by Input and SearchInput: the pill wrapper, the
 * native field, and the `start` / `end` content injected by each component.
 * Not exported from the library.
 */
export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  function InputBase(
    {
      error,
      start,
      end,
      className,
      style,
      'aria-invalid': ariaInvalid,
      ...rest
    },
    ref
  ) {
    const invalid = isInvalid(error, ariaInvalid)

    const classes = useMemo(() => {
      const { root, field } = inputVariants({ invalid })
      return { root: root({ class: className }), field: field() }
    }, [invalid, className])

    return (
      <div
        className={classes.root}
        style={style}
        onMouseDown={focusFieldOnWrapperPress}
      >
        {start}
        <input
          ref={ref}
          className={classes.field}
          aria-invalid={invalid || undefined}
          {...rest}
        />
        {end}
      </div>
    )
  }
)
