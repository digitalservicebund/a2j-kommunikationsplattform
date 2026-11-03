# 10. Mise for development tool management

Date: 2026-11-04

## Status

Accepted

## Context

So far we have used [NVM][nvm] to ensure that we use the same Node.js version across developer environments, but don't do the same for other development tools like npm, the [1Password CLI][op] and [Lefthook][lefthook]; they currently need to be installed separately using external package managers like [Homebrew]. This means that developers have to perform additional (and, worse, operating-system-dependent) installation steps when setting up a development environment. It also makes development setups less reproducible, with every developer potentially using different versions of these tools and thus hitting different issues.

[homebrew]: https://brew.sh
[lefthook]: https://lefthook.dev/
[nvm]: https://github.com/nvm-sh/nvm
[op]: https://www.1password.dev/cli

## Decision

Adopt [Mise][mise] for managing Node.js and the required development tools, replacing NVM. Setting up a fresh development environment will be as simple as installing Mise and running the following inside the project root:

```sh
mise install
```

We will use Mise's [lockfile][mise-lockfile] feature to pin all tools to specific versions, allowing us to have more lax version specifiers like `latest` in `mise.toml` and use `mise upgrade` to upgrade tools from time to time.

For a smooth transition from NVM, we will keep specifying the Node.js version in `.nvmrc` and use Mise's ["idiomatic version files"][mise-idiomatic] support to read the Node.js version from there. After some time, we might remove `.nvmrc` and switch to `mise.toml` completely.

In our GitHub Actions workflows, we'll use [`jdx/mise-action`][mise-action] — maintained by Mise's original author — to install Node.js and npm, ensuring that we use the same versions as during local development.

[mise-action]: https://github.com/jdx/mise-action
[mise-idiomatic]: https://mise.jdx.dev/dev-tools/versions.html#idiomatic-version-files
[mise-lockfile]: https://mise.jdx.dev/dev-tools/mise-lock.html
[mise]: https://mise.jdx.dev/

## Consequences

With this change, developer environments will become easier to set up and more reproducible. We can drop our Homebrew-specific instructions for installing prerequisites from our documentation; the only remaining operating-system-specific step is installing Mise itself, for which the Mise homepage has excellent [instructions][mise-install].

Unfortunately, Dependabot does not support Mise at the moment, so tool versions will need to be updated manually. This is not different from the current situation with NVM, though, as Dependabot also has no support for updating `.nvmrc`.

[mise-install]: https://mise.jdx.dev/installing-mise.html
