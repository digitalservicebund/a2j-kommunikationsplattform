import FiraSansMedium from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-Medium.woff2?url";
import FiraSansRegular from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-Regular.woff2?url";
import FiraSansSemiBold from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-SemiBold.woff2?url";
import * as Sentry from "@sentry/react-router";
import { ReactNode } from "react";
import {
  data,
  isRouteErrorResponse,
  Link,
  Links,
  LinksFunction,
  LoaderFunctionArgs,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import PageHeader from "~/components/PageHeader";
import type { Route } from "./+types/root";
import { LogoutInactiveUserWrapper } from "./components/LogoutInactiveUserWrapper";
import { config } from "./config/config";
import { hasUserSession } from "./services/prototype.session.server";
import styles from "./styles.css?url";

export type RootLoader = typeof loader;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userIsLoggedIn = Boolean(await hasUserSession(request));
  return data({ userIsLoggedIn });
};

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
  { rel: "manifest", href: "/site.webmanifest" },
  {
    rel: "preload",
    href: FiraSansRegular,
    as: "font",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: FiraSansMedium,
    as: "font",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: FiraSansSemiBold,
    as: "font",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        {/* @TODO: https://digitalservicebund.atlassian.net/browse/KOMPLA-492 */}
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(config())}`,
          }}
        />
      </head>
      <body>
        <PageHeader />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { userIsLoggedIn } = useLoaderData<RootLoader>();

  return (
    <LogoutInactiveUserWrapper handleInactivity={userIsLoggedIn}>
      <Outlet />
    </LogoutInactiveUserWrapper>
  );
}

export function ErrorBoundary({ error }: Readonly<Route.ErrorBoundaryProps>) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "404";
      details = "Die Seite konnte nicht gefunden werden.";
    } else {
      message = "Fehler";
      details = error.statusText || details;
    }
  } else if (error && error instanceof Error) {
    // we only want to capture non 404-errors that reach the boundary
    Sentry.captureException(error);

    if (import.meta.env.DEV) {
      details = error.message;
      stack = error.stack;
    }
  }

  return (
    <main>
      <h1 className="kern-heading-large">{message}</h1>
      <p className="kern-text">{details}</p>
      {message === "404" ? (
        <p>
          Zurück zur{" "}
          <Link to="/" className="kern-link">
            Startseite
          </Link>
        </p>
      ) : (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
