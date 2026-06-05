---
name: diagnose
---

# Diagnose Skill

Disciplined diagnosis loop for hard bugs and performance regressions.

## When to use

- Bugs that don't reproduce consistently
- Performance regressions
- "It works on my machine" issues
- Mystery failures

## The Loop

```
Reproduce → Minimise → Hypothesise → Instrument → Fix → Regression-test
```

## Steps

1. **Reproduce** - Create minimal reproduction case
2. **Minimise** - Strip away everything non-essential
3. **Hypothesise** - Form a testable theory
4. **Instrument** - Add logging/metrics to validate
5. **Fix** - Apply the smallest fix possible
6. **Regression-test** - Ensure it doesn't happen again

## Commands

| Command                | Action                   |
| ---------------------- | ------------------------ |
| `/diagnose`            | Start diagnosis loop     |
| `/diagnose reproduce`  | Focus on reproduction    |
| `/diagnose hypothesis` | Form and test hypothesis |
| `/diagnose instrument` | Add instrumentation      |

## Anti-patterns

- ❌ Guessing without data
- ❌ Big bang fixes
- ❌ No regression test
