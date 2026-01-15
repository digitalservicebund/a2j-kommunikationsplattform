import { href, Outlet, redirect } from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";
import { authContext } from "~/services/auth/auth.context";
import { getAuthData } from "~/services/auth/authSession.server";
import type { Route } from "./+types/_layout";

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Verfahren",
  },
};

export const middleware: Route.MiddlewareFunction[] = [
  async ({ request, context }, next) => {
    console.log("MIDDLEWARE FILTER:", request.url);
    const authSession = await getAuthData(request);

    if (!authSession) {
      throw redirect(href("/login"));
    }

    context.set(authContext, authSession);

    const response = await next();

    if (authSession.sessionCookieHeader) {
      const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers),
      });
      newResponse.headers.append("Set-Cookie", authSession.sessionCookieHeader);
      return newResponse;
    }

    return response;
  },
];

export function loader() {
  return null;
}

export default function VerfahrenLayout() {
  return <Outlet />;
}
