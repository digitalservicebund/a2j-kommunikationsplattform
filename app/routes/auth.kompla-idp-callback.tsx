import type { LoaderFunctionArgs } from "react-router";
import { AuthenticationProvider } from "~/services/auth/auth.types";
import { auth } from "~/services/auth/betterAuth.server";

/**
 * Keeps the redirect_uri registered with KomPla IdP's client stable by
 * forwarding this request to Better Auth's own OAuth2 callback handler.
 */
export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const target = new URL(
    `/api/auth/callback/${AuthenticationProvider.KOMPLA_IDP}${url.search}`,
    url.origin,
  );
  return auth.handler(new Request(target, { headers: request.headers }));
};
