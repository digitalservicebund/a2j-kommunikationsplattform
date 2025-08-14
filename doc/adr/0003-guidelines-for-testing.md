# 3. Guidelines for testing

- 2025-04-10: Drafted
- 2025-05-15: Accepted
- 2025-08-14: Updated

## Status

Accepted

## Context

We need to ensure that our application is well tested so that all features work as expected for our users. There are many ways to achieve good test coverage, this ADR will document our testing guidelines.

## Decision

### We want to test the entire user journey through our application, from start to finish, to ensure that all the building blocks work together as expected.

- **We prefer end-to-end (E2E) tests**, every user journey should be covered through a dedicated e2e test.
  - This ensures that our application works from the user's perspective and allows us to iteratively and constantly release software changes while ensuring that everything runs as planned.
  - Meaning: All routes (`app/routes/**`) that are being delivered as a page to our users should be e2e tested. Routes that handle server side functionality, an API or action route for example, should be unit tested, if it makes sense.
- **We use unit/component tests when it makes sense.**
  - This doesn't mean that no unit tests should be written at all. We can write unit tests as they are needed and as the individual contributors prefer. But we don't want a threshold for defect coverage. Example: Coverage should be greater than 80%. We can always change this if we feel it would improve our work.

    However, [SonarQube](https://sonarcloud.io/project/information?id=digitalservicebund_a2j-kommunikationsplattform) is currently configured with the “Sonar Way” quality gate, which performs the following checks on every new piece of code that is committed:

    _New code has sufficient test coverage: Coverage is greater than or equal to 80.0%_

  - Unit/component tests should be close to the units to be tested, for example within a `__test__` folder inside an `<Alert />` component folder `app/components/alert/*`. This makes it easier to move or delete components later.

- **We always test the happy path(s) and think about any unhappy path(s)** that we should cover when things can go wrong. For example, long waiting times or necessary error messages for our users in the event of errors.

### Integration testing with Justiz-Backend-API

We want to test that the communication between both units is working as expected in all possible scenarios. For example: a successfull response, the error handling, dropped requests, different kind of response bodies and anything else that may help us to ensure that all pieces actually play nice with each other.

These could be questions such as:

- Does our overview page for Verfahren (lawsuits) correctly call the API and handle the response(s)?
- Does a POST request respond with `status: 200, headers: {'Content-Type': 'application/json'}`

**To ensure this, we write end-to-end tests (E2E) against a simulation of the backend API using [Mock Service Worker](https://mswjs.io/).**

Why we do this and how we decided to use Mock Service Worker can be read in the following section "[Integration testing (IT) options](#integration-testing-it-options)".

Skip to [Consequences](#consequences).

---

#### Integration testing (IT) options

- **Contract testing**
  - Tests the agreement (contract) between a service provider and a consumer, ensuring they integrate as expected. Use case: _If Service A (our frontend) depends on Service B (the Justiz-Backend-API), contract tests ensure Service B always returns the exact format and content that Service A expects – even if B is updated independently._
  - We can make this possible with:
    - [Pact](https://docs.pact.io/), popular for consumer-driven contract testing. See how it works [here](https://docs.pact.io/getting_started/how_pact_works)
    - Or with [Dredd](https://dredd.org/en/latest/), validates an API against a contract
- **API Schema validation**
  - Validates that API requests and responses match a defined schema (like OpenAPI/Swagger, JSON Schema, etc.).
  - Possible tools for this:
    - OpenAPI Validators
    - JSON Schema Validator
    - Express middlewares (e.g. `express-openapi-validator`)
- **End-to-end (E2E) testing** ([Playwright](https://playwright.dev/) is already configured and working for this project)
  - **with a simulated backend API.** For example with:
    - [Prism](https://stoplight.io/open-source/prism): The [concepts](https://docs.stoplight.io/docs/prism/1593d1470e4df-concepts) of Prism.
    - [MSW](https://mswjs.io/) (Mock Service Worker): JavaScript based API mocking. It enables the shared use of mocks for development, unit and E2E tests.
    - [OpenAPI Backend](https://openapistack.co/docs/openapi-backend/intro/): Is a Framework-agnostic middleware tool for building APIs with OpenAPI Specification.
  - **with a shared staging or sandbox API of the Justiz-Backend-API (JBA).**
    - To make this possible we need to prepare, create, publish and maintain a new dedicated JBA environment (e.g. `https://staging-kompla.sinc.de/api/v1/verfahren`). It also needs to be accessible for local development and within the GitHub Actions Runner of this project. Currently the JBA service allows only whitelisted IP addresses access to the resource.

| IT comparison table                | Contract testing | API Schema validation | E2E w/ simulated API | E2E w/ staging or sandbox API |
| ---------------------------------- | ---------------- | --------------------- | -------------------- | ----------------------------- |
| Fault detection effectiveness [^1] | ok               | ok                    | good                 | good                          |
| Time to execute & maintain [^2]    | ok               | ok                    | good                 | good                          |
| Easy to use [^3]                   | easy             | easy                  | ok                   | not really                    |
| External dependencies [^4]         | no               | no                    | no                   | yes                           |

Based on the above options, it was decided to proceed with **end-to-end (E2E) tests simulating the backend API**, as this is where we have the fewest external dependencies. Using an OpenAPI specification of the backend API as single source of truth, we can simulate the API in a good way and start development quickly. Further integration tests can be added later, e.g. when a production environment exists. Local development is also simplified by a simulated backend API.

The following tools have been tested:

- [Prism](https://stoplight.io/open-source/prism)
  - CLI tool is great and delivers data in no time. For example by running `prism mock doc/api/swagger.json`.
- [MSW](https://mswjs.io/)
  - Great [documentation](https://mswjs.io/docs) and examples to get up and running. No need to install a CLI tool, after the [installation](https://mswjs.io/docs/getting-started) of the npm package responses [can be mocked](https://mswjs.io/docs/basics/mocking-responses/).
- [OpenAPI Backend](https://openapistack.co/docs/openapi-backend/intro/)
  - Takes some time to get a mock server up and running. See the [boilerplate examples](https://openapistack.co/docs/examples/boilerplate/) for a good first impression, e. g. the [express-ts-mock](https://github.com/openapistack/openapi-backend/tree/main/examples/express-ts-mock) example or use the [openapi-generator-cli](https://openapi-generator.tech/docs/installation/): `openapi-generator-cli generate -i openapi.yaml -g nodejs-express-server -o mock-server
`
- [MockServer](https://www.mock-server.com/)
  - Has a Java dependency. The mock server can be set up and operated with a Docker image, see [jamesdbloom/mockserver](https://hub.docker.com/r/jamesdbloom/mockserver). As this degrades the development experience, it is not appropriate here.
- [Mockoon CLI](https://mockoon.com/)
  - CLI tool is great and delivers data in no time, for example with `mockoon-cli start --data doc/api/swagger.json`.

| Stub/mock API tools comparison table | Prism | MSW  | OpenAPI Backend | MockServer | Mockoon CLI |
| ------------------------------------ | ----- | ---- | --------------- | ---------- | ----------- |
| Initial setup [^5]                   | ok    | good | ok              | bad        | good        |
| Easy to use [^3]                     | ok    | ok   | ok              | not really | easy        |
| Helpful for our use case             | yes   | yes  | yes             | no         | yes         |

General notes in regards to all tested options:

As soon as the mock/stub is running (e.g. with [Mockoon CLI](https://mockoon.com/cli/) `mockoon-cli start --data doc/api/swagger.json`) simple API calls can be made. For example `curl -i -X "GET" "http://localhost:3000/api/v1/verfahren?limit=10&offset=0" -H "accept: application/json" -H "X-User-ID: TestId"`:

```
HTTP/1.1 200 OK

...

[
  {
    "id": "df983b9c-5842-4f0b-ad21-e97119927f14",
    "aktenzeichen": "",
    "status": "Erstellt",
    "status_changed": "Thu May 15 2025 05:01:38 GMT+0200 (Mitteleuropäische Sommerzeit)",
    "eingereicht_am": "Thu May 15 2025 11:17:50 GMT+0200 (Mitteleuropäische Sommerzeit)",
    "gericht_name": ""
  }
]
```

However, when it comes to parameter-based API calls or API calls that build on each other, none of the solutions could provide suitable responses out of the box. No tool was found within the npm Ecosystem that could do this without additional effort. To give an example: Getting a specific `Verfahren` based on the previously received `id` parameter was not possible with the Mockoon CLI: `curl -i -X "GET" "http://localhost:3000/api/v1/verfahren/df983b9c-5842-4f0b-ad21-e97119927f14" -H "accept: application/json" -H "X-User-ID: TestId"`.

```
HTTP/1.1 404 Not Found

...

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/v1/verfahren/df983b9c-5842-4f0b-ad21-e97119927f14</pre>
</body>
</html>
```

In this case, further manual configuration of the tested tool was required. Be it installing additional tools that, for example, deliver random data based on parameters or switching to the paid version. In the case of Mockoon, this requires the import of the OpenAPI spec into a Mockoon data file (see [documentation](https://mockoon.com/docs/latest/mockoon-data-files/data-files-location/)) and the use of the Mockoon GUI, which in turn is subject to a fee in order to be able to use it without restriction.

**Conclusion for integration testing with Justiz-Backend-API**

Ultimately, [MSW](https://github.com/mswjs/msw) and [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock) provided a good option for implementing API calls automatically and manually using [request interception](https://mswjs.io/docs/basics/intercepting-requests) and [response mocking](https://mswjs.io/docs/basics/mocking-responses/). Manual work is also necessary here, but the result and the associated setup work was by far the best compared to the other options. Specifically for our use case: Enable mock API calls to an external service as realistically as possible for local development as well as for E2E testing.

## Consequences

- Move unit tests close to the units that they test: `./tests/unit/*` tests will be moved to the appropriate unit within the `./app/*` folder
- Remove `JustizBackendService` (see `./app/services/justizBackend.server.ts`), its features and its mock implementation. Use mocked backend API (MSW implementation, see `./mocks/api/**`) instead within the application
  - `Demo mode` option is currently based on this service, a new way must be found to enable it on the staging environment
- Implement and add relevant E2E tests that mock API calls with MSW
- Every page (route that provides a user journey) should be covered through a dedicated e2e test

[^1]: (good/ok/bad) Can it detect timing issues, interface mismatches or data integrity problems?

[^2]: (good/ok/bad) Complexity of writing and updating tests, CI/CD compatibility and runtime speed.

[^3]: (easy/ok/not really) Time, resources, effort to get it up and running and to update it later. Ok means it's easy to use but can require a lot of manual work

[^4]: (yes/no) E.g. maintenance of a testing environment

[^5]: (good/ok/bad) From an OpenAPI Specification JSON file to a running stub/mock of the defined HTTP API, how good, ok or bad is the setup?
