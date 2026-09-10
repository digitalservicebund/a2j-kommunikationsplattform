# 6. Better Auth spike, and why we reverted it

- 2026-09-10: Drafted
- 2026-09-10: Accepted

## Status

Accepted

## Context

We currently use [Talisman](https://thoughtworks.github.io/talisman/) to prevent secrets from being pushed to the repository. However, Talisman has a very high false-positive rate, leading to frequent pipeline breakage and general frustration within the development team.

Meanwhile, GitHub has introduced native [secret scanning] and [push protection] features, which are enabled for all public repositories in the `digitalservicebund` organization. These are much less trigger-happy than Talisman and allow bypasses to be managed centrally, with audit logs.

[push protection]: https://docs.github.com/en/code-security/concepts/secret-security/push-protection
[secret scanning]: https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning

## Decision

Drop Talisman and rely on GitHub secret scanning and push protection, both of which are already enabled for this repository.

## Consequences

Due to Talisman's low reporting threshold, it might be able to detect leaked secrets that are not found by GitHub secret scanning. Given the widespread use and maturity of GitHub secret scanning, we find this risk to be negligible, though.
