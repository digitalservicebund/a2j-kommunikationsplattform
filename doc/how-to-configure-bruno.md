# How to configure Bruno

If the Auth configuration is not being applied automatically within Bruno, follow these steps:

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
   6. Define the _Scope_ with `kompla.verfahren.read kompla.verfahren.write kompla.gericht.read`
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
