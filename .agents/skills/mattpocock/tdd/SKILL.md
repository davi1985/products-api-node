---
name: tdd
---

# TDD Skill

Test-Driven Development with a red-green-refactor loop.

## When to use

Use when building features or fixing bugs. One vertical slice at a time.

## Steps

1. **Red** - Write a failing test first
2. **Green** - Write minimum code to pass
3. **Refactor** - Clean up without breaking tests

## Commands

| Command         | Action                          |
| --------------- | ------------------------------- |
| `/tdd`          | Start TDD loop for current task |
| `/tdd next`     | Move to next slice              |
| `/tdd refactor` | Enter refactor phase            |

## Rules

- Never write production code without a failing test
- One test at a time
- Fast feedback loop (< 10s ideally)
- Refactor only on green
