---
name: setup-pre-commit
---

# Setup Pre-Commit Skill

Set up Husky pre-commit hooks with lint-staged, Prettier, type checking, and tests.

## When to use

- New project setup
- Adding code quality gates
- Preventing bad commits
- Team consistency

## What it sets up

1. **Husky** - Git hooks framework
2. **lint-staged** - Run linters on git staged files
3. **Prettier** - Code formatting
4. **TypeScript** - Type checking
5. **Tests** - Run related tests

## Installation

```bash
npx husky-init && npm install
npm install -D lint-staged prettier
```

## Configuration

Creates `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

Creates `lint-staged.config.js`:

```js
module.exports = {
  "*.{ts,tsx}": ["prettier --write", "tsc --noEmit", "vitest related --run"],
};
```

## Commands

| Command                   | Action                |
| ------------------------- | --------------------- |
| `/setup-pre-commit`       | Install and configure |
| `/setup-pre-commit check` | Verify setup          |

## What gets blocked

- Unformatted code
- Type errors
- Failing tests
- Lint violations
