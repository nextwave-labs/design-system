#!/usr/bin/env bash
# Scaffolds a new Flowi component with all required files and wires it
# into the three-level export chain (component index -> components index -> src index).
#
# Usage: ./scripts/create-component.sh <ComponentName>
# Or:    make component NAME=ComponentName

set -euo pipefail

NAME="${1:-}"

if [ -z "$NAME" ]; then
  echo "Error: missing component name."
  echo "Usage: make component NAME=ComponentName"
  exit 1
fi

if ! [[ "$NAME" =~ ^[A-Z][A-Za-z0-9]*$ ]]; then
  echo "Error: '$NAME' is not PascalCase. Use e.g. Badge, InputField, Tooltip."
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPONENT_DIR="$ROOT_DIR/src/components/$NAME"
COMPONENTS_INDEX="$ROOT_DIR/src/components/index.ts"
SRC_INDEX="$ROOT_DIR/src/index.ts"
DOCS_COMPONENTS_DIR="$ROOT_DIR/docs/components"
DOC_FILE="$DOCS_COMPONENTS_DIR/${NAME,,}.md"
DOCS_INDEX="$DOCS_COMPONENTS_DIR/index.md"

if [ -d "$COMPONENT_DIR" ]; then
  echo "Error: src/components/$NAME already exists."
  exit 1
fi

mkdir -p "$COMPONENT_DIR" "$DOCS_COMPONENTS_DIR"

# --- Component.tsx -----------------------------------------------------
cat > "$COMPONENT_DIR/$NAME.tsx" << EOF
import styles from './$NAME.module.css'

/**
 * $NAME
 *
 * Checklist when scaffolding/renaming a component by hand (the
 * \`make component\` script already does this for you):
 *   1. Export the component + its props type from this folder's index.ts
 *   2. Re-export both from src/components/index.ts
 *   3. Re-export both from src/index.ts (the library's public entry point)
 *   4. Add a Storybook story with a play function: $NAME.stories.ts
 *      (that play function is the component's interaction check in
 *      Storybook. The browser test project is configured for future
 *      automated execution through addon-vitest and Playwright.
 *      There is no separate $NAME.test.tsx: this project has no
 *      Testing Library / jsdom set up, so a plain .test.tsx file would
 *      not be picked up by vite.config.ts's vitest project.)
 *   5. Style with tokens only (--flowi-*) in $NAME.module.css
 */
export interface ${NAME}Props
  extends React.HTMLAttributes<HTMLDivElement> {
  // TODO: replace HTMLAttributes<HTMLDivElement> with the right native
  // element type (e.g. ButtonHTMLAttributes<HTMLButtonElement>) and add
  // component-specific props here.
}

export function $NAME({ className, children, ...rest }: ${NAME}Props) {
  const classNames = [styles.root, className].filter(Boolean).join(' ')

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  )
}
EOF

# --- Component.module.css ----------------------------------------------
cat > "$COMPONENT_DIR/$NAME.module.css" << EOF
.root {
  /* TODO: style using --flowi-* design tokens, e.g.: */
  /* color: var(--flowi-color-text-primary); */
  /* font-family: var(--flowi-font-family-base); */
}
EOF

# --- Component documentation -------------------------------------------
cat > "$DOC_FILE" << EOF
# $NAME

Describe the purpose and intended use of $NAME.

## Import

\`\`\`tsx
import { $NAME } from '@flowi/ui'
\`\`\`

## Props

Document the public props, supported values, defaults, and native HTML attributes.

## Usage

\`\`\`tsx
<$NAME>$NAME</$NAME>
\`\`\`

## Accessibility

Document the component's keyboard behavior, accessible name requirements, and any relevant ARIA guidance.

## Notes

Add framework-specific guidance, theming details, or constraints here when needed.
EOF

printf '%s\n' "- [$NAME](${NAME,,}.md) - add component summary" >> "$DOCS_INDEX"

# --- index.ts (component barrel) ----------------------------------------
cat > "$COMPONENT_DIR/index.ts" << EOF
export { $NAME } from './$NAME'
export type { ${NAME}Props } from './$NAME'
EOF

# --- Component.stories.ts ------------------------------------------------
# The play function below is this component's interaction check in Storybook.
cat > "$COMPONENT_DIR/$NAME.stories.ts" << EOF
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'
import { $NAME } from './$NAME'

const meta: Meta<typeof $NAME> = {
  title: 'Components/$NAME',
  component: $NAME,
  tags: ['autodocs'],
  argTypes: {
    // TODO: describe controls for the props added above
  },
}

export default meta
type Story = StoryObj<typeof $NAME>

export const Default: Story = {
  args: {
    children: '$NAME',
  },
  play: async ({ canvasElement, args }) => {
    // TODO: replace/extend with real interaction assertions for $NAME.
    const canvas = within(canvasElement)
    await expect(canvas.getByText(String(args.children))).toBeInTheDocument()
  },
}
EOF

# --- Wire into src/components/index.ts -----------------------------------
{
  echo "export { $NAME } from './$NAME'"
  echo "export type { ${NAME}Props } from './$NAME'"
} >> "$COMPONENTS_INDEX"

# --- Wire into src/index.ts -----------------------------------------------
{
  echo "export { $NAME } from './components'"
  echo "export type { ${NAME}Props } from './components'"
} >> "$SRC_INDEX"

echo ""
echo "Created src/components/$NAME/"
echo "  $NAME.tsx"
echo "  $NAME.module.css"
echo "  $NAME.stories.ts"
echo "  index.ts"
echo ""
echo "Created docs/components/${NAME,,}.md"
echo ""
echo "Wired exports into:"
echo "  src/components/index.ts"
echo "  src/index.ts"
echo "  docs/components/index.md"
echo ""
echo "Next steps:"
echo "  1. Pick the right native element/attrs for ${NAME}Props in $NAME.tsx"
echo "  2. Style $NAME.module.css using --flowi-* tokens"
echo "  3. Fill in argTypes/args and the play function in $NAME.stories.ts"
echo "  4. Complete docs/components/${NAME,,}.md"
echo "  5. Review the story with pnpm storybook"
