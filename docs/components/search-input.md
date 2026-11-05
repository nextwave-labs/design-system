# SearchInput

`SearchInput` renders a native `<input type="search">` with a trailing search button. It shares the shell, states, and tokens of [Input](input.md) and fills the width of its container.

## Import

```tsx
import { SearchInput } from '@flowi/ui'
```

## Props

| Prop                | Values                    | Default        | Description                                                                                          |
| ------------------- | ------------------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `onSearch`          | `(value: string) => void` | none           | Called with the current value on button click or Enter                                               |
| `searchIcon`        | `ReactNode`               | magnifier icon | Icon inside the search button                                                                        |
| `searchButtonProps` | `SearchButtonProps`       | none           | Props for the button: `aria-label` (default `Search`), `className`, `style`, `onClick`, `title`, ... |
| `error`             | `boolean`                 | `false`        | Error state. Sets `aria-invalid`; the stroke and button turn red                                     |
| `style`             | `SearchInputStyle`        | none           | Wrapper style, with typed support for the input and search button tokens                             |

All other native input attributes are forwarded to the inner `<input>`, including `value`, `defaultValue`, `onChange`, `name`, `placeholder`, `disabled`, `aria-*`, and `ref`. `disabled` also disables the button.

## Usage

```tsx
<SearchInput
  aria-label='Search projects'
  placeholder='Search projects'
  onSearch={(query) => runSearch(query)}
/>

// Custom icon and button label
<SearchInput
  aria-label='Search docs'
  searchIcon={<ArrowIcon />}
  searchButtonProps={{ 'aria-label': 'Go' }}
  onSearch={runSearch}
/>
```

Enter in the field triggers `onSearch`; call `event.preventDefault()` in `onKeyDown` to cancel it. Calling `event.preventDefault()` in `searchButtonProps.onClick` skips `onSearch` for that click. Inside a `<form>`, Enter also submits the form natively.

## Customization

The button background follows the field stroke (`--flowi-input-stroke`) by default, so they merge on focus. To give the button its own color, set the search button tokens per instance or globally:

```tsx
<SearchInput
  aria-label='Search'
  style={{
    '--flowi-search-button-bg': 'var(--flowi-color-green-300)',
    '--flowi-search-button-bg-hover': 'var(--flowi-color-green-200)',
    '--flowi-search-button-bg-active': 'var(--flowi-color-green-300)',
  }}
/>
```

| Token                             | Default                               |
| --------------------------------- | ------------------------------------- |
| `--flowi-search-button-bg`        | follows the field stroke              |
| `--flowi-search-button-bg-hover`  | `--flowi-color-action-primary-hover`  |
| `--flowi-search-button-bg-active` | `--flowi-color-action-primary-active` |
| `--flowi-search-button-icon`      | follows `--flowi-input-slot-icon`     |

Error and disabled states always take precedence over a custom button color.

## Accessibility

- Give the field an accessible name with a `<label htmlFor>` or `aria-label`; it is exposed as a `searchbox`.
- The search button is a native `<button>` reachable with Tab, named by `searchButtonProps['aria-label']` (default `Search`).
- Native browser search decorations (the clear "x") are hidden.
