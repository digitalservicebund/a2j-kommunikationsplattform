import { redirect, type ActionFunctionArgs } from "react-router";
import { config } from "~/config/config";
import {
  AuthenticationProvider,
  LoginError,
  LoginType,
} from "~/services/auth/auth.types";
import { auth } from "~/services/auth/betterAuth.server";
import { loginAsDeveloper } from "~/services/auth/loginAsDeveloper.server";

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
 * /action/login-user
 *
 * Initiates OAuth2 login on beA-Portal (BRAK IdP) or KomPla IdP, or
 * establishes a Better Auth session directly for the Developer bypass.
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  const loginType = formData.get("loginType") as LoginType;

  console.log("loginType is", loginType);

  if (loginType === LoginType.Developer) {
    if (config().ENVIRONMENT !== "development") {
      return new Response("Developer login is only available in development", {
        status: 403,
      });
    }
    return await loginAsDeveloper();
  }

  if (loginType === LoginType.BeA) {
    return await startOAuth2Login(request, AuthenticationProvider.BEA);
  }

  if (loginType === LoginType.KomplaIdp) {
    return await startOAuth2Login(request, AuthenticationProvider.KOMPLA_IDP);
  }

  return new Response("Invalid login type", { status: 400 });
};
