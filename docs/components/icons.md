# Icons

Flowi ships a small shared icon set in `src/icons/`. Every icon is built on the `Icon` base: a 24×24 outline SVG that draws with `currentColor` and is sized by the `--flowi-icon-size-*` tokens. Components such as `Input` and `SearchInput` use these icons as defaults, and consumers can use them anywhere.

## Import

```tsx
import { AlertIcon, Icon, SearchIcon, UserIcon } from '@flowi/ui'
```

## Available icons

- `AlertIcon`
- `SearchIcon`
- `UserIcon`

## Props

Icons accept all SVG attributes. Size and color come from CSS: `width` / `height` (default `--flowi-icon-size-lg`) and `color`.

| Prop    | Values   | Default | Description                                                                        |
| ------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| `title` | `string` | none    | Accessible name. Without `title` or `aria-label` the icon is decorative and hidden |

## Adding an icon

Create `src/icons/<Name>Icon.tsx` that renders its paths inside `Icon`, and export it from `src/icons/index.ts` and `src/index.ts`:

```tsx
import { Icon, type IconProps } from './Icon'

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d='M12 4.5v15M4.5 12h15'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </Icon>
  )
}
```
