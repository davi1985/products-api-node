---
name: handoff
---

# Handoff Skill

Compact current conversation into a handoff document.

## When to use

- Switching agents mid-session
- Long-running work interrupted
- Context too large for memory
- New session, same task

## Output Format

```markdown
# Handoff: [Task Name]

## Current State

- Files modified: [list]
- Tests status: [passing/failing]
- Blockers: [if any]

## Decisions Made

1. [Decision with rationale]
2. [Decision with rationale]

## Next Steps

1. [Next task]
2. [Next task]

## Context

[Brief technical context]
```

## Commands

| Command          | Action                    |
| ---------------- | ------------------------- |
| `/handoff`       | Generate handoff document |
| `/handoff brief` | One-line summary          |
