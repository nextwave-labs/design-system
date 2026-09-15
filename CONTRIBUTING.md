# Contributing to Flowi

Thanks for your interest in contributing. This guide explains how to set up your environment, create or modify components, and submit your pull request.

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

This also sets up Husky git hooks automatically (`prepare` script).

### 2. Verify everything works

```bash
pnpm build
pnpm lint
pnpm storybook
```

## Workflow

### 1. Create a branch

Create a branch from the corresponding `feat/<component>` branch:

```bash
git fetch origin
git checkout -b feat/alert-my-change origin/feat/alert
```

Your working branch must derive from the `feat/` branch of the component you're working on.

### 2. Make your changes

See the [Adding a new component](#adding-a-new-component) or [Modifying an existing component](#modifying-an-existing-component) sections as needed.

### 3. Commits

The project uses [Conventional Commits](https://www.conventionalcommits.org/). You can use the interactive prompt:

```bash
pnpm commit
```

Or write the message manually following the format:

```
feat(button): add loading state
fix(alert): correct border-radius on mobile
```

The `commit-msg` hook validates the format automatically. If the commit doesn't follow the convention, it will be rejected.

### 4. Push and pull request

```bash
git push origin feat/alert-my-change
```

Then on GitHub, open a **Pull Request** targeting the `feat/<component>` branch (e.g., `feat/alert`), **not `main`**. In the PR description:

- Explain **what** changes and **why**
- If it's a new component, include a Storybook screenshot
- If it modifies an existing component, describe the before/after

### 5. Review and merge

A maintainer will review the PR and merge it into the `feat/` branch. When the feature is ready, a maintainer will merge the `feat/` branch into `main`, where semantic-release handles versioning and publishing to npm automatically.

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

- [ ] Component extends native HTML attributes
- [ ] Props exported as `type`
- [ ] Styles use `--flowi-*` tokens
- [ ] `:focus-visible` with outline defined
- [ ] `:disabled` handled if applicable
- [ ] Barrel exports updated (`component/index.ts` + `components/index.ts`)
- [ ] Story created with `tags: ['autodocs']`
- [ ] `pnpm build` and `pnpm lint` pass
