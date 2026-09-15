# Usage guide

This library exposes a small public API designed for React applications.

## Install

```bash
pnpm add @flowi/ui
```

## Import styles

```tsx
import '@flowi/ui/styles'
```

## Import a component

```tsx
import { Button } from '@flowi/ui'

function App() {
  return <Button variant='primary'>Click me</Button>
}
```

## Build-time output

The package ships with:

- ESM build: `dist/index.mjs`
- CJS build: `dist/index.cjs`
- Type declarations: `dist/index.d.ts`
- CSS bundle: `dist/styles/flowi.css`

This makes it compatible with typical React build pipelines and TypeScript projects.
