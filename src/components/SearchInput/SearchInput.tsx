'use client'
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { SearchIcon } from '../../icons'
import { InputBase } from '../Input/InputBase'
import type { InputBaseProps, InputStyle } from '../Input/input.types'
import { isSubmitKey, readFieldValue } from '../Input/input.utils'
import { inputVariants } from '../Input/input.variants'
import { searchInputVariants } from './searchInput.variants'

const DEFAULT_SEARCH_ICON = <SearchIcon />
const DEFAULT_SEARCH_LABEL = 'Search'

/** Search button tokens that can be overridden per instance through `style`. */
export type SearchInputCssVariable =
  | '--flowi-search-button-bg'
  | '--flowi-search-button-bg-hover'
  | '--flowi-search-button-bg-active'
  | '--flowi-search-button-icon'

export type SearchInputStyle = InputStyle &
  Partial<Record<SearchInputCssVariable, string>>

/** Props forwarded to the search button. */
export interface SearchButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'children' | 'disabled' | 'style'
> {
  style?: CSSProperties & Partial<Record<SearchInputCssVariable, string>>
}

export interface SearchInputProps extends Omit<
  InputBaseProps,
  'start' | 'end' | 'style'
> {
  /** Called with the current value on button click or Enter. */
  onSearch?: (value: string) => void
  /** Icon inside the search button. Defaults to a magnifier. */
  searchIcon?: ReactNode
  /**
   * Props for the search button: `aria-label` (defaults to "Search"),
   * `className`, `style`, `onClick`, `title`, ... Calling
   * `event.preventDefault()` in `onClick` skips `onSearch`.
   */
  searchButtonProps?: SearchButtonProps
  style?: SearchInputStyle
}

/**
 * Search field with a trailing search button.
 *
 * Native input attributes go to the inner `<input type="search">`, so it
 * works controlled and uncontrolled. `className` and `style` go to the
 * wrapper; the field fills its container.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      onSearch,
      searchIcon,
      searchButtonProps,
      onKeyDown,
      className,
      disabled,
      type = 'search',
      ...rest
    },
    ref
  ) {
    const fieldRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => fieldRef.current as HTMLInputElement, [])

    const onButtonClick = searchButtonProps?.onClick

    const search = useCallback(() => {
      onSearch?.(readFieldValue(fieldRef.current))
    }, [onSearch])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event)
        if (isSubmitKey(event)) search()
      },
      [onKeyDown, search]
    )

    const handleButtonClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onButtonClick?.(event)
        if (!event.defaultPrevented) search()
      },
      [onButtonClick, search]
    )

    const rootClassName = useMemo(
      () => searchInputVariants().root({ class: className }),
      [className]
    )

    const end = useMemo(
      () => (
        <button
          {...searchButtonProps}
          type='button'
          aria-label={searchButtonProps?.['aria-label'] ?? DEFAULT_SEARCH_LABEL}
          className={inputVariants({ position: 'end' }).slot({
            class: searchInputVariants().button({
              class: searchButtonProps?.className,
            }),
          })}
          disabled={disabled}
          onClick={handleButtonClick}
        >
          {searchIcon ?? DEFAULT_SEARCH_ICON}
        </button>
      ),
      [searchButtonProps, searchIcon, disabled, handleButtonClick]
    )

    return (
      <InputBase
        ref={fieldRef}
        type={type}
        disabled={disabled}
        className={rootClassName}
        onKeyDown={handleKeyDown}
        end={end}
        {...rest}
      />
    )
  }
)
