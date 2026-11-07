# Troubleshooting

## Build fails before Vite runs

Confirm that the supported Node.js version is installed and dependencies are current:

```bash
node --version
pnpm install
pnpm build
```

The library build emits declarations before Vite bundles the package. TypeScript errors therefore need to be fixed before investigating bundle output.

## Storybook does not reflect a style change

Restart Storybook after changing token imports or Storybook configuration. For a clean production check, run:

```bash
pnpm build-storybook
```

Stories import components from `src/`, so Storybook validates source code rather than the generated package.

## Package output is stale

`pnpm pack` packages the existing `dist/` directory and does not build it first. Always rebuild before packing:

```bash
pnpm build
pnpm pack
```

When testing a tarball with the same package version, reinstall it explicitly in the consumer project so the package manager does not reuse a cached copy.

## Component styles are missing

Import the package stylesheet once in the application entry point:

```tsx
import '@flowi/ui/styles.css'
```

The published CSS bundle contains both the design tokens and component styles. Check that the consumer resolves the `./styles.css` package export and that the stylesheet is not being removed by a custom build pipeline.

## A token override has no effect

Override semantic tokens after importing the Flowi stylesheet and make sure the selector has equal or greater specificity than the default `:root` declaration:

```css
:root {
  --flowi-color-action-primary: #1769aa;
}
```

Prefer semantic tokens such as `--flowi-color-action-primary` over primitive palette values. See the [usage guide](usage.md#theming) for the supported theming approach.

## Tailwind classes do not override Flowi styles

Flowi styles live in the `flowi` cascade layer, and layer priority follows declaration order. If the Flowi stylesheet loads after Tailwind, the `flowi` layer is declared after `utilities` and wins. Declare the order explicitly at the top of the global stylesheet:

```css
@layer theme, base, flowi, components, utilities;
@import 'tailwindcss';
```

## A component fails inside a Server Component

The bundle is marked `'use client'`, so components render from Server Components. The error `Event handlers cannot be passed to Client Component props` means a function prop (`onClick`, `onChange`, `onSearch`, ...) is being passed from a Server Component; move that usage into a Client Component.

## Story tests fail with "Browser Mode was enabled, but provider was not specified"

Vitest 4 needs a provider instance, not a string. Install `@vitest/browser-playwright` and set `provider: playwright()` in the `storybook` project of `vite.config.ts`:

```ts
import { playwright } from '@vitest/browser-playwright'

// test.projects[].test.browser
{ enabled: true, headless: true, provider: playwright() }
```

## A CSS declaration disappears from the built bundle

esbuild's CSS minifier drops an unprefixed declaration that comes before its `-webkit-` version, for example `backdrop-filter` followed by `-webkit-backdrop-filter`. Write the `-webkit-` declaration first:

```css
-webkit-backdrop-filter: blur(1rem);
backdrop-filter: blur(1rem);
```
