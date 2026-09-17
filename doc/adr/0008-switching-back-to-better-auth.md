# 8. Switching (back) to Better Auth

- 2026-09-16: Drafted
- 2026-09-16: Accepted

## Status

Accepted

Supersedes the "Consequences" of [ADR 0006](0006-better-auth-spike-and-why-we-reverted-it.md), which is otherwise kept for historical context.

## Context

[ADR 0006](0006-better-auth-spike-and-why-we-reverted-it.md) reverted to `remix-auth`/`remix-auth-oauth2`, per [ADR 0004](0004-how-we-do-user-and-api-authentication.md)'s DB-less design, after finding that `remix-auth-oauth2`'s dependency [Arctic](https://arcticjs.dev/) could hang indefinitely on a token-revocation call with no timeout or abort. The plan was a narrow fix - wrapping that call in an `AbortController` timeout, rather than a full migration.

That plan is no longer viable: Arctic's author deprecated the package (and most others under the same project) in July 2026 and no longer maintains it. A patch around one call in an abandoned dependency has no long-term path.

## Decision

Switch to [Better Auth](https://www.better-auth.com/) again, replacing `remix-auth`/`remix-auth-oauth2`/Arctic entirely. This keeps the DB-less constraint from ADR 0004/0006:

- **No `database` is configured.** `app/services/auth/betterAuth.server.ts` runs Better Auth's `generic-oauth` plugin against BRAK IdP and KomPla IdP with the in-memory adapter.
- **`account.storeAccountCookie: false` is set explicitly.** Without a `database`, Better Auth defaults this to `true`, mirroring the full OAuth account record (access/refresh/ID token JWTs) into a separate `account_data` cookie on every login/refresh - the ~14KB bloat ADR 0006 found. `getAuthData`/`authMiddleware` already derive and refresh provider tokens explicitly via `internalAdapter` on every request (never `useAccountCookie`) and forward any resulting `Set-Cookie` themselves, so nothing in else reads that cookie back.
- **`session.cookieCache` (`strategy: "jwe", refreshCache: true`) covers session identity.** Self-renewing, self-contained encrypted cookie that keeps session state restart-resilient without a database.

### Restart trade-off

A server restart still forces BEA/KomPla-IdP users to re-login: OAuth account/token state lives only in the in-memory adapter and is lost on restart (`getOAuth2Tokens`/`getCustomProviderTokens` fail against the wiped store, `getAuthData` returns `null`), while session identity survives via `cookieCache`. This isn't caused by `storeAccountCookie` - this app never read that cookie back either way, so the account/token data was only ever recoverable server-side regardless of the flag. It's a consequence of having no database, and we accept it: no database will be added for this reason (same reasoning as ADR 0004), and a clean forced re-login is preferable to a request continuing with stale credentials.

## Consequences

- `remix-auth`, `remix-auth-oauth2`, and Arctic are fully removed. Better Auth's own OAuth2 implementation (`@better-auth/core/oauth2`) replaces Arctic's revocation call.
- The DB-less architecture from ADR 0004 is preserved: no `database`, no Redis, no other new infrastructure.
- Server restarts/redeploys force re-login for BEA/KomPla-IdP sessions; session identity itself survives via `cookieCache`. Accepted, permanent behavior.
- Better Auth's account/session/user model is larger than this app strictly needs (ADR 0006 also noted this), but is now the vehicle for OAuth2 Authorization Code + PKCE against both IdPs, plus the Demo/Developer login bypass (`customAuthPlugin.server.ts`).
- Follow-ups, not blocking this decision: the `id_token` signature isn't verified against the IdP's JWKS (would require `discoveryUrl` instead of explicit `authorizationUrl`/`tokenUrl`); `customAuthPlugin.server.ts` mints a new user+account row per login (harmless without a database, by design).
