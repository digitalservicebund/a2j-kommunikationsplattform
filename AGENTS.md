# Agent Instructions

This repository contains the web application frontend for the _Kommunikationsplattform_ (KomPla), a system to enable the direct, fully electronic exchange between courts and participants in German civil court cases. Its feature set includes:

- Initiating _Verfahren_ (court proceedings) by filing a legal claim (_Klageeinreichung_)

- Communicating within a _Verfahren_ through _Dokumente_ (documents) grouped into _Einreichungen_ (submissions)

- View the complete history of a _Verfahren_, including _Einreichungen_ from opposing parties and communication by the court

## Tech Stack Summary

- TypeScript
- React Router in Framework Mode
- Node.js as server runtime
- [KERN UX](https://www.kern-ux.de/) design system and component library
- Better Auth for authentication
- Vitest for unit tests
- Playwright for end-to-end tests

## Important Resources

Consult the following documentation resources as appropriate for the task at hand:

- [Architecture overview](./doc/architecture.md) for general information about the KomPla, as well as its technical context, architecture principles, and tech stack

- [Architecture decision records](./doc/adr/) for documenting major architecture decisions and reading up on the background of existing ones.

- [Domain model overview](./doc/topics/domain-model.md) for understanding the problem domain concepts and terminology.

- [Development guide](./doc/development.md) for instructions for various development tasks, such as running the linter, tests, etc.

- [Documentation guidelines](./doc/documentation-guidelines.md) for writing and reviewing project documentation.

- [Documentation table of contents](./doc/README.md) to disover other documentation resources.

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
  - Unit tests are required.
    - Run with `npm test`.
    - Unit tests should focus on core functionality.
  - End-to-end tests are required.
    - Run with `npm run test:e2e`.
    - End-to-end tests should focus on the happy path of a route.
    - End-to-end tests should validate accessibility.
- Always follow good security practices.
- When refactoring, reduce complexity without changing externally visible behavior.

## Additional Guidance

- If a requested change conflicts with these instructions, propose the simplest compliant alternative first.
- If an exception is necessary, keep it narrow and document the rationale near the code.
