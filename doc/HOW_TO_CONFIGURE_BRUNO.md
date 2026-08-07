# How to configure Bruno

If the Auth configuration is not being applied automatically within Bruno, there is a known issue with that [matter](https://github.com/usebruno/bruno/issues/5636), follow these steps:

1. Switch to Settings of the imported Collection (three dots next to the name of the Collection `KomPla API`)
2. Select the \*Auth tab
3. Select `OAuth 2.0` instead of `No Auth`
4. `Authorization Code` _Grant Type_ should be selected by default, if not, select it
5. **Configuration** settings
   1. Define `http://localhost` as _Callback URL_
   2. Use `https://auth.kompla-justiz.sinc.de/realms/kompla-dev/protocol/openid-connect/auth` as _Authorization URL_ and
   3. `https://auth.kompla-justiz.sinc.de/realms/kompla-dev/protocol/openid-connect/token` as _Access Token URL_
   4. Set `{{OAUTH_CLIENT_ID}}` as _Client ID_
   5. Set `{{OAUTH_CLIENT_SECRET}}` as _Client Secret_
   6. Define the _Scope_ with `openid kompla.verfahren.read kompla.verfahren.write kompla.gericht.read`
      - `openid` is required so the token response includes an `id_token` carrying the `safe-id` claim. Without it, requests like Create Verfahren will fail with a 403 ("nicht berechtigt, ein Verfahren für diesen Benutzer zu erstellen"), since the backend can't verify the `safe_id` you send against your token's identity.
   7. Use _PKCE_, select it
6. Scroll down to **Settings**
   1. Select _Automatically fetch token if not found_
7. _Save_ the Auth settings at the bottom of this tab.
8. Switch to **Variables** (within three dots menu at the top right of Bruno UI)
   1. Set `{{OAUTH_CLIENT_ID}}` as defined within 1Password ("KomPla API auth credentials" item)
   2. Set `{{OAUTH_CLIENT_SECRET}}` as defined within 1Password, see "KomPla API auth credentials" item
   3. Switch back to Settings and the Auth tab
   4. Test Get Access Token button at the bottom of the Auth tab
   5. You need to enter test user account credentials. Search for "kompla test user" within 1Password.

## SAFE_ID

`Create Verfahren` sends a `safe_id` that must match the identity behind your current access token, or the API responds with a 403 ("nicht berechtigt, ein Verfahren für diesen Benutzer zu erstellen"). Since the `openid` scope is included, the token response contains an `id_token` with a `safe-id` claim — set the `SAFE_ID` collection variable to that value:

1. In the Auth tab, after fetching a token (or via "Test Get Access Token"), open the token details panel — Bruno shows the decoded `id_token` payload there directly.
2. Copy the value of the `safe-id` claim from that decoded payload.
3. Set it as the `SAFE_ID` variable (Variables, within the three-dots menu at the top right of the Bruno UI).

You'll need to repeat this whenever you re-authenticate as a different test user, since `SAFE_ID` isn't derived automatically.
