import FiraSansMedium from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-Medium.woff2?url";
import FiraSansRegular from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-Regular.woff2?url";
import FiraSansSemiBold from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-SemiBold.woff2?url";
import * as Sentry from "@sentry/react-router";
import { ReactNode } from "react";
import {
  data,
  isRouteErrorResponse,
  Links,
  LinksFunction,
  LoaderFunctionArgs,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import Header from "~/components/Header";

import ErrorBox from "~/components/ErrorBox";
import Logo from "~/components/Logo.static";
import PageFooter from "~/components/PageFooter";
import { contentPages } from "~/constants/contentPages";
import { useNonce } from "~/services/security/nonce";
import { dictionaries } from "~/services/translations";
import { TranslationsContext } from "~/services/translations/context";
import type { Route } from "./+types/root";
import { LogoutInactiveUserWrapper } from "./components/LogoutInactiveUserWrapper";
import { config } from "./config/config";
import { getUserSession } from "./services/auth/session.server";
import styles from "./styles.css?url";

export { headers } from "./rootHeaders";
export type RootLoader = typeof loader;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userIsLoggedIn = Boolean(await getUserSession(request));
  const pathname = new URL(request.url).pathname;
  const isContentPage = contentPages.some(
    (page) => `/${page.path}` === pathname,
  );
  return data({ userIsLoggedIn, isContentPage });
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
  const loaderData = useLoaderData<RootLoader>();
  const nonce = useNonce();

  const userIsLoggedIn = loaderData?.userIsLoggedIn ?? false;
  const isContentPage = loaderData?.isContentPage ?? false;
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        {/* @TODO: https://digitalservicebund.atlassian.net/browse/KOMPLA-492 */}
        <Links />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(config())}`,
          }}
        />
      </head>
      <body>
        <Header userIsLoggedIn={userIsLoggedIn} isContentPage={isContentPage} />
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const { userIsLoggedIn } = useLoaderData<RootLoader>();

  return (
    // we currently only support German, so we hardcode the dictionary here, but in the future we cab make this dynamic and correct language from the backend
    <TranslationsContext.Provider value={dictionaries.de}>
      <LogoutInactiveUserWrapper handleInactivity={userIsLoggedIn}>
        <Breadcrumbs />
        <Outlet />
      </LogoutInactiveUserWrapper>
    </TranslationsContext.Provider>
  );
}

export function ErrorBoundary({ error }: Readonly<Route.ErrorBoundaryProps>) {
  // Use the static dictionary to avoid calling hooks inside an error boundary.
  const { errorMessages, labels } = dictionaries.de;

  // Start with safe defaults (generic error) so production paths always have text.
  let errorMessage: Record<"label" | "heading" | "body", string> = {
    label: errorMessages.GENERIC_ERROR_LABEL,
    heading: errorMessages.GENERIC_ERROR_HEADING,
    body: errorMessages.GENERIC_ERROR_BODY,
  };

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = {
        label: errorMessages.UNKNOWN_PAGE_LABEL,
        heading: errorMessages.UNKNOWN_PAGE_HEADING,
        body: errorMessages.UNKNOWN_PAGE_BODY,
      };
    } else {
      errorMessage = {
        label: errorMessages.SERVER_ERROR_LABEL,
        heading: errorMessages.SERVER_ERROR_HEADING,
        body: errorMessages.SERVER_ERROR_BODY,
      };
    }
  } else if (error instanceof Error) {
    // capture runtime exceptions
    Sentry.captureException(error);

    if (import.meta.env.DEV) {
      // show detailed info in development
      errorMessage = {
        label: "Error",
        heading: error.message,
        body: error.stack || "",
      };
    } else {
      // production: don't leak internals — show server/generic messaging
      errorMessage = {
        label: errorMessages.SERVER_ERROR_LABEL,
        heading: errorMessages.SERVER_ERROR_HEADING,
        body: errorMessages.SERVER_ERROR_BODY,
      };
    }
  } else {
    // capture unexpected throw types
    Sentry.captureException(error);
  }

  return (
    <main>
      <div className="kern-container space-y-kern-space-large py-kern-space-large">
        <Logo />
        <hr className="kern-divider" aria-hidden="true" />
        <ErrorBox
          label={errorMessage.label}
          heading={errorMessage.heading}
          body={errorMessage.body}
          redirectText={labels.START_PAGE_LABEL}
          redirectUrl="/"
        />
      </div>
      <PageFooter />
    </main>
  );
}
