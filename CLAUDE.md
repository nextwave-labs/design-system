# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Flowi** is a React UI component library built with Vite in library mode. It outputs ES Modules, CommonJS, and TypeScript declarations. Components use CSS Modules with design tokens defined as CSS custom properties (`--flowi-*`).

## Commands

| Command                | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `pnpm build`           | Build library (`tsc` declarations + Vite bundle) → `dist/` |
| `pnpm lint`            | ESLint (flat config)                                       |
| `pnpm format`          | Prettier (no semis, single quotes)                         |
| `pnpm storybook`       | Storybook dev server on port 6006                          |
| `pnpm build-storybook` | Static Storybook build                                     |
| `pnpm commit`          | Interactive conventional commit via Commitizen             |

There is no standalone unit test command yet. Story-based tests run through Vitest + Playwright via the Storybook addon (configured in `vite.config.ts`).

## Architecture

### Build Pipeline

1. `prebuild` cleans `dist/`
2. `tsc -p tsconfig.build.json` emits `.d.ts` + `.d.ts.map` files to `dist/`
3. `vite build` bundles `src/index.ts` into `dist/index.mjs` + `dist/index.cjs` and extracts all CSS into `dist/styles/flowi.css`

Vite is configured with `emptyOutDir: false` so the Vite step preserves the declarations from step 2.

### TypeScript Configs

- **`tsconfig.app.json`** — IDE/dev use. Has `noEmit: true` and `allowImportingTsExtensions`.
- **`tsconfig.build.json`** — Library build. Has `emitDeclarationOnly: true`. Excludes stories and tests.
- **`tsconfig.node.json`** — For `vite.config.ts` only.
- **`tsconfig.json`** — Project references to all three above.

### Component Pattern

Each component lives in `src/components/<Name>/` with three files:

```
Button/
  Button.tsx          # Component (extends native HTML element attributes)
  Button.module.css   # Styles using --flowi-* tokens
  index.ts            # Barrel: exports component + props type
```

Barrel chain: `src/index.ts` → `src/components/index.ts` → `src/components/<Name>/index.ts`

### Styling

- Design tokens in `src/styles/tokens.css` — all prefixed `--flowi-*` (colors, typography, spacing, radius, shadows)
- Components use CSS Modules (`.module.css`), typed via `src/css-modules.d.ts`
- Tokens are imported in `src/index.ts` (bundled into library CSS) and in `.storybook/preview.ts` (available in stories)

### Externals

React, react-dom, and react/jsx-runtime are externalized — not bundled. Peer dependencies accept React 18 or 19.

## Conventions

- **Commits**: Conventional Commits enforced by commitlint + Husky `commit-msg` hook. Use `pnpm commit` for the interactive prompt.
- **Pre-commit**: Husky runs lint-staged (ESLint fix + Prettier on TS/JS files, Prettier on JSON/CSS/MD).
- **Prettier**: No semicolons, single quotes, single JSX quotes, ES5 trailing commas.
- **ESLint**: Flat config with typescript-eslint, react-hooks, react-refresh, and storybook plugins.
- **`src/stories/`**: Storybook playground examples (Button, Header, Page). Not part of the library build.
