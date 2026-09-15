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
| `pnpm dev`             | Run the Vite app locally        |
| `pnpm build`           | Build the library               |
| `pnpm lint`            | Run ESLint                      |
| `pnpm storybook`       | Start Storybook                 |
| `pnpm build-storybook` | Build static Storybook output   |
| `pnpm commit`          | Interactive conventional commit |

## License

This project is licensed under the [MIT License](LICENSE).

## Community and security

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md)

If you want to contribute, review the rules, or understand the release workflow, see [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [DEPLOYMENT.md](DEPLOYMENT.md).
