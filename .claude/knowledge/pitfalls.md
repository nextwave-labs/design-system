# Pitfalls

Read by architect, software-engineer, code-quality, and qa. Add one line per NEW class of issue found by code-quality or qa (symptom → rule); no duplicates; keep it short.

- **CSS minifier drops declarations**: esbuild drops an unprefixed declaration written before its `-webkit-` twin → write `-webkit-` first; after `pnpm build`, verify CSS features in `dist/styles/flowi.css`.
- **Cross-component overrides** (e.g. a card restyling the button it renders) tie on specificity, and `dist/styles/flowi.css` order follows the export order in `src/components/index.ts` while Storybook follows story imports → stories can't catch it. Use a higher-specificity selector (e.g. `.root .action > *`), never rely on order; verify in `dist/`.
- **Negative margins in `overflow: hidden` roots** clip focus/hover backgrounds → tie the offset to the actual inset per variant.
- **Button `min-width`** with centered content indents short labels → override inside the parent if alignment matters.
- **Stretched-link pattern**: the link `::after` covers the root. Interactive children need `position: relative; z-index`, and only the interactive child should capture pointer events (`pointer-events: none` on wrappers, `auto` on the child) to avoid dead zones.
- **Story args**: assigning `Story.args = …` after the object literal replaces the args → keep args in the literal.
- **Stacking tests**: `userEvent.click(el)` dispatches on `el` and can't prove what is on top → use `document.elementFromPoint` hit-tests for stacking and overlays.
- **Real navigation** (`href`/hash) in the Vitest browser closes the connection → intercept link clicks with a `preventDefault` helper.
- **Vacuous assertions**: every assertion must be able to fail. Don't assert properties no rule sets (e.g. `cursor`); pair negative assertions with a positive one (CSS Module classes are hashed but keep the local name as a substring, so `toMatch(/clickable/)` works).
- **Story type contracts** (`@ts-expect-error`) are checked only by a type check of `tsconfig.app.json` (`tsc -p tsconfig.app.json --noEmit`); lint and build skip stories.
- **Next.js App Router**: function props (e.g. `linkAs={Link}`) can't be passed from Server Components.
- **Vitest browser mode "provider was not specified"**: pass the provider object imported from `@vitest/browser-playwright` (add it as a dev dependency if missing).
