# Repository Copilot Instructions

This is a web application called the “Kommunikationsplattform”. Its purpose is to test new approaches to communication in civil proceedings in Germany. The MVP scope of this new platform includes the following basic functions: filing a lawsuit using structured data (XJustiz), an overview of all open Onlineverfahren lawsuits for a logged-in attorney, and a shared data room for all parties to the proceedings to make documents relevant to the respective case available and accessible.

## Tech stack in use

### Frontend

- React Router in framework mode, server-side rendering, routing
- TypeScript is used for all front-end code

### Testing

- Vitest for unit tests
- Playwright for e2e tests

The following instructions apply to all tasks in this repository.

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
- Add or update tests for new behavior, bug fixes, and edge cases.
  - Unit tests `npm run test` are required.
    - Unit tests should focus on core functionality.
  - End-to-end tests are required `npm run test:e2e`.
    - End-to-end tests should focus on the happy path of a route.
    - End-to-end tests should validate accessibility.
- Always follow good security practices.
- When refactoring, reduce complexity without changing externally visible behavior.

## Scope Guidance

- For TypeScript and JavaScript files, also follow the file-specific rules in .github/instructions/xp-functional-quality.instructions.md.
- If a requested change conflicts with these standards, propose the simplest compliant alternative first.
- If an exception is necessary, keep it narrow and document the rationale near the code.
