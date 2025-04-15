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

### Integration testing with Justiz-Backend-API

We want to test that the communication between both units is working as expected in all possible scenarios. For example: a successfull response, the error handling, dropped requests, different kind of response bodies and anything else that may help us to ensure that all pieces actually play nice with each other.

For example:

- Does our overview page for Verfahren (lawsuits) correctly call the API and handle the response(s)?
- Does a POST request respond with `status: 200, headers: {'Content-Type': 'application/json'}`

#### Integration testing options

- Contract testing
  - We could do contract testing to make sure that our two services agree on how they communicate. For example with:
    - [Pact](https://docs.pact.io/): How it [works](https://docs.pact.io/getting_started/how_pact_works).
- End-to-end (E2E) testing with a simulated backend API. For example with:
  - [Prism](https://stoplight.io/open-source/prism): The [concepts](https://docs.stoplight.io/docs/prism/1593d1470e4df-concepts) of Prism.
- End-to-end (E2E) testing with a shared staging or sandbox API of the Justiz-Backend-API. For example with:
  - [Playwright](https://playwright.dev/), it is already configured for this project.
- API Schema validation (with OpenAPI / Swagger)
- We could use an OpenAPI spec to validate the frontend’s requests and expected responses. For example with:
  - [Prism](https://stoplight.io/open-source/prism)
- ...

## Consequences

To be defined: What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.

- Move unit tests close to the units that they test: `./tests/unit/*` tests will be moved to the appropriate unit within the `./app/*` folder
