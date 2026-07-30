# 6. Better Auth spike, and why we reverted it

- 2026-07-30: Drafted

## Status

Drafted

## Context

[ADR 0004](0004-how-we-do-user-and-api-authentication.md) describes this app's original authentication design: a single signed, `httpOnly` session cookie holding the BRAK access and refresh tokens, with everything else (including the KomPla bearer, via `authorizeToken.server.ts`'s OAuth 2.0 Token Exchange) re-derived fresh on every request. No server-side session store, by design — the app is a thin OIDC client to two external identity providers (BRAK IdP, KomPla IdP), not an owner of user identity.

That design was implemented on `remix-auth` + `remix-auth-oauth2`. A concrete bug was found there: `remix-auth-oauth2`'s underlying library (Arctic) could make a token-revocation call that hangs indefinitely, with no timeout or way to abort it. To fix this, we spiked a migration of the entire auth layer to [Better Auth](https://www.better-auth.com/), a full-featured authentication framework.

## Decision

The spike is concluded, and Better Auth is not a suitable fit for this application. We are reverting to the architecture ADR 0004 already describes.

What the spike found:

- Better Auth's core model (`user`, `account`, `session` as durable persisted records) is optimized for applications that own user identity and operate with a backing database. This application has neither that requirement nor that infrastructure: it does not manage users, credentials, or account lifecycles; it only needs to retain externally issued IdP tokens for the duration of a browser session.
- When no `database` is configured, Better Auth defaults `account.storeAccountCookie` to `true`, which mirrors the full OAuth account payload (access token, refresh token, ID token, i.e., full JWTs) into cookies on login and refresh. In practice, this drove combined request/response cookie size to ~14KB in worst-case flows, creating risk of `400 Request Header Or Cookie Too Large` on requests and `nginx` `proxy_buffer_size` pressure on responses.
- Disabling that behavior (`account.storeAccountCookie: false`) resolves cookie size concerns but reintroduces the failure that ADR 0004 explicitly avoids: account/session state remains in an ephemeral in-memory adapter and is lost on pod restart or redeploy, forcing all active users to authenticate again.
- Better Auth's `session.cookieCache` can make _session_ state restart-resilient (self-renewing encrypted cookie), but there is no equivalent mechanism for _OAuth account/token_ state without either re-enabling large account cookies (`storeAccountCookie: true`) or introducing additional infrastructure. `secondaryStorage` (for example Redis) applies to sessions and verification tokens in Better Auth internals, not OAuth account records, so it does not close this gap.
- Better Auth's primary feature differentiators (account linking across providers, password/email credential flows, cross-device session administration) are not required for this product.

## Consequences

- The application continues to use `remix-auth`/`remix-auth-oauth2` per ADR 0004, as it is the lighter-weight option for this product's requirements. It also provides the required OAuth authorization-code flow protections (for example PKCE S256, OAuth state validation, and a short-lived flow cookie) while avoiding the large-cookie and ephemeral-state issues encountered with Better Auth.
- The original motivating issue — Arctic's revocation call lacking timeout/abort controls — remains open and requires a separate, narrowly scoped fix (for example wrapping that specific call with an `AbortController` and timeout), tracked independently from this ADR decision.
