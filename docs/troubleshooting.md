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
