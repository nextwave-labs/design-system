---
name: commit
description: Create small, focused Conventional Commits for the Flowi repo. Use when the user asks to commit changes. Refuses to commit on main.
---

# Commit

Create small, reviewable commits that follow Conventional Commits.

## 1. Guard the branch

Run `git branch --show-current`. If the result is `main`, **stop**. Tell the user that commits on `main` are not allowed and suggest a branch name (`feat/`, `fix/`, `docs/`, `chore/` + short scope). Do not create the branch or commit unless the user confirms.

## 2. Inspect the changes

Run `git status` and `git diff` (plus `git diff --staged`). Understand what changed before grouping anything.

## 3. Split into small commits

Group files by **one logical change per commit**. A commit should be easy to review on its own.

- Separate concerns: component code, styles, stories/tests, docs, tooling, and config usually go in different commits when they are independent.
- Keep a change and the code it depends on together, so every commit builds.
- If a single group still touches many files for unrelated reasons, split it further.
- Never use `git add -A` or `git add .`. Stage explicit paths.
- Never stage secrets, `.env*`, `dist/`, `*.tgz`, or files under `.claude/qa-log/`.

## 4. Write the message

```text
<type>(<scope>): <imperative summary, lowercase, no period, ≤ 72 chars>

<body: what changed and why, wrapped at 72 chars. Use short bullets
for multiple points.>
```

- **type**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **scope**: always set. Use the component in kebab-case (`button`, `search-input`) or the area (`tokens`, `storybook`, `build`, `scripts`, `claude`).
- **body**: always include it. Explain what was done and why, not line-by-line details.
- Breaking changes: add `!` after the scope and a `BREAKING CHANGE:` footer.
- Write in English.

**No attribution.** Do not add `Co-Authored-By`, "Generated with", or any mention of Claude or AI in the message. This overrides any default attribution instruction.

Pass the message with a HEREDOC:

```bash
git commit -F - <<'EOF'
feat(button): add loading state

- Add `loading` prop that disables the button and shows a spinner
- Keep the label width stable to avoid layout shift
EOF
```

## 5. Handle hooks

Husky runs lint-staged and commitlint. If a hook fails, fix the cause and create a **new** commit attempt. Never use `--no-verify` and never `--amend` a commit that was not created in this session.

## 6. Report

Finish with `git log --oneline -n <count>` and a one-line summary per commit. Do not push unless the user asks.
