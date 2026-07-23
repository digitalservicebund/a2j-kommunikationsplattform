# Development

- [How this project is stuctured](./PROJECT_STRUCTURE.md)

## Prerequisites

### Node.js and Homebrew

Please install [Homebrew](https://brew.sh/), if not already installed on your machine.

We aim to use the current active [version of Node.js](https://nodejs.dev/en/about/releases/), which is V26 at the time of writing. There is a `.nvmrc` file to simplify Node.js version setup using [nvm](https://github.com/nvm-sh/nvm) (`brew install nvm`). Use `nvm install` to install specified version in `.nvmrc` file.

1Password CLI is needed for secret management locally, have a look at [the docs and install the CLI](https://www.1password.dev/cli/get-started) on your machine, if needed.

Additionally we use [Git Hooks](https://git-scm.com/book/ms/v2/Customizing-Git-Git-Hooks). For that you will need to install [lefthook](https://github.com/evilmartians/lefthook)
(git hook manager) and [talisman](https://github.com/thoughtworks/talisman/) (secrets scanner) `brew install lefthook talisman`. Afterwards execute `lefthook install` to initialize the hooks or run `lefthook run pre-commit` before commiting new changes. See `lefthook.yml` for more details in regards to the currently configured git hooks.

### Project dependencies

Disable execution of npm scripts to reduce attack surface for supply chain attacks:

```sh
npm config set ignore-scripts true
```

Then, install npm dependencies:

```sh
npm install
```

#### Playwright

For E2E and a11y testing with [Playwright](https://playwright.dev/docs/intro) you will need to install the supported browsers:

```sh
npx playwright install
```

### Everything else

- Please have a look at [conventional commit messages](https://chris.beams.io/posts/git-commit/) to know how to write Git Commit Messages.

## Environment configuration

- [`.env.defaults`](../.env.defaults) — committed, non-secret defaults for local development. Loaded via Node's native `--env-file`.
- [`.env.op`](../.env.op) — committed 1Password `op://` references for needed secrets, resolved at runtime by `op run`. No secret is written to the disk.

### Local development

Start the development server with needed environment secrets from 1Password (requires `op signin`).

```sh
npm run dev:op
```

This starts your app in development mode, rebuilding assets on file changes.

How to build and run the app in production mode:

```sh
npm run build
npm start
```

#### XJustiz test files

An XJustiz file is required to submit a new claim (this is called “Klageeinreichung” in German). Test files are stored in the `/data/xjustiz/**` [folder](/data/xjustiz/). Further information regarding the XJustiz-standard can be found [here](https://xjustiz.justiz.de/).

#### OpenAPI Specification of Justiz-Backend-API

The [OpenAPI Specification](https://swagger.io/specification/) of the Justiz-Backend-API (Single Source of Truth for the external backend service) is stored within the `/data/api/` [folder](/data/api/) (file: `/data/api/openapi.json`).

```sh
# Read from OpenAPI file and output generated code for custom mocking with MSW (see: /mocks/api/*.js)
npx msw-auto-mock data/api/openapi.json -o ./msw-auto-mock
```

The data of `/mocks/api/**` was initialized with the help of `msw-auto-mock` and then individually adapted to all our user journeys. Therefore, we should bear in mind that OpenAPI Spec updates (`data/api/openapi.json`) may lead to manual customizations within the `mocks/api/**` handlers.

### Testing

The application has

- unit tests (using [Vitest](https://vitest.dev/))
  - Stateless/static Components can be excluded from code coverage (SonarQube and Vitest) by using the following file naming convention: `ComponentName.static.tsx`
- end-to-end tests (using [Playwright](https://playwright.dev/docs/intro))
- accessibility tests (using [Playwright](https://playwright.dev/docs/intro) and [Axe](https://www.deque.com/axe/))

**Test commands**

- Run unit tests: `npm test`
- Run unit tests in [watch mode](https://vitest.dev/guide/features.html#watch-mode): `npm run test:watch`
- Run E2E tests: `npm run test:e2e`
- Generate test coverage: `npm run test:generate-coverage` (used by SonarQube)

### Code quality checks (linting & formatting)

The project uses [ESLint](https://eslint.org/docs/latest/) for linting and [Prettier](https://prettier.io/docs/en/). for formatting.

**Commands**

- Check formatting: `npm run format:check`
- Autofix formatting issues: `npm run format:fix`
- Check lint: `npm run lint:check`
- Autofix lint issues: `npm run lint:fix`
- Check style (formatting & linting): `npm run style:check`
- Autofix style issues (formatting & linting): `npm run style:fix`

## Deployment

We deploy to 1 environment at the moment: **Staging**.

The app is running here:

- [Staging](https://kompla.dev.tech.digitalservice.dev/) (basic auth protected at the moment)

### Docker

The project includes a Dockerfile to create a Docker Image for the project. We use [Colima](https://colima.run/) as a container runtime to build and run docker images.

You can build the Docker Image using

```sh
colima start
docker build -t a2j-kommunikationsplattform .
```

and then start it using

```sh
docker run -d -p 3000:3000 --name a2j-kommunikationsplattform a2j-kommunikationsplattform
```

The website is then available under http://localhost:3000

If you want to include any additional files during the build that are not in the `app` directories you need to add them to the `.dockerignore` file.

The `.github/workflows/pipeline.yml` GitHub Action includes a `build-and-push-image` job to build the Docker Image and push it to GitHub Packages.

## Architecture Decision Records

The [`doc/adr`](../doc/adr/) directory contains [architecture decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) that have been made so far.
For adding new records the [adr-tools](https://github.com/npryce/adr-tools) command-line tool is useful but not strictly necessary:

```sh
brew install adr-tools
```
