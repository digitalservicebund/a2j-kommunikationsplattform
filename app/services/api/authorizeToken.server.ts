import { serverConfig } from "~/config/config.server";

export interface AuthorizeTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
  issued_token_type: string;
}

const authorizeTokenEndpoint = `${serverConfig().KOMPLA_IDP_ISSUER}/protocol/openid-connect/token`;
const clientId = `${serverConfig().KOMPLA_IDP_CLIENT_ID}`;
const subjectIssuer = `${serverConfig().KOMPLA_IDP_SUBJECT_ISSUER}`;
const scope = "kompla-api";

/**
 * OAuth 2.0 Token Exchange (RFC 8693)
 *
 * @see: https://www.rfc-editor.org/rfc/rfc8693.html
 *
 * @param idpAccessToken Access token received after successful user login
 */
export async function authorizeToken(
  idpAccessToken: string,
): Promise<AuthorizeTokenResponse> {
  console.log("authorizeToken");
  console.log(
    `debug config: \nauthorizeTokenEndpoint is ${authorizeTokenEndpoint} \nclientId is ${clientId} \n subjectIssuer is ${subjectIssuer} \nscope is ${scope}`,
  );

  const params = new URLSearchParams();
  params.append(
    "grant_type",
    "urn:ietf:params:oauth:grant-type:token-exchange",
  );
  params.append(
    "requested_token_type",
    "urn:ietf:params:oauth:token-type:refresh_token",
  );
  params.append("client_id", clientId);
  params.append("subject_issuer", subjectIssuer);
  params.append("scope", scope);
  params.append("subject_token", idpAccessToken);

  console.log(`debug params: ${params.toString()}`);

  const response = await fetch(authorizeTokenEndpoint, {
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

  const result = (await response.json()) as AuthorizeTokenResponse;
  console.log("Received token exchange response from KomPla IdP");

  return result;
}
