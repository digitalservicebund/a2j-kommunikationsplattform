# A2J - Kommunikationsplattform

## Prerequisites

### Node.js and Homebrew

We aim to use the current active [LTS version of Node.js](https://nodejs.dev/en/about/releases/), which is V20 at the time of writing. There is a `.tool-versions` file to simplify setup using [nodenv](https://github.com/nodenv/nodenv) (install Node version by running `nodenv install`) or [asdf](https://github.com/asdf-vm/asdf-nodejs) (check and install used Node version by running `asdf current`).

Additionally we use [Git Hooks](#git-hooks) that can be installed with [Homebrew](https://brew.sh/), please check if brew is available on your machine with `brew -v` command.

### Dependencies

Install the project dependencies using npm.

```bash
npm install
```

#### Playwright

For E2E and a11y testing with [Playwright](https://playwright.dev/docs/intro) you will need to install the supported browsers:

```bash
npx playwright install
```

#### Git Hooks

For the provided Git hooks you will need to install [lefthook](https://github.com/evilmartians/lefthook)
(git hook manager) and [talisman](https://github.com/thoughtworks/talisman/) (secrets scanner) `brew install lefthook talisman`. Afterwards execute `lefthook install` to initialize the hooks or run `lefthook run pre-commit` before commiting new changes. See `lefthook.yml` for more details in regards to the currently configured git hooks.

### Everything else

- Please have a look at [conventional commit messages](https://chris.beams.io/posts/git-commit/) to know how to write Git Commit Messages.

## Development

### Configure .env variables

Copy the `.env.example` file and save it as `.env` within this projects root folder and define the needed environment variables. For example:

```sh
ENVIRONMENT=development
```

### Local development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

#### XJustiz test files

An XJustiz file is required to submit a new claim (this is called “Klageeinreichung” in German). Test files are stored in the `/data/xjustiz/**` [folder](/data/xjustiz/). Further information regarding the XJustiz-standard can be found [here](https://xjustiz.justiz.de/).

#### OpenAPI Specification of Justiz-Backend-API

The [OpenAPI Specification](https://swagger.io/specification/) of the Justiz-Backend-API (Single Source of Truth for the external backend service) is stored within the `/data/api/` [folder](/data/api/) (file: `/data/api/swagger.json`).

```sh
# Read from OpenAPI file and output generated code for mocking with MSW (see: /mocks/handlers.js)
npx msw-auto-mock data/api/swagger.json -o ./msw-auto-mock
```

### Testing

The application has

- unit tests (using [Vitest](https://vitest.dev/))
- end-to-end tests (using [Playwright](https://playwright.dev/docs/intro))
- accessibility tests (using [Playwright](https://playwright.dev/docs/intro) and [Axe](https://www.deque.com/axe/))

**Test commands**

- Run unit tests: `npm test`
- Run unit tests in [watch mode](https://vitest.dev/guide/features.html#watch-mode): `npm run test:watch`
- Run E2E tests: `npm run test:e2e`
- Run A11y tests: `npm run test:a11y`
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

Build and run the app in production mode:

```sh
npm run build
npm start
```

### Docker

The project includes a Dockerfile to create a Docker Image for the project.

You can build the Docker Image using

```sh
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

The `docs/adr` directory contains [architecture decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
For adding new records the [adr-tools](https://github.com/npryce/adr-tools) command-line tool is useful but not strictly necessary:

```bash
brew install adr-tools
```

## Contributing

🇬🇧
Everyone is welcome to contribute the development of the _a2j-kommunikationsplattform_. You can contribute by opening pull request,
providing documentation or answering questions or giving feedback. Please always follow the guidelines and our
[Code of Conduct](CODE_OF_CONDUCT.md).

🇩🇪
Jede:r ist herzlich eingeladen, die Entwicklung der _a2j-kommunikationsplattform_ mitzugestalten. Du kannst einen Beitrag leisten,
indem du Pull-Requests eröffnest, die Dokumentation erweiterst, Fragen beantwortest oder Feedback gibst.
Bitte befolge immer die Richtlinien und unseren [Verhaltenskodex](CODE_OF_CONDUCT_DE.md).

## Contributing code

🇬🇧
Open a pull request with your changes and it will be reviewed by someone from the team. When you submit a pull request,
you declare that you have the right to license your contribution to the DigitalService and the community.
By submitting the patch, you agree that your contributions are licensed under the MIT license.

Please make sure that your changes have been tested befor submitting a pull request.

🇩🇪
Nach dem Erstellen eines Pull Requests wird dieser von einer Person aus dem Team überprüft. Wenn du einen Pull-Request
einreichst, erklärst du dich damit einverstanden, deinen Beitrag an den DigitalService und die Community zu
lizenzieren. Durch das Einreichen des Patches erklärst du dich damit einverstanden, dass deine Beiträge unter der
MIT-Lizenz lizenziert sind.

Bitte stelle sicher, dass deine Änderungen getestet wurden, bevor du einen Pull-Request sendest.
