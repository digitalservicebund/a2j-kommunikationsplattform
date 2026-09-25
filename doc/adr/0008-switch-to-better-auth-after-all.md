# 8. Switch to Better Auth (after all)

Accepted

## Status

Accepted

Supersedes [ADR 0006](0006-better-auth-spike-and-why-we-reverted-it.md)

## Context

We tried migrating to Better Auth in the past due to issues with token recovation `remix-auth` and `remix-auth-oauth2`, but decided against it (see [ADR 0006](0006-better-auth-spike-and-why-we-reverted-it.md). Howver, the situation changed since then: the author of [Arctic](https://arcticjs.dev/), on which `remix-auth-oauth2` is built, deprecated the package in July 2026 and no longer maintains it. Relying un an unmaintained library for a security-critical part of the app is not a viable long-term solution.

## Decision

Switch to [Better Auth](https://www.better-auth.com/) after all, replacing `remix-auth`, `remix-auth-oauth2` and Arctic.

In accordance with the database-less design described in [ADR 004](0004-how-we-do-user-and-api-authentication.md), **no `database` will be configured.** Instead, we will let Better Auth store the account data in a cookie (via [`storeAccountCookie`](https://better-auth.com/docs/reference/options#storeaccountcookie)) so that it is preserved across server restarts and, in the future, shared across server instances.

## Consequences

ADR 0006 noted that the size of the cookies Better Auth uses for account data storage as a potential issue. However, we have now concluded that this is preferable to losing account data due to server restarts, and accept the slight inefficiencies of this approach. We also believe that this is vastly preferable to introducing server-side storage (e.g., using Redis), which would make the architecture significantly more complex and incur noticeably higher infrastructure costs.

As stated in ADR 0006, many of Better Auth's features do not apply to our database-less setup, making it perhaps an overengineered solution for our needs. We have also noticed that implementing the exchange of BRAK IdP tokens for KomPla IdP ones (described in ADR 0004) was challenging to realize with Better Auth's abstractions. Should such issues mount, a more manual authentication implementation using a library such as [`openid-client`](https://github.com/panva/openid-client) is an alternative worth considering.
