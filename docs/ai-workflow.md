# AI workflow

Flowi ships a set of [Claude Code](https://claude.com/claude-code) agents and skills that take a feature from idea to tested code. They live in `.claude/` and follow the same conventions as the rest of this repo.

## Requirements

- Claude Code installed and logged in (`claude` available in your terminal).
- Dependencies installed with `pnpm install`.
- Playwright Chromium installed once for story tests: `pnpm exec playwright install chromium`.
- Optional: the Playwright MCP, used by QA for browser checks. QA explains how to install it if it is missing.

## Start the manager

```bash
pnpm manager
```

This runs `claude --agent manager`, a Claude Code session where the manager is the main agent. Describe what you want to build or fix. The manager asks the questions it needs, including the design for any visual change, and then runs the other agents for you.

> Always start feature work with `pnpm manager`. Running the manager from inside another session makes it a subagent, and subagents cannot call other agents.

## How it works

```mermaid
flowchart LR
  U[You] --> M[manager]
  M --> A[architect] --> E[software-engineer] --> C[code-quality]
  C -- changes required --> E
  C -- approved --> Q[qa]
  Q -- fail --> E
  Q -- pass --> D[docs]
  D --> M
  M -- asks to commit and open PR --> U
```

| Agent               | What it does                                                                           | Writes code     |
| ------------------- | -------------------------------------------------------------------------------------- | --------------- |
| `manager`           | Clarifies requirements, asks for designs, writes the spec, and runs the pipeline       | No              |
| `architect`         | Turns the spec into a short plan and blocks unnecessary abstractions                   | No              |
| `software-engineer` | Implements the plan with stories and tests                                             | Yes             |
| `code-quality`      | Reviews only the changed files and sends specific fixes back                           | No              |
| `qa`                | Runs the tests and checks the change in a Next.js consumer project (`flowi-next-test`) | Test files only |

QA uses the `../flowi-next-test` project next to this repo, creating it if it does not exist, and never runs tests or uses git there. It installs the packed library there, adds a playground page per feature with all cases, and checks them in the browser. It keeps a record of passed checks in `.claude/qa-log/` (git-ignored), so later rounds only test what changed.

## Skills

Run these inside any Claude Code session in this repo:

| Skill     | What it does                                                                       |
| --------- | ---------------------------------------------------------------------------------- |
| `/commit` | Creates small Conventional Commits with a scope and body. Refuses to run on `main` |
| `/pr`     | Pushes the branch and opens a PR from `.github/pull_request_template.md`           |
| `/docs`   | Updates every doc affected by the current changes                                  |

When QA passes, the manager has `software-engineer` run `/docs` so the documentation matches the change. It then summarizes the result and asks whether to commit and open the PR. `/commit` and `/pr` run only if you say yes. Commits and PRs carry no AI attribution.
