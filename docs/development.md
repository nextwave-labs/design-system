# Development guide

This document covers the project structure, scripts, and build setup for Flowi.

## Project structure

```text
flowi/
├── .husky/                     # Git hooks (commit-msg, pre-commit)
├── .storybook/
│   ├── main.ts                 # Storybook configuration
│   ├── preview.ts              # Global decorators and imports (tokens.css)
│   └── vitest.setup.ts         # Vitest test setup
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx          # Button component
│   │   │   ├── Button.module.css   # Button styles (CSS Modules)
│   │   │   ├── Button.stories.ts   # Storybook story (not part of the build)
│   │   │   └── index.ts           # Component barrel export
│   │   └── index.ts               # Barrel export for all components
│   ├── styles/
│   │   ├── tokens.css             # Design token entry point
│   │   └── tokens/                # Primitive and semantic token definitions
│   ├── css-modules.d.ts           # CSS Modules type declarations
│   └── index.ts                   # Library entry point
├── commitlint.config.js       # commitlint configuration
├── eslint.config.js           # ESLint configuration
├── prettier.config.js         # Prettier configuration
├── tsconfig.json              # TS config references
├── tsconfig.app.json          # TS config for development/IDE
├── tsconfig.build.json        # TS config for library build
├── tsconfig.node.json         # TS config for Node files
├── vite.config.ts             # Vite: lib mode + Vitest + Storybook
├── package.json
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── DEPLOYMENT.md
└── CHANGELOG.md
```

## Scripts

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `pnpm install`         | Install dependencies and set up Husky hooks |
| `pnpm build`           | Build the library to `dist/`                |
| `pnpm lint`            | Run ESLint                                  |
| `pnpm format`          | Format code with Prettier                   |
| `pnpm storybook`       | Start Storybook on port 6006                |
| `pnpm build-storybook` | Build the static Storybook site             |
| `pnpm commit`          | Interactive commit with Commitizen          |

## Creating a component

Use the generator from the repository root with a PascalCase name:

```bash
make component NAME=Badge
```

The generator creates `Badge.tsx`, `Badge.module.css`, `Badge.stories.ts`, and `index.ts` under `src/components/Badge/`. It also creates `docs/components/badge.md`, adds the component to `docs/components/index.md`, and adds the component and its props type to both export barrels: `src/components/index.ts` and `src/index.ts`.

The generated files are a starting point. Before opening a pull request:

1. Replace the placeholder native element and props in the component.
2. Style the component with `--flowi-*` tokens only.
3. Add real Storybook controls and interaction assertions.
4. Complete the generated page in `docs/components/badge.md`.
5. Run `pnpm storybook` for visual review. The browser test project is configured for future automated execution, but it is not currently part of CI.

The component name must start with an uppercase letter and contain only letters and numbers. The generator refuses to overwrite an existing component directory.

## Token layers

`src/styles/tokens.css` is the single token entry point. It imports primitive tokens first, then semantic tokens. Primitive tokens describe raw values such as palette colors, spacing, and typography scales; semantic tokens describe usage roles such as primary actions, text, surfaces, and feedback.

Components should consume semantic tokens whenever a suitable token exists. Applications should override semantic tokens after importing `@flowi/ui/styles.css`, rather than coupling their theme to primitive values. Preserve the primitive-before-semantic import order when adding token files.

## Build output

Running `pnpm build` generates the `dist/` folder with:

```text
dist/
├── components/         # Type declarations (.d.ts)
├── styles/
│   └── flowi.css       # Tokens + component styles
├── index.mjs           # ES Modules
├── index.cjs           # CommonJS
├── index.d.ts          # Types entry point
└── ...
```

## Stack

- React 19
- TypeScript 5.9
- Vite 8
- Storybook 10
- ESLint + Prettier
- Husky + lint-staged
- Commitlint + Commitizen
- semantic-release for publishing

## Local verification

Before opening a PR, run:

```bash
pnpm install
pnpm lint
pnpm build
pnpm build-storybook
```

This keeps the repo consistent with the current CI workflow, which runs `pnpm lint` and `pnpm build`.

Story-based interaction checks are defined through the Storybook Vitest addon. Run `pnpm build-storybook` to verify the production Storybook build and use the accessibility panel when reviewing component stories. Accessibility checks are advisory because Storybook is configured with `test: 'todo'`.

To verify the packaged output rather than the source, see [Test the built library locally](../README.md#test-the-built-library-locally) in the README.
