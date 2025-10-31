import { serverConfig } from "~/config/config.server";

interface TokenExchangeResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": string;
  session_state: string;
  scope: string;
  issued_token_type: string;
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
 * @param idpAccessToken Access token received after successful user login
 */
export async function exchangeToken({
  idpAccessToken,
}: {
  idpAccessToken: string;
}): Promise<string> {
  const params = new URLSearchParams();
  params.append(
    "grant_type",
    "urn:ietf:params:oauth:grant-type:token-exchange",
  );
  params.append(
    "requested_token_type",
    "urn:ietf:params:oauth:token-type:refresh_token",
  );
  params.append("clientId", clientId);
  params.append("subject_issuer", subjectIssuer);
  params.append("scope", scope);
  params.append("subject_token", idpAccessToken);

  const response = await fetch(tokenExchangeEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(
      `Token exchange failed: ${response.status} ${await response.text()}`,
    );
  }

  const result = (await response.json()) as TokenExchangeResponse;
  console.log("Received access_token from KomPla IdP");

  // access_token will be used as bearer token for external API authentication
  return result.access_token;
}
