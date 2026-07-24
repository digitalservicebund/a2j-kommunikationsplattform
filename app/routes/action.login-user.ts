import { redirect, type ActionFunctionArgs } from "react-router";
import { config } from "~/config/config";
import { AuthenticationProvider } from "~/services/auth/auth.types";
import { auth } from "~/services/auth/betterAuth.server";
import { loginAsDeveloper } from "~/services/auth/loginAsDeveloper.server";

export enum LoginError {
  BeA = "bea-login-error",
  Demo = "demo-login-error",
  KomplaIdp = "kompla-idp-login-error",
}

export enum LoginType {
  BeA = "bea-login",
  Developer = "developer-login",
  Demo = "demo-login",
  KomplaIdp = "kompla-idp-login",
}

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
  // The oauth `state`/PKCE code_verifier Better Auth generates here is
  // persisted via a Set-Cookie header (there's no database) — it must be
  // forwarded to the browser or the callback's state check will fail.
  const { response, headers } = await auth.api.signInWithOAuth2({
    body: {
      providerId,
      callbackURL: "/",
      errorCallbackURL: `/login?status=${errorStatusByProvider[providerId]}`,
    },
    headers: request.headers,
    returnHeaders: true,
  });

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
    // The login page only renders this button in development, but that's a
    // UI convenience, not a security boundary — enforce it server-side too.
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
