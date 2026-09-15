# Publishing to npm

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate versioning and publishing to npm. The flow runs automatically on every push to `main` via GitHub Actions.

## How it works

1. A push (or PR merge) is made to `main`
2. GitHub Actions runs the `.github/workflows/release.yml` workflow
3. `semantic-release` analyzes commits since the last release:
   - `fix:` → **patch** bump (0.1.0 → 0.1.1)
   - `feat:` → **minor** bump (0.1.0 → 0.2.0)
   - `feat!:` or `BREAKING CHANGE:` → **major** bump (0.1.0 → 1.0.0)
4. If there are commits that warrant a release, the plugins run in order:
   1. Generates release notes
   2. Updates `CHANGELOG.md`
   3. Runs `pnpm build` and publishes to npm
   4. Creates a GitHub Release with the notes
   5. Commits `CHANGELOG.md`, `package.json`, and `pnpm-lock.yaml` (version bump) back to the repo

## Requirements

### GitHub secrets

Configure in **Settings → Secrets and variables → Actions**:

| Secret         | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `NPM_TOKEN`    | npm token with publish permission for the `@flowi` organization |
| `GITHUB_TOKEN` | Already available by default in GitHub Actions                  |

### Package name

Verify that the scoped package name is available on npm:

```bash
pnpm view @flowi/ui
```

The package is configured as public through `publishConfig.access` in `package.json`.

## Install in another project

```bash
pnpm add @flowi/ui
```

```tsx
import '@flowi/ui/styles'
import { Button } from '@flowi/ui'
```

## Run a manual release (dry-run)

To simulate a release without publishing:

```bash
pnpm exec semantic-release --dry-run --no-ci
```
