# Demo login (Testzugang)

## How does the demo login work?

The demo login ("Testzugang") allows access to KomPla with a pre-configured demo user without requiring beA credentials. The entire authentication flow is server-side: the browser never handles auth codes or credentials directly.

One identity provider is involved: the **KomPla IdP** (Keycloak realm `kompla-dev`), accessed via the `magic-link` client — a Keycloak client within the same realm that is specifically configured with the magic link extension for demo access. It:

- Issues a short-lived **service token** via the `client_credentials` grant to the KomPla server.
- Generates a **magic link** — a single-use Keycloak login URL that authenticates the demo user without a password prompt.
- Exchanges the resulting auth code for an **access token** and **refresh token** for the demo user.

Because the resulting access token is already scoped for the KomPla API, it can be used for API calls directly — no token exchange step is needed (unlike the regular beA login flow).

### Phase 1 — Obtain magic link and redirect browser to KomPla IdP

```mermaid
sequenceDiagram
    actor User
    User->>+KomPla Web-UI: Clicks "Testzugang" button
    Note over User,KomPla Web-UI: Browser navigates to /auth/start-demo-login
    KomPla Web-UI-->>+KomPla IdP: Request service token (client_credentials grant)<br/>POST {KOMPLA_IDP}/protocol/openid-connect/token
    KomPla IdP-->>KomPla Web-UI: Returns short-lived service access token
    KomPla Web-UI-->>+KomPla IdP: Request magic link for demo user<br/>POST {KOMPLA_IDP}/magic-link<br/>Authorization: Bearer {service_token}
    KomPla IdP-->>KomPla Web-UI: Returns magic link URL
    KomPla Web-UI-->>User: Redirects browser to magic link URL<br/>302 → {magic_link_url}
    User->>+KomPla IdP: Browser follows redirect to magic link URL
    KomPla IdP-->>KomPla IdP: Authenticates demo user via magic link (no password required)
    KomPla IdP-->>User: Redirects browser back to KomPla callback<br/>302 → {DEMO_REDIRECT_URI}?code={auth_code}
```

### Phase 2 — Exchange auth code for tokens and establish session

```mermaid
sequenceDiagram
    actor User
    User->>+KomPla Web-UI: Browser hits callback route<br/>GET /auth/magic-link-callback?code={auth_code}
    KomPla Web-UI-->>+KomPla IdP: Exchange auth code for tokens (authorization_code grant)<br/>POST {KOMPLA_IDP}/protocol/openid-connect/token
    KomPla IdP-->>KomPla Web-UI: Returns access token + refresh token
    KomPla Web-UI->>KomPla Web-UI: Stores tokens in encrypted session cookie
    KomPla Web-UI-->>User: Redirects to dashboard<br/>302 → / with Set-Cookie: __session=...
    Note over User,KomPla Web-UI: User has an active demo session<br/>(access token is refreshed server-side when it expires)
```

### Token refresh

When the access token expires, the server refreshes it transparently without any browser redirect:

```mermaid
sequenceDiagram
    actor User
    User->>+KomPla Web-UI: Navigates to a protected page
    KomPla Web-UI->>KomPla Web-UI: Reads session cookie — access token expired
    KomPla Web-UI-->>+KomPla IdP: Refresh access token (refresh_token grant)<br/>POST {KOMPLA_IDP}/protocol/openid-connect/token
    KomPla IdP-->>KomPla Web-UI: Returns new access token + refresh token
    KomPla Web-UI->>KomPla Web-UI: Updates session cookie with new tokens
    KomPla Web-UI-->>User: Serves protected page with updated Set-Cookie header
    Note over User,KomPla Web-UI: Session extended transparently —<br/>refresh fails if the KomPla IdP SSO session has idled out
```
