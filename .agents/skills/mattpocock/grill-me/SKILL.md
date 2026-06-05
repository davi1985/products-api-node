---
name: grill-me
---

# Grill-Me Skill

Get relentlessly interviewed about a plan or design.

## When to use

- Before starting a big feature
- Design review
- Architecture decisions
- Want to find blind spots

## Format

Agent asks rapid-fire questions like:

- "What if X fails?"
- "How does this scale?"
- "What's the rollback plan?"
- "Why not alternative Y?"

## Rules

- Answer directly
- No hand-waving
- If unsure, say "Don't know, need to research"
- Every branch of decision tree must be resolved

## Commands

| Command            | Action                 |
| ------------------ | ---------------------- |
| `/grill-me`        | Start grilling session |
| `/grill-me plan`   | Grill current plan     |
| `/grill-me design` | Grill current design   |

## Example Session

```
Q: What happens if the database is down?
A: We return 503 with retry-after header.

Q: How long is the retry-after?
A: 5 seconds, configurable.

Q: What if downstream API times out?
A: Circuit breaker kicks in after 3 failures.

Q: What's the failure threshold reset?
A: 30 seconds of healthy responses.
```

Continue until no more questions.
