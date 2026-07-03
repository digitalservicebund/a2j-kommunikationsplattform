# Repository Copilot Instructions

These instructions apply to all tasks in this repository.

## Delivery Expectations

- Prefer small, incremental changes with clear intent.
- Keep implementations simple and avoid speculative features.
- Prioritize readability: explicit naming, straightforward control flow, and minimal nesting.
- Preserve existing behavior unless a change request explicitly requires behavior changes.

## Design Principles

- Apply DRY by extracting shared intent when duplication is real and recurring.
- Apply YAGNI by implementing only what is required now.
- Prefer functional composition, pure helpers, and immutable transformations where practical.
- Keep side effects isolated at application boundaries.

## Quality and Testing

- Consider a coding task complete only when the full repository test suite passes.
- Add or update tests for new behavior, bug fixes, and edge cases. Relevant script is `npm run test`.
- When refactoring, reduce complexity without changing externally visible behavior.

## Scope Guidance

- For TypeScript and JavaScript files, also follow the file-specific rules in .github/instructions/xp-functional-quality.instructions.md.
- If a requested change conflicts with these standards, propose the simplest compliant alternative first.
- If an exception is necessary, keep it narrow and document the rationale near the code.
