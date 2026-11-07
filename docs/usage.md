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

### Cascade layer

All Flowi styles (tokens and components) are wrapped in the `flowi` cascade layer. Any unlayered CSS in your application overrides Flowi regardless of specificity, so `className` and your own stylesheets win without `!important`.

Layered CSS follows layer order instead: the layer declared first has the lowest priority. With Tailwind CSS v4, whose utilities live in layers, declare `flowi` before Tailwind's utilities at the top of your global stylesheet so utility classes can override Flowi:

```css
/* globals.css */
@layer theme, base, flowi, components, utilities;
@import 'tailwindcss';
```

Without that statement, the order depends on which stylesheet loads first, and Flowi may override your utility classes.

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

Unlayered `:root` overrides like this one always win over the tokens in the `flowi` layer, wherever they are declared.

Prefer overriding semantic tokens over primitive tokens so component intent remains clear. See the token definitions in `src/styles/tokens/semantic/` for supported customization points.

## Build-time output

The package ships with:

- ESM build: `dist/index.mjs`
- CJS build: `dist/index.cjs`
- Type declarations: `dist/index.d.ts`
- CSS bundle: `dist/styles/flowi.css`

This makes it compatible with typical React build pipelines and TypeScript projects.
