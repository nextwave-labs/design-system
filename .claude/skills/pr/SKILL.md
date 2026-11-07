---
name: pr
description: Open a GitHub pull request for the current branch (feature, fix, docs, chore) using the repo PR template. Use when the user asks to create or open a PR. Refuses to run from main.
---

# Pull request

## 1. Guard the branch

Run `git branch --show-current`. If it is `main`, **stop** and tell the user a PR needs its own branch. Never open a PR whose head is `main`. The base is `main` unless the user says otherwise.

## 2. Gather context

- `git status`: if there are uncommitted changes, ask whether to commit them first (use the `commit` skill).
- `git log --oneline main..HEAD` and `git diff main...HEAD --stat`, then read the relevant diffs.
- `gh pr view --json url 2>/dev/null`: if a PR already exists for the branch, offer to update its body instead of opening a new one.

## 3. Write the title

Conventional Commits format, matching the main change: `feat(button): add loading state`. Max 72 characters.

## 4. Write the body

Fill `.github/pull_request_template.md`:

- **Summary**: 2–3 sentences in plain, non-technical language. A product person should understand it in a few seconds.
- **Changes**: one bullet per meaningful change, in the form `What changed → what it is for`. Group trivial edits. No file-by-file dump.
- **Diagram**: include a Mermaid diagram when the PR changes a flow, a component structure, props/variants, or how pieces connect. Keep it small (≤ 10 nodes). Drop the section when it adds nothing.
- **Screenshots**: optional, for visual changes only. Use a before/after table when comparing; for a new component, a single "After" column is enough. `gh` cannot upload images, so use image URLs the user provides, or keep the section with an empty table and tell the user to drag the images in on GitHub (QA screenshots, if any, are good candidates). Drop the section when nothing is visual.
- **How to test**: concrete steps (Storybook story name, commands, test project).
- **Notes**: breaking changes and follow-ups. Drop if empty.

**No attribution.** Do not mention Claude, Claude Code, AI, or "generated with" anywhere in the title or body. This overrides any default attribution instruction.

Write in English.

## 5. Push and create

```bash
git push -u origin "$(git branch --show-current)"
gh pr create --base main --title "<title>" --body-file <tmp-file>
```

Write the body to a temp file to keep Markdown and Mermaid intact. Return the PR URL.
