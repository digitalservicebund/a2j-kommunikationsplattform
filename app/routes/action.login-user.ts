import type { ActionFunctionArgs } from "react-router";
import { loginAsDeveloper } from "~/mocks/auth/mockAuth.server";
import {
  AuthenticationProvider,
  authenticator,
} from "~/services/prototype.oAuth.server";

export enum LoginError {
  BeA = "bea-login-error",
}

export enum LoginType {
  BeA = "bea-login",
  Developer = "developer-login",
}

/**
 * /action/login-user
 *
 * Initiates OAuth2 login on beA-Portal (BRAK IdP)
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  // using clone() to be able to read the body multiple times
  const formData = await request.clone().formData();
  const loginType = formData.get("loginType") as LoginType;

  if (loginType === LoginType.Developer) {
    return await loginAsDeveloper(request);
  } else if (loginType === LoginType.BeA) {
    return await authenticator.authenticate(
      AuthenticationProvider.BEA,
      request,
    );
  } else {
    return new Response("Bad Request", { status: 400 });
  }
};
