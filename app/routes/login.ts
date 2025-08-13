import type { LoaderFunction } from "react-router";
import { config } from "~/config/config";
import { loginAsDeveloper } from "~/services/prototype.mockAuth.server";
import {
  AuthenticationProvider,
  authenticator,
} from "~/services/prototype.oAuth.server";

/**
 * Initiates OAuth2 login on beA-Portal (BRAK IdP)
 */
export const loader: LoaderFunction = async ({ request }) => {
  return config().ENVIRONMENT === "development"
    ? await loginAsDeveloper(request)
    : await authenticator.authenticate(AuthenticationProvider.BEA, request);
};
