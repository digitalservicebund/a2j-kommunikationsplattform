import { Outlet, redirect } from "react-router";
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
    console.log("MW TRIGGERED FOR VERFAHREN LAYOUT");
    const authSession = await getAuthData(request);

    if (!authSession) throw redirect("/login");

    context.set(authContext, authSession);

    const response = await next();

    if (authSession.sessionCookieHeader) {
      response.headers.append("Set-Cookie", authSession.sessionCookieHeader);
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
