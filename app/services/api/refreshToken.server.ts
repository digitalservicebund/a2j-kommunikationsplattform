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
  console.log(
    `debug config: \ntokenExchangeEndpoint is ${tokenExchangeEndpoint} \nclientId is ${clientId} \n subjectIssuer is ${subjectIssuer} \nscope is ${scope}`,
  );

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append(
    "requested_token_type",
    "urn:ietf:params:oauth:token-type:refresh_token",
  );
  params.append("client_id", clientId);
  params.append("subject_issuer", subjectIssuer);
  params.append("scope", scope);
  params.append("refresh_token", idpRefreshToken);

  console.log(`debug params: ${params.toString()}`);

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
