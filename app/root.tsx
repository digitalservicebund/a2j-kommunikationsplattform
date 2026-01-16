import FiraSansMedium from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-Medium.woff2?url";
import FiraSansRegular from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-Regular.woff2?url";
import FiraSansSemiBold from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-SemiBold.woff2?url";
import * as Sentry from "@sentry/react-router";
import {
  data,
  Links,
  LinksFunction,
  LoaderFunctionArgs,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import ErrorBox from "~/components/ErrorBox";
import { buildErrorContext } from "~/services/error/buildErrorContext";
import { useNonce } from "~/services/security/nonce";
import { dictionaries } from "~/services/translations";
import { TranslationsContext } from "~/services/translations/context";
import type { Route } from "./+types/root";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LogoutInactiveUserWrapper } from "./components/LogoutInactiveUserWrapper";
import { config } from "./config/config";
import { META_PAGES } from "./config/metaPages";
import { getAuthData } from "./services/auth/authSession.server";
import de from "./services/translations/de";
import styles from "./styles.css?url";

export { headers } from "./rootHeaders";
export type RootLoader = typeof loader;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authData = await getAuthData(request);
  const userIsLoggedIn = Boolean(authData);
  const pathname = new URL(request.url).pathname;
  const isContentPage = META_PAGES.some((page) => `/${page.path}` === pathname);
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

export default function App() {
  const { userIsLoggedIn, isContentPage } = useLoaderData<RootLoader>();
  const nonce = useNonce();

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
        {/* we currently only support German, so we hardcode the dictionary to "de" here,
        in the future we can do this dynamically via language detection, for example */}
        <TranslationsContext.Provider value={dictionaries.de}>
          <LogoutInactiveUserWrapper handleInactivity={userIsLoggedIn}>
            <Header
              userIsLoggedIn={userIsLoggedIn}
              isContentPage={isContentPage}
            />
            <Breadcrumbs />
            <main className="kern-container">
              <Outlet />
            </main>
            <Footer />
          </LogoutInactiveUserWrapper>
          <ScrollRestoration nonce={nonce} />
          <Scripts nonce={nonce} />
        </TranslationsContext.Provider>
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Readonly<Route.ErrorBoundaryProps>) {
  const { errorContent, errorToReport } = buildErrorContext(
    error,
    import.meta.env.DEV,
  );

  if (errorToReport) {
    Sentry.captureException(errorToReport);
  }

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <title>{de.routes.PLATFORM_TITLE}</title>
        <Links />
      </head>
      <body>
        <Header />
        <main className="kern-container">
          <div className="space-y-kern-space-large py-kern-space-large">
            <ErrorBox {...errorContent} />
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
