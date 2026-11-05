# Input

`Input` renders a native `<input>` inside a pill-shaped field, with an optional leading icon. It fills the width of its container. For search fields, use [SearchInput](search-input.md).

## Import

```tsx
import { Input, UserIcon } from '@flowi/ui'
```

## Props

| Prop        | Values       | Default    | Description                                                        |
| ----------- | ------------ | ---------- | ------------------------------------------------------------------ |
| `icon`      | `ReactNode`  | none       | Leading icon, shown in a filled slot                               |
| `error`     | `boolean`    | `false`    | Error state. Sets `aria-invalid` on the input                      |
| `errorIcon` | `ReactNode`  | alert icon | Icon shown in the error state. `null` hides it                     |
| `style`     | `InputStyle` | none       | Wrapper style, with typed support for the `--flowi-input-*` tokens |

All other native input attributes are forwarded to the inner `<input>`, including `value`, `defaultValue`, `onChange`, `name`, `placeholder`, `type` (default `text`), `disabled`, `required`, `aria-*`, and `ref`. `className` and `style` are applied to the outer wrapper so they can control layout.

## Usage

```tsx
// Uncontrolled
<Input aria-label='Full name' placeholder='Ada Lovelace' name='fullName' />

// Controlled, with a leading icon
const [username, setUsername] = useState('')
<Input
  icon={<UserIcon />}
  aria-label='Username'
  value={username}
  onChange={(event) => setUsername(event.target.value)}
/>

// Error state with a described message
<Input type='email' aria-label='Email' aria-describedby='email-error' error />
<p id='email-error'>Enter a valid email address.</p>
```

## States

States follow the interaction and props; there is no `state` prop.

- **Default / filled**: the placeholder or the typed value is shown.
- **Focus**: the stroke thickens and the slots grow to meet the edge.
- **Error**: `error` (or `aria-invalid='true'`) turns the stroke and slots red. Without a leading icon, the error icon is shown in a filled trailing slot; with one, as a plain trailing icon.
- **Disabled**: `disabled` blocks typing. A disabled ancestor `<fieldset>` has the same effect.

## Customization

Every color and dimension comes from the `--flowi-input-*` tokens in `src/styles/tokens/semantic/input.css`, which map to primitives. Override them globally on `:root`, or per instance through `style` or `className`:

```tsx
<Input
  aria-label='Username'
  style={{
    '--flowi-input-stroke': 'var(--flowi-color-green-300)',
    '--flowi-input-fill': 'var(--flowi-color-green-50)',
  }}
/>
```

Per-instance tokens: `--flowi-input-fill`, `--flowi-input-stroke`, `--flowi-input-stroke-error`, `--flowi-input-stroke-disabled`, `--flowi-input-text`, `--flowi-input-placeholder`, `--flowi-input-slot-icon`.

Icons come from the shared [icon set](icons.md); any `ReactNode` works, and SVGs inside a slot are sized by `--flowi-input-icon-size`.

## Accessibility

- Give every input an accessible name: a visible `<label htmlFor>` (preferred) or `aria-label`. The placeholder is not used as a label.
- Error state is exposed through `aria-invalid`. Link the error message with `aria-describedby`; slot icons are decorative and hidden from assistive technology.

## Next.js App Router

Like `Button`, use `Input` with event handlers inside a Client Component.
