# 4. How we do user and API authentication

- 2026-01-27: Drafted
- 2026-01-27: Accepted

## Status

Accepted

## Context

KomPla uses two identity providers (IdPs) to authenticate users and authorise API access:

- **BRAK IdP** — authenticates lawyers via OpenID Connect. On successful login, the Web UI receives an access token and a refresh token, both stored in an `httpOnly` session cookie.
- **KomPla IdP** — issues bearer tokens for the KomPla API. The Web UI exchanges the BRAK access token for a KomPla bearer token via OAuth 2.0 Token Exchange ([RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html)).

See [Identity Provider architecture diagram](../architecture-diagrams/identity-provider.md) for the full sequence.

### The question

The KomPla IdP token exchange (`authorizeToken()`) is currently called on every server-side request that needs API access. On a page like `/verfahren`, this means two separate token exchanges — one for `fetchVerfahren` and one for `fetchGerichte`, even though the returned token has an `expires_in` field and could be reused.

We considered caching the KomPla bearer token to avoid these repeated exchanges.

## Decision

We decided to continue authorising/exchanging the BRAK IdP access token on each request to get a fresh KomPla bearer.

When working on the implementation of token caching (storing the KomPla bearer in the session cookie with its expiry, then passing it to loaders via middleware context), we realised that this approach introduces more concerns than it solves. Here are the reasons that led to this decision.

### Cookie size

A session cookie has size limits (commonly ~4KB per cookie across browsers). Storing another JWT-like bearer token (plus metadata like expiry) increases the chance of hitting these limits.

### Security concerns

Even with `httpOnly` and `sameSite=lax`, a bearer token in a cookie is still:

- sent automatically on every request to our app's domain
- present anywhere the session cookie is present, increasing the area of exposure if the session cookie is ever compromised

### Server-side caching alternatives

There are other solutions that would avoid putting the bearer in the cookie by storing it on the server side, but they all have more cons than pros compared to our current setup:

- **Redis** — extra cost and infrastructure setup, but something we could possibly implement in the future when KomPla grows larger.
- **Database** — similar infra setup, also adds write/read latency — something that isn't ideal for authorisation handling.
- **In-memory (Node.js RAM)** — will break with restarts/deploys and multi-instance scaling, leading to random cache misses and inconsistent behaviour.

### Conclusion

Continuing to authorise/exchange the BRAK IdP access token on each request to get a fresh KomPla bearer is the simplest and most reliable approach at the moment. It also makes KomPla a bit more secure by avoiding persisting another sensitive token in the session cookie.

## Consequences

- Every service that calls the KomPla API receives a `Request` object and uses `getBearerToken()` to obtain a fresh bearer token.
- Multiple API calls within the same page load (e.g. `fetchVerfahren` + `fetchGerichte`) each trigger their own token exchange.
- No additional infrastructure or session storage is needed.
- If the token exchange latency becomes a bottleneck as KomPla grows, Redis is the most likely next step. This ADR should be revisited at that point.
