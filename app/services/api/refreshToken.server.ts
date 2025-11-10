import { serverConfig } from "~/config/config.server";

interface RefreshTokenExchangeResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

const tokenExchangeEndpoint = `${serverConfig().KOMPLA_IDP_ISSUER}/protocol/openid-connect/token`;
const clientId = `${serverConfig().KOMPLA_IDP_CLIENT_ID}`;
const subjectIssuer = `${serverConfig().KOMPLA_IDP_SUBJECT_ISSUER}`;
const scope = "kompla-api";

/**
 * Test OAuth 2.0 Token Exchange (RFC 8693)
 *
 * @see: https://www.rfc-editor.org/rfc/rfc8693.html
 *
 * @param idpRefreshToken Refresh token received after token exchange
 */
export async function refreshAccessToken(
  idpRefreshToken: string,
): Promise<RefreshTokenExchangeResponse> {
  console.log("refreshAccessToken");

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append(
    "requested_token_type",
    "urn:ietf:params:oauth:token-type:refresh_token",
  );
  params.append("clientId", clientId);
  params.append("subject_issuer", subjectIssuer);
  params.append("scope", scope);
  params.append("refresh_token", idpRefreshToken);

  const response = await fetch(tokenExchangeEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(
      `Refresh token request failed: ${response.status} ${await response.text()}`,
    );
  }

  const result = (await response.json()) as RefreshTokenExchangeResponse;
  console.log("Received refresh token response from KomPla IdP");

  return result;
}

/**
 * Example usage:
 *
 * (async () => {
 *   try {
 *     const refreshed = await refreshAccessToken({
 *       tokenEndpoint: "https://api-idp.example.com/oauth/token",
 *       clientId: "YOUR_CLIENT_ID",
 *       clientSecret: "YOUR_CLIENT_SECRET",
 *       refreshToken: "STORED_REFRESH_TOKEN",
 *       // scope: "read write", // optional
 *       clientAuth: "basic", // or "client_secret_post"
 *     });
 *
 *     console.log("Refreshed token set:", refreshed);
 *     // Persist refreshed.refresh_token securely (it may be rotated)
 *   } catch (err) {
 *     console.error("Failed to refresh token:", err);
 *   }
 * })();
 *
 * cURL example (HTTP Basic auth):
 * curl -X POST "https://api-idp.example.com/oauth/token" \
 *   -H "Content-Type: application/x-www-form-urlencoded" \
 *   -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
 *   -d "grant_type=refresh_token&refresh_token=STORED_REFRESH_TOKEN"
 *
 * Expected successful response (JSON):
 * {
 *   "access_token": "new_access_token",
 *   "token_type": "Bearer",
 *   "expires_in": 3600,
 *   "refresh_token": "new_or_rotated_refresh_token", // optional
 *   "scope": "read write"
 * }
 *
 * Notes:
 * - Some providers rotate refresh tokens (return a new refresh_token). Persist the returned refresh_token.
 * - Some providers require client authentication and may only support one method; check provider docs.
 * - Keep refresh tokens securely on the server side (do NOT store in browser localStorage).
 */
