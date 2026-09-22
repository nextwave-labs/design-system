# Flowi

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-%40flowi%2Fui-CB3837?logo=npm)](https://www.npmjs.com/package/@flowi/ui)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Flowi is a React UI component library built with TypeScript, Vite, and a design-token-driven styling system. It is designed for teams that want reusable, consistent primitives with a fast Storybook workflow and clean package output for npm.

## Why Flowi

- Reusable UI primitives for React applications
- Design-token-based styling for consistent visual language
- Type-safe component APIs for TypeScript projects
- Library-first build pipeline ready for package publishing
- Storybook-powered component development and documentation

## Features

- Small, composable UI building blocks
- Shared design tokens via `--flowi-*` CSS variables
- CSS Modules for scoped component styling
- Storybook examples for visual review
- SemVer release flow with `semantic-release`

## Quick start

```bash
pnpm install
pnpm storybook
```

## Documentation

- [Architecture guide](docs/architecture.md) — project structure and design decisions
- [Development guide](docs/development.md) — scripts, tooling, and local workflow
- [Usage guide](docs/usage.md) — installation and component import examples
- [Contributing guide](CONTRIBUTING.md) — contribution flow, branch strategy, and commit conventions
- [Deployment guide](DEPLOYMENT.md) — release process and npm publishing

## Main commands

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `pnpm install`         | Install dependencies            |
| `pnpm build`           | Build the library               |
| `pnpm lint`            | Run ESLint                      |
| `pnpm storybook`       | Start Storybook                 |
| `pnpm build-storybook` | Build static Storybook output   |
| `pnpm commit`          | Interactive conventional commit |

## Test the built library locally

Storybook renders components straight from `src/`, so it never exercises what actually ships. To verify the packaged output — the `exports` map, the type declarations, and the extracted CSS bundle — install the built tarball into a throwaway project.

### 1. Build and pack

From the repository root:

```bash
pnpm build
pnpm pack
```

`pnpm pack` does **not** build. There is no `prepack` script, so it only tarballs whatever `dist/` currently contains — always run `pnpm build` first. The result is written to the repo root, named from the package name and version, so `@flowi/ui@1.0.1` produces `flowi-ui-1.0.1.tgz`.

### 2. Create a test project

Outside the repository:

```bash
pnpm create vite@latest flowi-test --template react-ts
cd flowi-test
pnpm install
```

### 3. Install the library from the local tarball

```bash
pnpm add ../flowi/flowi-ui-1.0.1.tgz
```

Or with an absolute path, if the relative one is awkward:

```bash
pnpm add /absolute/path/to/flowi/flowi-ui-1.0.1.tgz
```

pnpm records this as a `file:` dependency in the test project's `package.json`. That is expected here, but it should never be committed in a real consumer.

### 4. Use a component

Replace `src/App.tsx` in the test project:

```tsx
import '@flowi/ui/styles.css'
import { Button } from '@flowi/ui'

function App() {
  return <Button variant='primary'>Click me</Button>
}

export default App
```

Then start it:

```bash
pnpm dev
```

### 5. What a passing test looks like

- The button renders with Flowi styling — the `./styles.css` export resolves and `dist/styles/flowi.css` contains the tokens and component styles.
- `variant` and `size` autocomplete in the editor — `dist/index.d.ts` resolves through the `types` condition.
- `pnpm build` succeeds in the test project — the ESM entry is valid and React stayed externalized as a peer dependency.

### Re-testing after a change

Run `pnpm build && pnpm pack` in the repository again, then re-run `pnpm add <path-to-tgz>` in the test project. If the version has not changed, the tarball filename is identical and pnpm may serve a cached copy; re-running `pnpm add` against the tarball path is the reliable way to pick up the new contents.

## License

This project is licensed under the [MIT License](LICENSE).

## Community and security

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md)

If you want to contribute, review the rules, or understand the release workflow, see [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [DEPLOYMENT.md](DEPLOYMENT.md).
