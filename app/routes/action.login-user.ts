import { redirect } from "react-router";
import { z } from "zod";
import {
  AuthProvider,
  LoginError,
  LoginType,
} from "~/services/auth/auth.types";
import { auth } from "~/services/auth/betterAuth.server";
import { parseActionFormData } from "~/utils/actionInput";
import { isSameOriginURL } from "~/utils/urls";
import { Route } from "./+types/action.login-user";

const errorStatusByProvider: Record<
  AuthProvider.BEA | AuthProvider.KOMPLA_IDP,
  LoginError
> = {
  [AuthProvider.BEA]: LoginError.BeA,
  [AuthProvider.KOMPLA_IDP]: LoginError.KomplaIdp,
};

async function startOAuth2Login(
  request: Request,
  providerId: AuthProvider.BEA | AuthProvider.KOMPLA_IDP,
  nextURL: string,
) {
  const { response, headers } = await auth.api.signInSocial({
    body: {
      provider: providerId,
      callbackURL: nextURL,
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

const ActionInputSchema = z.object({
  loginType: z.enum(LoginType),
  next: z.string().optional(),
});

/**
 * Initiates the OAuth2 login flow on the KomPla IdP or one of the supported
 * third-party identity providers (such as BRAK IdP / beA).
 */
export async function action({ request, url }: Route.ActionArgs) {
  const formData = await request.formData();
  const { loginType, next } = parseActionFormData(formData, ActionInputSchema);
  const nextURL = next && isSameOriginURL(next, url) ? next : "/";

  switch (loginType) {
    case LoginType.BeA:
      return await startOAuth2Login(request, AuthProvider.BEA, nextURL);
    case LoginType.KomplaIdp:
      return await startOAuth2Login(request, AuthProvider.KOMPLA_IDP, nextURL);
    default:
      throw new Error("Unexpectd login type");
  }
}
