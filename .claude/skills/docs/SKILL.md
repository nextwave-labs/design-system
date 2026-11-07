---
name: docs
description: Update the Flowi repository documentation (docs/, README, CONTRIBUTING, CLAUDE.md, component pages) to match code changes. Use after adding or changing components, props, tokens, scripts, or workflows.
---

# Docs

Keep the docs true to the current state of the code. Short, direct, and easy to scan.

## 1. Find what changed

Run `git diff main...HEAD --stat` (plus uncommitted changes). List the public-facing changes: components, props, variants, tokens, exports, commands, build or workflow behavior.

## 2. Find every place to update

Search for each changed name (`grep -rn`) across these targets and update **all** that apply:

| Change                       | Update                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| New component                | `docs/components/<kebab-name>.md` + link in `docs/components/index.md` + README list |
| Component props / behavior   | `docs/components/<kebab-name>.md`                                                    |
| Tokens                       | `docs/usage.md` or wherever tokens are documented                                    |
| Architecture, build, exports | `docs/architecture.md`, `CLAUDE.md`                                                  |
| Commands, scripts, setup     | `docs/development.md`, `CONTRIBUTING.md`, `CLAUDE.md`, README                        |
| Known pitfalls or fixes      | `docs/troubleshooting.md`                                                            |
| Claude agents or skills      | `CLAUDE.md`                                                                          |

Remove or fix anything that the change made outdated. Stale docs are worse than missing docs.

## 3. Write style

- Describe the state of things: what it is, how to use it, how it works. Not a history of changes.
- Do not explain code line by line. Code speaks for itself; show a short usage example instead.
- Plain words, short sentences, no filler.
- Prefer tables for props and short code blocks for usage.
- Use a Mermaid diagram only when a flow or relationship is hard to explain in text. Keep it small.
- Match the structure of existing pages. Component pages follow `docs/components/button.md`: title, one-line intro, Import, Props table, usage example, framework notes when relevant, Accessibility.
- Write in English. Prettier formats Markdown on commit.

## 4. Report

List the files you updated with one line each about what changed.
