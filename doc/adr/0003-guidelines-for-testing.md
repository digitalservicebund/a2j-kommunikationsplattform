# 3. Guidelines for testing

Date: 2025-04-10

## Status

Pending

## Context

To be defined: The issue motivating this decision, and any context that influences or constrains the decision.

We need to ensure that our application is well tested so that all features work as expected for our users. There are many ways to achieve good test coverage, this ADR will document our testing guidelines.

## Decision

To be defined: The change that we're proposing or have agreed to implement.

### We want to test the entire user journey through our application, from start to finish, to ensure that all the building blocks work together as expected.

- **We prefer end-to-end (E2E) tests**, every user journey should be covered through a dedicated e2e test.
  - This ensures that our application works from the user's perspective and allows us to iteratively and constantly release software changes while ensuring that everything runs as planned.
- **We use unit/component tests when it makes sense.**
  - This doesn't mean that no unit tests should be written at all. We can write unit tests as they are needed and as the individual contributors prefer. But we don't want a threshold for defect coverage. Example: Coverage should be greater than 80%. We can always change this if we feel it would improve our work.
  - Unit/component tests should be close to the units to be tested, for example within a `__test__` folder inside an `<Alert />` component folder `app/components/alert/*`. This makes it easier to move or delete components later.
- **We always test the happy path(s) and think about any unhappy path(s)** that we should cover when things can go wrong. For example, long waiting times or necessary error messages for our users in the event of errors.

### Integration testing with Justiz-Backend-API (JBA)

We want to test that the communication between both units is working as expected in all possible scenarios. For example: a successfull response, the error handling, dropped requests, different kind of response bodies and anything else that may help us to ensure that all pieces actually play nice with each other.

For example:

- Does our overview page for Verfahren (lawsuits) correctly call the API and handle the response(s)?
- Does a POST request respond with `status: 200, headers: {'Content-Type': 'application/json'}`

#### Integration testing options

- Contract testing
  - Tests the agreement (contract) between a service provider and a consumer, ensuring they integrate as expected.
    Use case: _If Service A (our frontend) depends on Service B (the Justiz-Backend-API), contract tests ensure Service B always returns the exact format and content that Service A expects — even if B is updated independently._
  - We can make this possible with:
    - [Pact](https://docs.pact.io/), popular for consumer-driven contract testing. See how it works [here](https://docs.pact.io/getting_started/how_pact_works)
    - Or with [Dredd](https://dredd.org/en/latest/), validates an API against a contract
- API Schema validation
  - Validates that API requests and responses match a defined schema (like OpenAPI/Swagger, JSON Schema, etc.).
  - Possible tools for this:
    - OpenAPI Validators
    - JSON Schema Validator
    - Express middlewares (e.g. `express-openapi-validator`)
- **End-to-end (E2E) testing** ([Playwright](https://playwright.dev/) is already configured and working for this project)
  - **with a simulated backend API.**
  - For example with:
    - [Prism](https://stoplight.io/open-source/prism): The [concepts](https://docs.stoplight.io/docs/prism/1593d1470e4df-concepts) of Prism.
    - [MSW](https://mswjs.io/) (Mock Service Worker): JavaScript based API mocking. It enables the shared use of mocks for development, unit and E2E tests.
    - [OpenAPI Backend](https://openapistack.co/docs/openapi-backend/intro/): Is a Framework-agnostic middleware tool for building APIs with OpenAPI Specification.
  - **with a shared staging or sandbox API of the Justiz-Backend-API.**
    - To make this possible we need to prepare, create, publish and maintain a new dedicated JBA environment (e.g. `https://staging-kompla.sinc.de/api/v1/verfahren`). It also needs to be accessible for local development and within the GitHub Actions Runner of this project. Currently the JBA service allows only whitelisted IP addresses access to the resource.

|                                    | Contract testing | API Schema validation | E2E w/ simulated API | E2E w/ staging or sandbox API |
| ---------------------------------- | ---------------- | --------------------- | -------------------- | ----------------------------- |
| Fault Detection Effectiveness [^1] | ok               | ok                    | good                 | good                          |
| Time to Execute & Maintain [^2]    | ok               | ok                    | good                 | good                          |
| Easy to use [^3]                   | easy             | easy                  | ok                   | much                          |
| External dependencies [^4]         | no               | no                    | no                   | yes                           |

## Consequences

To be defined: What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.

- Move unit tests close to the units that they test: `./tests/unit/*` tests will be moved to the appropriate unit within the `./app/*` folder

[^1]: (good/ok/bad) Can it detect timing issues, interface mismatches or data integrity problems?

[^2]: (good/ok/bad) Complexity of writing and updating tests, CI/CD compatibility and runtime speed.

[^3]: (easy/ok/much) Time, resources, effort to get it up and running.

[^4]: (yes/no) E.g. maintenance of a testing environment
