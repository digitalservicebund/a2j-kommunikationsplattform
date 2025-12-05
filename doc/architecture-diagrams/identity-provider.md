# Identity provider

## What is the login process for lawyers? How is access granted to the proceedings involved?

The following sequence diagram shows the interaction between the web UI and the identity providers (IdP). Two identity providers are used:

- **BRAK IdP**
  - Access system for all lawyers licensed in Germany and their employees for exchanging messages with the judiciary and other parties involved in electronic legal transactions.
- **KomPla IdP**
  - Every request to the protected **KomPla API** requires an Authorization header ([Bearer authentication](https://swagger.io/docs/specification/v3_0/authentication/bearer-authentication/)) containing an access token provided by the **KomPla IdP** through token exchange ([RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html)). This means that the KomPla Web UI (application) exchanges an access token it has received from the BRAK IdP for the currently logged-in user (e.g., a lawyer) for a new token that is used to call the backend service (KomPla API).

```mermaid
sequenceDiagram
    actor User
    User->>+KomPla Web-UI: Lawyer wants to log in
    Note over User,KomPla Web-UI: User has no active user session<br/>(no BRAK IdP and KomPla IdP access tokens)
    KomPla Web-UI-->>+BRAK IdP: Sends authentication request to BRAK identity provider<br/>GET {BRAK_IdP_ENVIRONMENT}/protocol/openid-connect/auth
    BRAK IdP-->>User: Redirects to BRAK-IdP login page and<br/>asks the user to authenticate
    Note over BRAK IdP,User: Requires: Client Security and beA credentials
    User->>BRAK IdP: User submits login details
    BRAK IdP-->>BRAK IdP: Verifies the authentication data
    BRAK IdP->>KomPla Web-UI: Redirects User back to KomPla Web-UI<br/>{redirect_URI}/?code={code}
    KomPla Web-UI-->>BRAK IdP: Verify token<br/>POST {BRAK_IdP_ENVIRONMENT}/protocol/openid-connect/token
    BRAK IdP-->>KomPla Web-UI: Returns access token
    KomPla Web-UI->>+KomPla Web-UI: Shows dashboard page to User
    Note over User,KomPla Web-UI: User has an active session now<br/>(access token from BRAK IdP)
    User->>+KomPla Web-UI: Lawyer navigates to overview of<br/>court proceedings page. Navigate to /verfahren
    KomPla Web-UI-->>+KomPla IdP: Uses access token for token exchange with KomPla IdP to get a bearer token<br/>POST {KomPla_IdP_ENVIRONMENT}/protocol/openid-connect/token (RFC 8693)
    KomPla IdP-->>+KomPla Web-UI: Returns bearer token
    KomPla Web-UI-->>+KomPla API: Uses bearer token for API requests<br/>GET /api/v1/verfahren with "Authorization: Bearer <token>
    KomPla API-->>+KomPla Web-UI: Returns Verfahren [{...}]
    KomPla Web-UI->>+KomPla Web-UI: Updates /verfahren page with<br/>loaded Verfahren data
    Note over User,KomPla Web-UI: User can now view involved procedures<br/>(access token is refreshed when it expires)
```
