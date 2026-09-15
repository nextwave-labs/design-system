# Contributing to Flowi

Thanks for your interest in contributing. This guide explains how to set up your environment, create or modify components, and submit your pull request through the project’s branch-based workflow.

Before opening a PR, please also read the project’s [Code of Conduct](CODE_OF_CONDUCT.md) and [Security policy](SECURITY.md).

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

This also sets up Husky git hooks automatically through the `prepare` script.

### 2. Use the supported Node version

This project expects Node 22 or newer. The repository includes `.nvmrc` and the `engines.node` setting in `package.json` to help keep local and CI environments aligned.

### 3. Verify everything works

```bash
pnpm build
pnpm lint
pnpm storybook
```

## Workflow

### 1. Create a branch

Use a feature branch for your work. The project follows a branch-based PR model, so avoid committing directly to `main`.

```bash
git checkout -b feat/alert-my-change
```

A common convention is:

```bash
git checkout -b feat/<short-feature-name>
```

If your work is tied to an existing component or feature area, keep the branch name aligned with that scope (for example `feat/button-loading-state`).

### 2. Make your changes

See the [Adding a new component](#adding-a-new-component) or [Modifying an existing component](#modifying-an-existing-component) sections as needed.

### 3. Commits

The project uses [Conventional Commits](https://www.conventionalcommits.org/). You can use the interactive prompt:

```bash
pnpm commit
```

Or write the message manually following the format:

```text
feat(button): add loading state
fix(alert): correct border-radius on mobile
```

The `commit-msg` hook validates the format automatically. If the commit does not follow the convention, it will be rejected.

### 4. Push and open a pull request

```bash
git push origin feat/alert-my-change
```

Then open a pull request from your feature branch to the appropriate target branch for the project’s branch workflow. Keep the PR focused and include:

- a clear description of what changed and why
- the affected component or area
- screenshots or a Storybook link when the change is visual
- any breaking changes or API-impacting updates

### 5. Review and merge

A maintainer will review the PR and merge it according to the branch strategy in use. After merge, publishing happens later through the release workflow described in [DEPLOYMENT.md](DEPLOYMENT.md).

See the [release and npm publishing guide](DEPLOYMENT.md) for the required secrets, permissions, and post-merge verification steps.

## Branching model

This repository uses a branch-based pull request workflow.

| Branch type | Purpose                          | Example                     |
| ----------- | -------------------------------- | --------------------------- |
| `main`      | Default integration branch       | `main`                      |
| `feat/`     | New features or enhancements     | `feat/button-loading-state` |
| `fix/`      | Bug fixes and corrective changes | `fix/button-focus-ring`     |
| `docs/`     | Documentation updates            | `docs/readme-structure`     |
| `chore/`    | Maintenance and tooling tasks    | `chore/node-version-pin`    |

Guidelines:

- create a short-lived branch for your work
- keep the branch focused on one concern or component
- open a PR from your branch against the appropriate target branch
- do not push directly to `main`

This keeps review history clean and makes it easier to track what is being merged.

---

## Adding a new component

### 1. Create the files

```
src/components/<Name>/
  <Name>.tsx
  <Name>.module.css
  index.ts
```

### 2. Component (`<Name>.tsx`)

Follow the Button pattern:

- Extend the native HTML element attributes
- Export the props interface as `<Name>Props`
- Export the component as a named export (not default)
- Use `className` as a prop to allow external styles
- Use `--flowi-*` tokens through CSS Modules

```tsx
import styles from './<Name>.module.css'

export interface <Name>Props
  extends React.HTMLAttributes<HTMLElement> {
  // component-specific props
}

export function <Name>({ className, children, ...rest }: <Name>Props) {
  const classNames = [styles.<name>, className].filter(Boolean).join(' ')

  return (
    <element className={classNames} {...rest}>
      {children}
    </element>
  )
}
```

### 3. Styles (`<Name>.module.css`)

Always use tokens from `src/styles/tokens.css`:

```css
.<name > {
  font-family: var(--flowi-font-family);
  padding: var(--flowi-spacing-md);
  border-radius: var(--flowi-radius-md);
}
```

If you need a new token, add it in `src/styles/tokens.css` with the `--flowi-` prefix.

### 4. Barrel export (`index.ts`)

```ts
export { <Name> } from './<Name>'
export type { <Name>Props } from './<Name>'
```

### 5. Register in the main barrel

Add the lines in `src/components/index.ts`:

```ts
export { <Name> } from './<Name>'
export type { <Name>Props } from './<Name>'
```

No need to touch `src/index.ts` — it already re-exports everything from `src/components/index.ts`.

### 6. Create the story

Create `src/stories/<Name>.stories.ts` (or `.tsx` if you need JSX in the file):

```ts
import type { Meta, StoryObj } from '@storybook/react-vite'
import { <Name> } from '../components'

const meta: Meta<typeof <Name>> = {
  title: 'Components/<Name>',
  component: <Name>,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof <Name>>

export const Default: Story = {
  args: {
    // default props
  },
}
```

### 7. Verify

```bash
pnpm storybook    # review the component visually
pnpm build        # verify dist/ generates correctly
pnpm lint         # no errors
```

---

## Modifying an existing component

### Changing styles or behavior

1. Find the component in `src/components/<Name>/`
2. Modify `<Name>.tsx` and/or `<Name>.module.css` as needed
3. If you add new props, update the `<Name>Props` interface
4. Update the story in `src/stories/<Name>.stories.ts` to cover the changes

### Adding a variant or new prop

1. Add the prop to the `<Name>Props` interface in `<Name>.tsx`
2. Add the corresponding styles in `<Name>.module.css`
3. Add a new story that demonstrates the variant

### Adding or modifying tokens

Design tokens live in `src/styles/tokens.css`. If you need a new token:

1. Add it in `tokens.css` with the `--flowi-` prefix (e.g., `--flowi-color-warning`)
2. Use it in the component's CSS Module via `var(--flowi-color-warning)`

### Verify

Always before committing:

```bash
pnpm storybook    # review changes visually
pnpm build        # verify it compiles
pnpm lint         # no errors
```

---

## Checklist before opening a PR

- [ ] Branch is created from the correct base branch and follows the project naming convention
- [ ] Issue or feature context is referenced in the PR description when relevant
- [ ] Component extends native HTML attributes where appropriate
- [ ] Props exported as `type`
- [ ] Styles use `--flowi-*` tokens
- [ ] `:focus-visible` with outline defined
- [ ] `:disabled` handled if applicable
- [ ] Barrel exports updated (`component/index.ts` + `components/index.ts`)
- [ ] Story created with `tags: ['autodocs']`
- [ ] `pnpm build`, `pnpm lint`, and relevant Storybook checks pass
- [ ] Visual or behavioral changes are described clearly in the PR
