import type { LoaderFunctionArgs } from "react-router";
import { AuthenticationProvider } from "~/services/auth/auth.types";
import { auth } from "~/services/auth/betterAuth.server";

/**
 * Keeps the redirect_uri registered with the real KomPla IdP client stable
 * (unaffected by the Better Auth migration) by forwarding this request to
 * Better Auth's own auto-mounted OAuth2 callback handler, which does the
 * actual code exchange and session creation.
 */
export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const target = new URL(
    `/api/auth/oauth2/callback/${AuthenticationProvider.KOMPLA_IDP}${url.search}`,
    url.origin,
  );
  return auth.handler(new Request(target, { headers: request.headers }));
};
