import { redirect, type ActionFunctionArgs } from "react-router";
import {
  AuthProvider,
  LoginError,
  LoginType,
} from "~/services/auth/auth.types";
import { auth } from "~/services/auth/betterAuth.server";
import { isSameOriginURL } from "~/utils/urls";

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

/**
 * Initiates the OAuth2 login flow on the KomPla IdP or one of the supported
 * third-party identity providers (such as BRAK IdP / beA).
 */
export const action = async ({ request, url }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();

  const loginType = formData.get("loginType") as LoginType;
  if (!Object.values(LoginType).includes(loginType)) {
    return new Response("Invalid login type", { status: 400 });
  }

  let nextURL = formData.get("next");
  if (typeof nextURL !== "string" || !isSameOriginURL(nextURL, url)) {
    nextURL = "/";
  }

  switch (loginType) {
    case LoginType.BeA:
      return await startOAuth2Login(request, AuthProvider.BEA, nextURL);
    case LoginType.KomplaIdp:
      return await startOAuth2Login(request, AuthProvider.KOMPLA_IDP, nextURL);
    default:
      return new Response("Invalid login type", { status: 400 });
  }
};
