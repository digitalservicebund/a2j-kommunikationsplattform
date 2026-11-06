# Development Guide

This document explains how to get started with coding on the _Kommunikationsplattform_ (KomPla) frontend. It also provides guidance on several aspects of the development workflow, with links to further reading where appropriate.

## Getting Started

### Prerequisites

- [**Mise**][mise]: Used for managing the runtimes and tools of our local development environments. See the [official installation instructions][mise-install].

- [**1Password desktop app**][1password-desktop] (optional): The development setup uses the [1Password CLI][1password-cli] (installed through Mise) to access the secrets needed to run the app locally. Installing and signing into the desktop app makes authorizing the CLI more convenient. See the [CLI's getting-started instructions][1password-cli-get-started].

- [**Podman Desktop**][podman], [**Colima**][colima], or similar (optional): Needed if you want to test building and running the container image used for deployment. [Docker Desktop][docker-desktop] works as well, but you [may need a paid subscription][docker-desktop-pricing] if you want to use it.

> [!important]
> For the time being, **running the app requires access to the development team's 1Password vault**, which contains several secrets that can neither be shared with nor easily obtained by the general public. We might implement a mock backend at some point to work around this issue.

[1password-cli]: https://www.1password.dev/cli
[1password-cli-get-started]: https://www.1password.dev/cli/get-started#step-2-turn-on-the-1password-desktop-app-integration
[1password-desktop]: https://1password.com/downloads
[colima]: https://colima.run/
[docker-desktop]: https://www.docker.com/products/docker-desktop/
[docker-desktop-pricing]: https://docs.docker.com/subscription-billing/desktop-license/
[mise]: https://mise.jdx.dev/
[mise-install]: https://mise.jdx.dev/installing-mise.html
[podman]: https://podman-desktop.io/

### Development Setup

Install all required development tools ([Node.js][node], 1Password CLI, etc.) using Mise:

```sh
mise install
```

> [!important]
> We strongly recommend that you [activate Mise in your shell][mise-activate] so that you can run the tools it manages directly. Alternatively, you can prefix commands with `mise exec` to execute them with Mise-installed tools in `$PATH`, e.g., `mise exec -- node --version`. The rest of this document assumes that you have a working Mise shell setup.

Next, install the Git hooks (see [below](#git-hooks)):

```sh
lefthook install
```

Finally, install the project's dependencies:

```sh
npm install
```

That's it! Assuming you have set up the 1Password CLI, you should now be able to run the app:

```sh
npm run dev:op
```

Visit <http://localhost:3000/> to see it. Sign-in credentials can be found in the development team's 1Password vault.

[mise-activate]: https://mise.jdx.dev/shell-setup.html
[node]: https://nodejs.org/

## Development Workflow

### Type Checking

You can type-check the entire codebase by running:

```sh
npm run typecheck
```

### Linting & Formatting

We use [Oxlint][oxlint] and [Oxfmt][oxfmt] as our code linter and formatter, respectively.

> [!note]
> We recommend [integrating Oxlint into your editor][oxlint-editor-setup] and [configuring Oxfmt format-on-save][oxfmt-editor-setup] for the best development experience.

**Linter commands:**

- Run linter checks: `npm run lint:check`
- Autofix linter issues: `npm run lint:fix`

**Formatter commands:**

- Check formatting: `npm run format:check`
- Autofix formatting issues: `npm run format:fix`

**Commands for running both at once:**

- Run linter and formatter checks: `npm run style:check`
- Autofix linting and formatting issues: `npm run style:fix`

[oxlint]: https://oxc.rs/docs/guide/usage/linter.html
[oxlint-editor-setup]: https://oxc.rs/docs/guide/usage/linter/editors.html
[oxfmt]: https://oxc.rs/docs/guide/usage/formatter.html
[oxfmt-editor-setup]: https://oxc.rs/docs/guide/usage/formatter/editors.html

### Unit Testing

The codebase includes a unit test suite built on [Vitest][vitest]. You can run it with:

```sh
npm test
```

To run Vitest in [watch mode][vitest-watch], use:

```sh
npm run test:watch
```

[vitest]: https://vitest.dev/
[vitest-watch]: https://vitest.dev/guide/features#watch-mode

### End-to-End Testing

We have a set of [Playwright][playwright] end-to-end (E2E) tests for the major user flows of the KomPla frontend, running against the real (staging) backend. These tests also perform automated accessibility checks on the app's pages, powered by [Axe][axe].

Before you can run the E2E tests, run the following to download the required browser(s):

```sh
npx playwright install
```

Now you can run the tests with:

```sh
npm run test:e2e
```

> [!important]
> Just like the app itself, the end-to-end tests need access to the development team's 1Password vault to run. See the [prerequisites](#prerequisites).

[axe]: https://www.deque.com/axe/
[playwright]: https://playwright.dev/docs/intro

### Git Hooks

We have a Git pre-commit hook managed by [Lefthook][lefthook] which runs type, linting and formatting checks, as well as the unit tests. You can run the checks manually with:

```sh
lefthook run pre-commit
```

There is also a `commit-msg` hook that uses [`commitlint`][commitlint] to check commit messages against the rules defined in [`commitlint.config.cjs`](../commitlint.config.cjs).

See [`lefthook.yml`](../lefthook.yml) for the currently configured Git hooks.

[commitlint]: https://commitlint.js.org/
[lefthook]: https://lefthook.dev/

### Testing the Container Build

The KomPla frontend is deployed as an [OCI][oci] container image. Assuming you have a Docker-compatible container runtime installed and running (see the [prerequisites](#prerequisites)), you can build and run the image as follows:

```sh
npm run compose:up
```

This command uses [Docker Compose][docker-compose] (installed by Mise) to run the container and expose it at <http://localhost:3000/>. The required secrets are injected using the 1Password CLI, just like with `npm run dev:op`.

> [!note]
> As `npm run compose:up` uses the same port as `npm run dev:op`, only one of them can run at the same time.

See [`compose.yaml`](../compose.yaml) for the Docker Compose configuration.

[docker-compose]: https://docs.docker.com/compose/
[oci]: https://opencontainers.org/

## Further Reading

- [Architecture Overview](./architecture.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
