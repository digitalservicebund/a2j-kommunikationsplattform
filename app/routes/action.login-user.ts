import { redirect, type ActionFunctionArgs } from "react-router";
import {
  AuthenticationProvider,
  LoginError,
  LoginType,
} from "~/services/auth/auth.types";
import { auth } from "~/services/auth/betterAuth.server";

const errorStatusByProvider: Record<
  AuthenticationProvider.BEA | AuthenticationProvider.KOMPLA_IDP,
  LoginError
> = {
  [AuthenticationProvider.BEA]: LoginError.BeA,
  [AuthenticationProvider.KOMPLA_IDP]: LoginError.KomplaIdp,
};

async function startOAuth2Login(
  request: Request,
  providerId: AuthenticationProvider.BEA | AuthenticationProvider.KOMPLA_IDP,
) {
  // The oauth state/PKCE verifier is persisted via Set-Cookie (no database)
  // and must reach the browser or the callback's state check will fail.
  const { response, headers } = await auth.api.signInSocial({
    body: {
      provider: providerId,
      callbackURL: "/",
      errorCallbackURL: `/login?status=${errorStatusByProvider[providerId]}`,
    },
    headers: request.headers,
    returnHeaders: true,
  });

  if (!response.url) {
    throw new Error(
      `signInSocial did not return a redirect url for ${providerId}`,
    );
  }

  return redirect(response.url, { headers });
}

/**
 * Initiates the OAuth2 login flow on the KomPla IdP or one of the supported
 * third-party identity providers (such as BRAK IdP / beA).
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  const loginType = formData.get("loginType") as LoginType;

  switch (loginType) {
    case LoginType.BeA:
      return await startOAuth2Login(request, AuthenticationProvider.BEA);
    case LoginType.KomplaIdp:
      return await startOAuth2Login(request, AuthenticationProvider.KOMPLA_IDP);
    default:
      return new Response("Invalid login type", { status: 400 });
  }
};
