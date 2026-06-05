---
name: zoom-out
---

# Zoom-Out Skill

Get broader context or higher-level perspective.

## When to use

- Unfamiliar section of code
- Been deep in implementation details too long
- Lost track of the big picture
- Need architecture context

## Commands

| Command            | Action                  |
| ------------------ | ----------------------- |
| `/zoom-out`        | Show high-level context |
| `/zoom-out arch`   | Architecture overview   |
| `/zoom-out domain` | Domain model summary    |

## Output

```
Current file: src/domain/entities/product.ts

Context:
- Part of: Domain layer
- Used by: ProductService, Controllers
- Pattern: Entity with Value Objects
- Related: Money, ProductId

Architecture:
┌─ Controllers ─┐
├─ Application ─┤
├─ Domain (you are here) ─┤
└─ Infrastructure ─┘
```
