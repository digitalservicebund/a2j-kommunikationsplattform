# 3. Guidelines for testing

Date: 2025-04-10

## Status

Pending

## Context

To be defined: The issue motivating this decision, and any context that influences or constrains the decision.

We need to ensure that our application is well tested so that all features work as expected for our users. There are many ways to achieve good test coverage, this ADR will document our testing guidelines.

## Decision

To be defined: The change that we're proposing or have agreed to implement.

- We prefer end-to-end tests, every user journey should be covered through a dedicated e2e test.
  - This ensures that our application works from the user's perspective and allows us to iteratively and constantly release software changes while ensuring that everything runs as planned.
- We use unit/component tests when it makes sense.
  - This doesn't mean that no unit tests should be written at all, we can write unit tests as needed and preferred by individual contributors, we don't desire a fix coverage threshold (for example coverage should be greater than 80%). We can adjust that at any time, if we feel that this would improve our work.
  - Unit/component tests should be close to the units to be tested, for example within a `__test__` folder inside a `alert` component folder. This makes it easier to move or delete components later.
- We always test the happy path(s) and think about any unhappy path(s) that we should cover when things can go wrong. For example, long waiting times or good help for our users when errors occur.

### Integration testing with Justiz-Backend-API

We want to test that the communication between both units is working as expected in all possible scenarios. For example: a successfull response, the error handling, dropped requests, different kind of response bodies and anything else that may help us to ensure that all pieces actually play nice with each other.

For example:

- Does our overview page for Verfahren (lawsuits) correctly call the API and handle the response(s)?
- ...

**How to integration testing**

- We could do contract testing to make sure that our two services agree on how they communicate
- ...

## Consequences

To be defined: What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.

- Move unit tests close to the units that they test: `./tests/unit/*` tests will be moved to the appropriate unit within the `./app/*` folder
