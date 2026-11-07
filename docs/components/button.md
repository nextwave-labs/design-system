# Button

`Button` renders a native `<button>` element and accepts all standard button attributes, including `type`, `disabled`, `onClick`, and `aria-*` attributes.

## Import

```tsx
import { Button } from '@flowi/ui'
```

## Props

| Prop      | Values                 | Default   | Description      |
| --------- | ---------------------- | --------- | ---------------- |
| `variant` | `primary`, `secondary` | `primary` | Visual treatment |
| `size`    | `sm`, `md`, `lg`       | `md`      | Control size     |

All native button attributes are supported.

```tsx
<Button type='button' variant='secondary' size='lg' onClick={handleOpen}>
  Open settings
</Button>
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
