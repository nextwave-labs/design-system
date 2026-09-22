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
│   │   └── tokens.css             # Design tokens (--flowi-*)
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
pnpm storybook
```

This keeps the repo consistent with the CI and release workflow.

To verify the packaged output rather than the source, see [Test the built library locally](../README.md#test-the-built-library-locally) in the README.
