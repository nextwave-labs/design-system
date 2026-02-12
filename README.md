# Flowi

UI component library built with React, TypeScript, and Vite.

## Project structure

```
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
│   │   │   └── index.ts           # Component barrel export
│   │   └── index.ts               # Barrel export for all components
│   ├── stories/                   # Storybook stories (playground)
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
└── package.json
```

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the Vite development server  |
| `npm run build`     | Build the library to `dist/`       |
| `npm run lint`      | Run ESLint                         |
| `npm run format`    | Format code with Prettier          |
| `npm run storybook` | Start Storybook on port 6006       |
| `npm run commit`    | Interactive commit with Commitizen |

## Build output

Running `npm run build` generates the `dist/` folder with:

```
dist/
├── components/         # Type declarations (.d.ts)
├── styles/
│   └── flowi.css       # Tokens + component styles
├── index.mjs           # ES Modules
├── index.cjs           # CommonJS
└── index.d.ts          # Types entry point
```

## Usage

```tsx
// Import styles (tokens + component CSS)
import 'flowi/styles'

// Import components
import { Button } from 'flowi'

function App() {
  return (
    <Button variant='primary' size='md'>
      Click me
    </Button>
  )
}
```

## Stack

- **React 19** — UI library
- **TypeScript 5.8** — Type safety
- **Vite 7** — Bundler (library mode)
- **Storybook 9** — Component development and documentation
- **ESLint + Prettier** — Linting and formatting
- **Husky + lint-staged** — Git hooks
- **Commitlint + Commitizen** — Conventional commits
