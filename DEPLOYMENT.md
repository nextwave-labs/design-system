# Publishing to npm

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate versioning and publishing to npm. Releases are created only when a maintainer manually runs the `Release` workflow from GitHub Actions.

## Release checklist

Before merging a release-worthy change, make sure the repository has the following configuration:

1. The package name in `package.json` is `@flowi/ui`.
2. The package has `publishConfig.access` set to `public`.
3. The repository has an `NPM_TOKEN` Actions secret with read and write access to packages in the `flowi` organization.
4. GitHub Actions is configured to allow workflows to use read and write permissions.

The automatic `GITHUB_TOKEN` does not need to be created as a repository secret. GitHub provides it to the workflow. The `contents: write` permission in `.github/workflows/release.yml` allows semantic-release to create GitHub Releases and commit the generated version files.

## Publish a release

1. Create a branch, make the changes, and verify them locally:

   ```bash
   pnpm install
   pnpm lint
   pnpm build
   ```

2. Commit using Conventional Commits. A `feat:` commit creates a minor release, a `fix:` commit creates a patch release, and `feat!:` or `BREAKING CHANGE:` creates a major release.

   ```bash
   git add .
   git commit -m "feat(button): add loading state"
   git push origin your-branch
   ```

3. Open a pull request and merge it into `main`. Merging to `main` does not publish a release by itself.
4. When the current `main` commit is ready to publish, open the repository's **Actions** tab, select the `Release` workflow, choose the `main` branch, and click **Run workflow**.
5. Inspect the `Release` workflow run. The `Install dependencies`, `Lint`, `Build`, and `Release` steps must pass.
6. After a successful release, verify the package and GitHub Release:

   ```bash
   pnpm view @flowi/ui version
   ```

   The workflow also creates or updates `CHANGELOG.md` and commits the generated version changes back to `main`.

## Release behavior

Merging or pushing commits to `main` does not publish the package. Those commits remain pending for the next release until a maintainer manually runs the `Release` workflow.

When the workflow runs, `semantic-release` creates one release from all unreleased commits since the previous version tag. It does not create one release per commit.

Examples:

| Pending commits since last release       | Version bump | Example result        |
| ---------------------------------------- | ------------ | --------------------- |
| `fix:`, `fix:`, `fix:`                   | Patch        | `1.0.1` → `1.0.2`     |
| `fix:`, `feat:`, `feat:`                 | Minor        | `1.0.1` → `1.1.0`     |
| `fix:`, `feat:`, `feat!:`                | Major        | `1.0.1` → `2.0.0`     |
| Commits without release-relevant changes | No release   | Current version stays |

The final Git tag is created by `semantic-release` using the package version, for example `v1.1.0`. Maintainers do not need to create release tags manually.

## How it works

1. Changes are merged to `main`
2. A maintainer manually runs the `Release` workflow from the **Actions** tab using the `main` branch
3. GitHub Actions runs `.github/workflows/release.yml`
4. `semantic-release` analyzes commits since the last release:
   - `fix:` → **patch** bump (0.1.0 → 0.1.1)
   - `feat:` → **minor** bump (0.1.0 → 0.2.0)
   - `feat!:` or `BREAKING CHANGE:` → **major** bump (0.1.0 → 1.0.0)
5. If there are commits that warrant a release, the plugins run in order:
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

If the repository cannot change workflow permissions because of an organization policy, an organization owner must enable **Read and write permissions** in **Organization Settings → Actions → General**. The repository workflow cannot grant itself permissions that the organization has disabled.

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
