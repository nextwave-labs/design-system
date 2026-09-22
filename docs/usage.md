# Usage guide

This library exposes a small public API designed for React applications.

## Install

```bash
pnpm add @flowi/ui
```

## Import styles

```tsx
import '@flowi/ui/styles.css'
```

## Import a component

```tsx
import { Button } from '@flowi/ui'

function App() {
  return <Button variant='primary'>Click me</Button>
}
```

## Component documentation

Browse the [component documentation index](components/index.md) to find APIs and usage guidance for each component.

## Theming

Import the stylesheet once at the application entry point. Components use `--flowi-*` CSS variables, so semantic tokens can be overridden in an application theme:

```css
:root {
  --flowi-color-action-primary: #1769aa;
  --flowi-color-action-primary-hover: #12568c;
}
```

Prefer overriding semantic tokens over primitive tokens so component intent remains clear. See the token definitions in `src/styles/tokens/semantic/` for supported customization points.

## Build-time output

The package ships with:

- ESM build: `dist/index.mjs`
- CJS build: `dist/index.cjs`
- Type declarations: `dist/index.d.ts`
- CSS bundle: `dist/styles/flowi.css`

This makes it compatible with typical React build pipelines and TypeScript projects.
