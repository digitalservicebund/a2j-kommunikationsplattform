import type { LoaderFunction } from "react-router";
import {
  AuthenticationProvider,
  authenticator,
} from "~/services/prototype.oAuth.server";

/**
 * Initiates OAuth2 login on beA-Portal (BRAK IdP)
 */
export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate(AuthenticationProvider.BEA, request);
  return null;
};
