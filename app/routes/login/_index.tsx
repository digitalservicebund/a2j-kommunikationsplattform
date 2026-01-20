import { Form, redirect, useLoaderData, useSearchParams } from "react-router";
import { PageMetadata } from "~/components/PageMetadata";
import { config } from "~/config/config";
import { getAuthData } from "~/services/auth/authSession.server";
import { useTranslations } from "~/services/translations/context";
import { LoginError, LoginType } from "../action.login-user";
import { LogoutType } from "../action.logout-user";

// Alert state type
type AlertState =
  | ""
  | LogoutType.Automatic
  | LogoutType.ByUser
  | LoginError.BeA;

export async function loader({ request }: { request: Request }) {
  const userIsLoggedIn = await getAuthData(request);

  if (userIsLoggedIn) {
    throw redirect("/");
  }

  const environment = config().ENVIRONMENT;
  return { environment };
}

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const { environment } = useLoaderData<typeof loader>();
  const alertStatus = searchParams.get("status") as AlertState;
  const isDevelopment = environment === "development";
  const currentLoginType = isDevelopment ? LoginType.Developer : LoginType.BeA;
  const { alerts, buttons, routes } = useTranslations();

  const loginButtonLabels: Record<LoginType, string> = {
    [LoginType.BeA]: buttons.LOGIN_BUTTON_BEA,
    [LoginType.Developer]: buttons.LOGIN_BUTTON_DEVELOPER,
  };

  let alertMarkup = null;
  switch (alertStatus) {
    case LogoutType.Automatic:
      alertMarkup = (
        <div
          className="kern-alert kern-alert--warning my-kern-space-default"
          role="alert"
        >
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--warning kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">{alerts.LOGOUT_AUTOMATIC_TITLE}</span>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">{alerts.LOGOUT_AUTOMATIC_MESSAGE}</p>
          </div>
        </div>
      );
      break;
    case LogoutType.ByUser:
      alertMarkup = (
        <div
          className="kern-alert kern-alert--success my-kern-space-default"
          role="alert"
        >
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--success kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">{alerts.LOGOUT_BY_USER_MESSAGE}</span>
          </div>
        </div>
      );
      break;
    case LoginError.BeA:
      alertMarkup = (
        <div
          className="kern-alert kern-alert--danger my-kern-space-default"
          role="alert"
        >
          <div className="kern-alert__header">
            <span
              className="kern-icon kern-icon--danger kern-icon--small"
              aria-hidden
            ></span>
            <span className="kern-title">{alerts.LOGIN_ERROR_BEA_TITLE}</span>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">{alerts.LOGIN_ERROR_BEA_MESSAGE}</p>
          </div>
        </div>
      );
      break;
  }

  return (
    <>
      <PageMetadata />

      <div className="flex items-center justify-center">
        <div className="max-w-[512px]">
          {alertMarkup}

          <h1 className="kern-heading-medium text-center">
            {routes.login.headline}
          </h1>

          <p className="kern-subline my-kern-space-default text-center">
            {routes.login.introduction}
          </p>

          <Form method="post" action="/action/login-user">
            <div className="py-kern-space-large gap-kern-space-default flex flex-row flex-wrap items-start self-stretch">
              <input type="hidden" name="loginType" value={currentLoginType} />
              <button
                type="submit"
                className="kern-btn kern-btn--block kern-btn--primary"
              >
                <span className="kern-label">
                  {loginButtonLabels[currentLoginType]}
                </span>
              </button>

              <button
                className="kern-btn kern-btn--primary kern-btn--block"
                disabled
              >
                <span className="kern-label">
                  {buttons.LOGIN_BUTTON_GERICHTE}
                </span>
              </button>

              {/* only render "Testzugang" demo link for non production environments */}
              {environment !== "production" && (
                <button
                  className="kern-btn kern-btn--block kern-btn--secondary"
                  data-testid="demo-button"
                  disabled
                  aria-disabled={"true"}
                >
                  <span className="kern-label">
                    {buttons.LOGIN_BUTTON_TEST_ZUGANG}
                  </span>
                </button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
