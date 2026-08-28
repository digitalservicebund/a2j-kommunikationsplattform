import type { ActionFunctionArgs } from "react-router";
import { AuthenticationProvider, LoginType } from "~/services/auth/auth.types";
import { loginAsDeveloper } from "~/services/auth/loginAsDeveloper.server";
import { authenticator } from "~/services/auth/oAuth.server";

/**
 * /action/login-user
 *
 * Initiates OAuth2 login on beA-Portal (BRAK IdP)
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  // using clone() to be able to read the body multiple times
  const formData = await request.clone().formData();
  const loginType = formData.get("loginType") as LoginType;

  console.log("loginType is", loginType);

  if (loginType === LoginType.Developer) {
    return await loginAsDeveloper(request);
  }

  if (loginType === LoginType.BeA) {
    return await authenticator.authenticate(
      AuthenticationProvider.BEA,
      request,
    );
  }

  if (loginType === LoginType.KomplaIdp) {
    try {
      return await authenticator.authenticate(
        AuthenticationProvider.KOMPLA_IDP,
        request,
      );
    } catch (error) {
      if (error instanceof Response) {
        console.log(
          "action/login-user: redirecting to Keycloak authorization URL:",
          error.headers.get("Location"),
        );
      }
      throw error;
    }
  }

  return new Response("Invalid login type", { status: 400 });
};
