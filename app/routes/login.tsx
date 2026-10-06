import {
  data,
  Form,
  redirect,
  useLoaderData,
  useSearchParams,
} from "react-router";
import Button from "~/components/Button";
import { PageMetadata } from "~/components/PageMetadata";
import {
  LoginError,
  LoginType,
  LogoutType,
} from "~/services/auth/auth.types.ts";
import { getAuthSession } from "~/services/auth/authSession.server";
import { useTranslations } from "~/services/translations/context";

/**
 * Returns the URL that the app should redirect to after login, as passed
 * to the login page through the `next` query parameter. Cross-origin URLs
 * are ignored.
 */
function getNextURLAfterLogin(params: URLSearchParams, baseURL: string) {
  const url = params.get("next")?.trim() || "/";
  const absoluteURL = new URL(url, baseURL);
  return absoluteURL.origin == new URL(baseURL).origin
    ? absoluteURL.pathname + absoluteURL.search
    : "/";
}

/**
 * Redirects away from the login page if the user is already logged in.
 */
export async function loader({ request }: { request: Request }) {
  const { searchParams, origin } = new URL(request.url);
  const nextURL = getNextURLAfterLogin(searchParams, origin);

  const userIsLoggedIn = !!(await getAuthSession(request));
  if (userIsLoggedIn) {
    throw redirect(nextURL);
  }

  return data({ nextURL });
}

export enum LoginStatus {
  LoggedOutAutomatically = LogoutType.Automatic,
  LoggedOutManually = LogoutType.ByUser,
  BeALoginFailed = LoginError.BeA,
  KomPlaIdpLoginFailed = LoginError.KomplaIdp,
}

function LoginStatusAlert({ status }: Readonly<{ status: string }>) {
  const t = useTranslations();
  switch (status) {
    case LoginStatus.LoggedOutAutomatically:
      return (
        <div className="kern-alert kern-alert--warning kern-my-md" role="alert">
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--warning kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">
              {t.alerts.LOGOUT_AUTOMATIC_TITLE}
            </span>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">{t.alerts.LOGOUT_AUTOMATIC_MESSAGE}</p>
          </div>
        </div>
      );
    case LoginStatus.LoggedOutManually:
      return (
        <div className="kern-alert kern-alert--success kern-my-md" role="alert">
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--success kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">
              {t.alerts.LOGOUT_BY_USER_MESSAGE}
            </span>
          </div>
        </div>
      );
    case LoginStatus.BeALoginFailed:
      return (
        <div className="kern-alert kern-alert--danger kern-my-md" role="alert">
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--danger kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">{t.alerts.LOGIN_ERROR_BEA_TITLE}</span>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">{t.alerts.LOGIN_ERROR_BEA_MESSAGE}</p>
          </div>
        </div>
      );
    case LoginStatus.KomPlaIdpLoginFailed:
      return (
        <div className="kern-alert kern-alert--danger kern-my-md" role="alert">
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--danger kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">
              {t.alerts.LOGIN_ERROR_KOMPLA_IDP_TITLE}
            </span>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">
              {t.alerts.LOGIN_ERROR_KOMPLA_IDP_MESSAGE}
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function LoginPage() {
  const t = useTranslations();
  const [searchParams] = useSearchParams();
  const { nextURL } = useLoaderData();

  const loginStatus = searchParams.get("status");

  return (
    <>
      <PageMetadata />

      <div className="flex items-center justify-center">
        <div className="max-w-[512px]">
          {loginStatus && <LoginStatusAlert status={loginStatus} />}

          <h1 className="kern-heading-medium text-center">
            {t.routes.login.headline}
          </h1>

          <p className="kern-subline kern-my-md text-center">
            {t.routes.login.intro}
          </p>

          <Form method="post" action="/action/login-user">
            <input type="hidden" name="next" value={nextURL} />
            <div className="kern-py-lg kern-gap-md flex flex-row flex-wrap items-start self-stretch">
              <Button
                type="submit"
                name="loginType"
                value={LoginType.BeA}
                appearance="primary"
                className="kern-btn--block"
                label={t.buttons.LOGIN_BUTTON_BEA}
              />
            </div>
          </Form>

          <Form method="post" action="/action/login-user">
            <input type="hidden" name="next" value={nextURL} />
            <Button
              type="submit"
              name="loginType"
              value={LoginType.KomplaIdp}
              appearance="secondary"
              className="kern-btn--block w-full"
              data-testid="kompla-idp-login-button"
              label={t.buttons.LOGIN_BUTTON_KOMPLA_IDP_LABEL}
            />
          </Form>
        </div>
      </div>
    </>
  );
}
