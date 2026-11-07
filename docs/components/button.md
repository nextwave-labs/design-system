# Button

`Button` renders a native `<button>` element and accepts all standard button attributes, including `type`, `disabled`, `onClick`, and `aria-*` attributes.

## Import

```tsx
import { Button } from '@flowi/ui'
```

## Props

| Prop       | Values                                     | Default   | Description                                            |
| ---------- | ------------------------------------------ | --------- | ------------------------------------------------------ |
| `variant`  | `primary`, `secondary`, `tertiary`, `text` | `primary` | Visual treatment, from highest to lowest emphasis      |
| `size`     | `sm`, `md`, `lg`, `xl`                     | `md`      | Control size (height 40 / 48 / 52 / 60px)              |
| `icon`     | `ReactNode`                                | none      | Leading icon. It inherits the text color of each state |
| `iconOnly` | `true`, `false`                            | `false`   | Circular button without a label. Always `primary`      |

All native button attributes are supported. When `iconOnly` is `true`, `icon` and `aria-label` are required.

```tsx
<Button type='button' variant='secondary' size='lg' onClick={handleOpen}>
  Open settings
</Button>

<Button iconOnly icon={<PlusIcon />} aria-label='Add item' />
```

Use a native button label or accessible name, and set `type='button'` when the button is inside a form but should not submit it.

## Next.js App Router

The published bundle starts with a `'use client'` directive, so every Flowi component is a Client Component. You can render it from a Server Component tree, including with icons as props. Event handlers (`onClick`, `onChange`, `onSearch`, ...) are functions and cannot be passed from a Server Component, so keep interactive usage inside a Client Component:

```tsx
'use client'

import { Button } from '@flowi/ui'

export function SettingsButton() {
  return <Button onClick={() => console.log('open settings')}>Settings</Button>
}
```

## Accessibility

The Button component preserves native button behavior, exposes a visible keyboard focus ring, and uses the native `disabled` state. Keep labels specific, do not use disabled buttons as the only explanation for an unavailable action, and use `aria-label` only when visible text cannot provide an accessible name. Storybook accessibility checks are currently advisory (`test: 'todo'`) and do not fail CI.
