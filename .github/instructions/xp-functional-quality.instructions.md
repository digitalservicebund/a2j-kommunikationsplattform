---
description: "Use when implementing or refactoring TypeScript or JavaScript code. Enforces extreme programming practices, functional programming style, DRY and YAGNI decisions, readable code, and test-complete changes."
name: "XP Functional Quality Rules"
applyTo: "**/*.{ts,tsx,js,jsx}"
---

# XP Functional Quality Rules

- Work in small, safe increments: make the smallest useful change and keep behavior explicit.
- Prefer functional style: pure functions, immutable data transforms, and composition over class-heavy designs.
- Keep side effects at boundaries: isolate I/O, network, storage, and framework effects behind small adapters.
- Enforce DRY: remove duplication by extracting shared intent, not by creating speculative abstractions.
- Enforce YAGNI: implement only what the current requirement needs; do not add future-facing options without a concrete use case.
- Optimize for readability: clear names, short functions, linear control flow, and minimal nesting.
- Preserve or improve tests with every change: the full repository test suite must pass before considering the task complete.
- Add or update tests for new behavior and bug fixes, including edge cases and failure paths.
- Prefer refactors that reduce complexity metrics (branching, state mutation, coupling) without changing externally visible behavior.

## Working Agreement

- These are hard rules for this repository's TS/JS code; treat them as defaults, not optional preferences.
- If a requested implementation conflicts with these rules, propose the simplest compliant alternative first.
- If a rule must be broken, document the reason in code comments near the exception and keep the exception narrow.
