import type { ActionFunctionArgs } from "react-router";
import { config } from "~/config/config";
import { loginAsDeveloper } from "~/services/mockAuth.server";
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
 * Initiates OAuth2 login on beA-Portal (BRAK IdP)
 */

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const loginType = formData.get("loginType") as LoginType;

  if (
    loginType === LoginType.Developer &&
    config().ENVIRONMENT === "development"
  ) {
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
