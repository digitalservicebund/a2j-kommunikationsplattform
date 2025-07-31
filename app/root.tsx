import * as Sentry from "@sentry/react-router";
import {
  data,
  isRouteErrorResponse,
  Links,
  LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import { config } from "./config/config";
import { IdleTrackerProvider } from "./services/idle/idleTracker";
import { hasUserSession } from "./services/prototype.session.server";
import "./styles.css";

const title = "Kommunikationsplattform | Justiz-Services";
const description =
  "Willkommen auf der Pilotplattform für den digitalen Austausch zwischen Gerichten und Verfahrensbeteiligten.";

export type RootLoader = typeof loader;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isLoggedIn = await hasUserSession(request);
  console.log("root loader isLoggedIn:", isLoggedIn);

  return data({ isLoggedIn });
};

export default function App() {
  const { isLoggedIn } = useLoaderData<RootLoader>();

  console.log("App isLoggedIn:", isLoggedIn);

  const logoutHandler = () => {
    console.log("logoutHandler isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      // handle logout
    }
  };

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        {/* @TODO: https://digitalservicebund.atlassian.net/browse/KOMPLA-492 */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(config())}`,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <IdleTrackerProvider handler={logoutHandler} minutes={10 / 60}>
          {/* Outlet renders children */}
          <Outlet />
        </IdleTrackerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Readonly<Route.ErrorBoundaryProps>) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error && error instanceof Error) {
    // we only want to capture non 404-errors that reach the boundary
    Sentry.captureException(error);

    if (import.meta.env.DEV) {
      details = error.message;
      stack = error.stack;
    }
  }

  return (
    <main className="mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
