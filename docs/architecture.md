# Architecture

Flowi is a library-first React UI project with a simple structure: reusable components, token-driven styling, Storybook stories, and a build pipeline that publishes a package to npm.

## High-level structure

```text
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── index.ts
│   └── index.ts
├── stories/
├── styles/
│   └── tokens.css
├── css-modules.d.ts
├── index.ts
└── main.tsx
```

## Design approach

### Components

Each component lives in its own folder under `src/components/<Name>/` and follows the same pattern:

- `Component.tsx` — logic and public API
- `Component.module.css` — scoped styles
- `index.ts` — export barrel

This keeps the library organized and easy to extend.

### Styling system

The visual system is token-based:

- design tokens live in `src/styles/tokens.css`
- tokens use the `--flowi-*` prefix
- components consume tokens through CSS Modules

This gives a single source of truth for spacing, color, typography, radii, and shadows.

### Storybook

The demo and documentation layer lives in `src/stories/` and is rendered by Storybook. This allows visual validation and interaction testing without affecting the library build.

## Build and distribution

The package is built as a library with Vite in library mode.

The entry point is `src/index.ts`, which exposes the library publicly. The build output includes:

- ESM bundle
- CJS bundle
- Type declarations
- CSS bundle with tokens and component styles

## Release model

Publishing is handled by `semantic-release` and GitHub Actions. The project is designed for a controlled release flow:

- maintainers merge to the release branch or main depending on workflow
- a maintainer runs the Release workflow manually
- semantic-release bumps versions and publishes to npm

## Why this architecture works

This structure keeps responsibilities separate:

- `components/` = component API and behavior
- `styles/` = visual design tokens
- `stories/` = demos and docs
- `dist/` = packaged library output

That separation is helpful for an open-source component library because it keeps the codebase easier to understand, contribute to, and publish.
